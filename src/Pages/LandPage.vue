<template>
  <div class="landPage">
    <NavBar class="fixed-top" />
    <div class="container-fluid" style="width: 90vw;">
      <div class="header-card">
        <div class="md-layout md-gutter md-alignment-center-right">
          <div class="md-layout-item md-size-85">
            <h1 class="header">Welcome to your dashboard, {{User.name}}</h1>
          </div>
          <div class="md-layout-item md-size-15"></div>
        </div>
        <div>
          <div class="header-content" style="padding-top:2vw;">
            <p class="sub-content-title">Faculty and Department</p>
            <p class="sub-content-text">{{User.faculty}}, {{User.dept}}</p>
            <p class="sub-content-title">Course Programme</p>
            <p class="sub-content-text">Bachelor of {{User.course}}</p>
          </div>
        </div>
      </div>

      <div class="contain-div">
        <div class="sub-contain-div1">
          <div class="sub-header-content">
            <div class="sub-header-title">GRADES</div>

            <div class="grade-content" v-if="sem">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-40">
                  <p class="sub-content-title">Current Semester</p>
                  <p class="sub-content-text" style="padding-bottom:0">{{sem}}</p>
                </div>
                <div class="md-layout-item md-size-60">
                  <p class="sub-content-title">Overall Cap</p>
                  <p
                    class="sub-content-text"
                    style="padding-bottom:0;"
                    v-if="User.overall_cap"
                  >{{formatcap(User.overall_cap)}}</p>
                  <p
                    class="sub-content-text"
                    style="padding-bottom:0;"
                    v-if="!User.overall_cap"
                  >{{formatcap(User.overall_cap)}}</p>
                </div>
              </div>
            </div>
            <div class="sub-header-content" style="padding:2vw;">
              <capline v-if="User.sap_by_sem" :User="User" style="margin-right:2vh" />
            </div>
          </div>
        </div>

        <div class="sub-contain-div2">
          <div class="sub-header-content">
            <div class="sub-header-title" style="padding-bottom:8vh;">STRENGTHS</div>
            <!-- When using RadarChart to display My Attributes vs Faculty, set my_attr to be user attributes and fac_attr to be faculty -->
            <!-- However, when using to display My Attributes vs Module Attributes, type as Faculty, set my_attr to be user attributes and fac_attr to be top student attributes.  -->
            <!-- Also, set label_1 as 'Top Students Attributes' and label_2 as 'My Attributes -->
            <div v-if="!facultyAttributes">
              <md-empty-state
                id="statebox"
                style="max-width:0 !important; color: #2e4053;"
                md-label="Loading Attributes..."
              >
                <br />
                <ScaleLoader :color="color"></ScaleLoader>
              </md-empty-state>
            </div>
            <div v-show="facultyAttributes">
              <RadarChart
                v-if="facultyAttributes"
                v-bind:my_attr="User.attributes"
                v-bind:fac_attr="facultyAttributes"
                type="Faculty"
                label_1="My Attributes"
                label_2="Faculty Average"
              ></RadarChart>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <Feed
        :modlist="modlist"
        :sem="sem"
        :User="User"
        :course="cohortTopMods"
        v-if="User.sap_by_sem"
      ></Feed>

      <br />
      <br />
      <div>
        <div>
          <div class="sub-header-content" style="padding:0;">
            <div class="sub-header-title">MY REVIEWS</div>
            <ReviewSection style="min-height:52vh" :reviewData="reviewData" class="ReviewSection" />
          </div>
        </div>
      </div>
    </div>
    <div style="height:200px"></div>
  </div>
</template>
<script>
import RadarChart from "../components/RadarChart.vue";
import NavBar from "../components/NavBar";
import capline from "../components/capline";
import Feed from "../components/Feed";
import ReviewSection from "../components/ReviewSection";
import database from "../firebase.js";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  name: "LandPage",
  props: ["userPassed"],
  components: {
    RadarChart,
    capline,
    NavBar,
    Feed,
    ReviewSection,
    ScaleLoader

    // // Ratings
  },
  data: function() {
    return {
      // assign data into Data attribute
      User: {},
      reviewData: [],
      facultyAttributes: null,
      modules: [],
      modlist: [],
      sem: null,
      cohortTopMods: null,
      showModal: false,
      cohort_loaded: false,
      color: "#eda200",
      updatedtime: "",
      loading: false,
      usergrades: []
    };
  },
  methods: {
    //use this method to find data of a specific module
    findModule(mod, database) {
      var data = database.Modules;
      for (var i = 0; i < data.length; ++i) {
        if (data[i].Name == mod) {
          return data[i];
        }
      }
    },
    get_currentsem(obj_array) {
      var sem_no = 1;
      for (let i = 0; i < obj_array.length; i++) {
        var value = obj_array[i];
        sem_no = i;
        if (Object.entries(value).length == 0) {
          sem_no = i;
          break;
        }
      }
      var year = Math.floor(sem_no / 2) + 1;
      var sem = (sem_no % 2) + 1;
      this.sem = "Year " + year.toString() + " Semester " + sem.toString();
    },

    get_modules(modules) {
      var mods = [];
      for (let i = 0; i < modules.length; i++) {
        mods.push(modules[i]["module"]);
      }
      this.modules = mods;
    },

    formatcap(cap) {
      if (cap >= 0) {
        return cap.toFixed(2);
      } else {
        cap = 0;
        return cap.toFixed(2);
      }
    },
    refreshpage() {
      this.$router.go();
      this.loading = true;
    }
  },
  created() {
    const self = this;
    // query database for review data
    database.getUser().then(user => {
      database.firebase_data
        .collection("reviews")
        .where("userid", "==", user)
        .onSnapshot(querySnapShot => {
          this.reviewData = [];
          querySnapShot.forEach(doc => {
            let item = {};
            item = doc.data();
            item.id = doc.id;
            this.reviewData.push(item);
          });
        });
    });

    database.getUser().then(user1 => {
      // query database for user info
      database.firebase_data
        .collection("students")
        .doc(user1)
        .onSnapshot(function(user) {
          var userData = user.data();

          var modulelist = [];
          database.firebase_data
            .collection("module_grades")
            .where("studentID", "==", user1)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                var mod = doc.data();

                if (typeof mod != "undefined")  {
                  if (mod.module != "") {
                  modulelist.push(mod);
                  }
                }
              });

              var result = {
                name: userData.name,
                faculty: userData.faculty,
                dept: userData.dept,
                course: userData.course,
                modules: userData.modules_taken,
                sap_by_sem: userData.sam_by_sem,
                overall_cap: userData.overall_cap,
                batch: userData.batch, // for querying cohort top modules
                modules_taken: userData.modules_taken, //!!!THIS PART IS TO QUERY MODULES TAKEN; array of modules:[{SU:false,module:"BT2101"},....]
                attributes: userData.attributes, //individual attributes can be found in self.User.attributes
                usergrades: modulelist
              };

              self.User = result;

              //query database for cohort top modules
              database.getCohortTopModules(result.batch).then(doc => {
                self.cohortTopMods = doc;
              });
              database.getCohortTopModules(result.batch).then(doc => {
                var course = doc;
                var modlst = [];

                for (let i = 0; i < course.module.length; i++) {
                  var mod = {};
                  mod["amt"] = course.amount[i];
                  mod["mod"] = course.module[i];
                  modlst.push(mod);
                }
                self.modlist = modlst;
              });
              database.getFacultyAttributes(result.faculty).then(attributes => {
                self.facultyAttributes = attributes;
                //added the attributes data from faculties in self.facultyAttributes ==> format is an array: [{att: "BT", grade: 4, amt: 2},{att: "CS", grade: 4.5, amt: 3}]
              });
              self.get_currentsem(self.User.sap_by_sem);
              self.get_modules(self.User.modules_taken);
            });
        });
    });
    var today = new Date();
    var date =
      (today.getDate() < 10 ? "0" : "") +
      today.getDate() +
      "/" +
      (today.getMonth() + 1 < 10 ? "0" : "") +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    var time =
      today.getHours() +
      ":" +
      (today.getMinutes() < 10 ? "0" : "") +
      today.getMinutes() +
      ":" +
      (today.getSeconds() < 10 ? "0" : "") +
      today.getSeconds();
    this.updatedtime = time + " on " + date;
  },
  mounted() {
    if (this.userPassed) {
      //this.User = this.userPassed
    } else {
      this.User = { User: "there" };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog {
  overflow: auto;
  display: block;
  width: 40vw;
}
.dashboard {
  color: white;
  padding: 2%;
}

.landPage {
  background: #ebecf0;
}
.md-button.addsem {
  background-color: teal !important;
  font-weight: bold;
  color: white;
  margin-top: 1vh;
  width: 8vw;
  font-size: 0.8vw;
}
/* Header card css */
.header-card {
  margin-top: 15vh;
  margin-bottom: 3vh !important;
  padding: 4vh;
  margin-bottom: 1vh;
  color: whitesmoke;
  background: white;
}
.header-content {
  text-align: left;
  padding: 0;
  max-height: 25vh;
}

.grade-content {
  padding: 3vh;
  padding-bottom: 0;
  padding-top: 0;
}
.header {
  color: #566573;
  font-size: 4vh;
  font-weight: 600;
}
.sub-header-title {
  font-size: 2.3vh;
  font-weight: bold;
  text-align: left;
  padding: 3vh;
  padding-bottom: 4vh;
  color: #566573;
}
.sub-header-content {
  background: white;
  text-align: left;
  padding: 0;
}
.sub-content-title {
  font-size: 1.9vh;
  font-weight: bold;
  text-align: left;
  color: #ec7663;
}
.sub-content-text {
  font-size: 2.1vh;
  text-align: left;
  padding-bottom: 4vh;
  color: #2e4053;
}
.ReviewSection {
  max-height: 50vh;
  overflow: auto;
}

.contain-div {
  display: flex;
  background-color: white;
}
.sub-contain-div1 {
  border-right: 2vw solid #ebecf0;
  width: 47vw;
  background-color: white;
  float: left;
}
.sub-contain-div2 {
  width: 42vw;
  background-color: white;
  float: right;
}
</style>
<style>
/* apply to all */
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif !important;
}
</style>