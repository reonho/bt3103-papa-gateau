<template>
  <div class="landPage">
    <NavBar class="fixed-top" />
    <div class="container-fluid" style="width: 90vw;">
      <div class="header-card">
        <div class="md-layout md-gutter md-alignment-center-right">
          <div class="md-layout-item md-size-85">
            <h1 class="header">
              Welcome to your dashboard, {{User.name}}
              <!--button v-on:click="readDatabase">Greet</button-->
            </h1>
          </div>
          <div class="md-layout-item md-size-15">
            <md-button
              class="md-primary md-raised"
              style="background:teal; font-weight:600;color:white; border-radius: 4px;border: none;
    width:10vw;height: 5vh;font-size: 1.8vh; margin:0"
              @click="showModal = true"
            >EDIT DETAILS</md-button>
            <md-dialog :md-active.sync="showModal">
              <md-dialog-title>Edit Your Personal Details</md-dialog-title>

              <md-dialog-content>
                <EditUserDetailsForm />
              </md-dialog-content>
            </md-dialog>
          </div>
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
              <capline v-if="User.sap_by_sem" :sap="User.sap_by_sem" style="margin-right:2vh" />
            </div>
          </div>
        </div>

        <div class="sub-contain-div2">
          <div class="sub-header-content">
            <div class="sub-header-title" style="padding-bottom:8vh;">STRENGTHS</div>
          </div>
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

      <br />
      <br />
      <Feed :modules="modules" :course="cohortTopMods" :sem="sem" :User="User" v-if="cohortTopMods"></Feed>

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
import DataObject from "../Database.js";

import EditUserDetailsForm from "../components/EditUserDetailsForm";
//import ViewSemesterSection from "../components/ViewSemesterSection";
// // import FollowUpModal from "../compononets/FollowUpModal"
import RadarChart from "../components/RadarChart.vue";
// //import TreeChart from "../components/TreeCharts/TreeChart"
// //import OverallProgress from "../components/OverallProgress"
import NavBar from "../components/NavBar";
import capline from "../components/capline";
import Feed from "../components/Feed";
// // import Ratings from '../components/Ratings'
import ReviewSection from "../components/ReviewSection";
import database from "../firebase.js";
//import coursetree from '../components/coursetree'
export default {
  name: "LandPage",
  props: ["userPassed"],
  components: {
    RadarChart,
    // //coursetree,
    // //TreeChart,
    // //OverallProgress,
    EditUserDetailsForm,
    capline,
    NavBar,
    Feed,
    ReviewSection
    // ViewSemesterSection
    // // Ratings
  },
  data: function() {
    return {
      // assign data into Data attribute
      Data: this.findModule("CS2030", DataObject),
      User: {},
      reviewData: [],
      facultyAttributes: null,
      modules: [],
      sem: null,
      cohortTopMods: null,
      showModal: false
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
        //console.log(obj_array[0][key])
        var value = obj_array[i];
        if (Object.entries(value).length === 0) {
          sem_no = i;
          break;
        }
      }
      var year = Math.floor(sem_no / 2) + 1;
      var sem = (sem_no % 2) + 1;
      this.sem = "Year " + year.toString() + " Semester " + sem.toString();
      console.log(this.sem)
    },

    get_modules(modules) {
      var mods = [];
      for (let i = 0; i < modules.length; i++) {
        mods.push(modules[i]["module"]);
      }
      this.modules = mods;
    },

    formatcap(cap) {
      return cap.toFixed(2);
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

    // query database for user info
    database.firebase_data
      .collection("students")
      .doc(database.user)
      .onSnapshot(function(user) {
        var userData = user.data();
        console.log(userData);
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
          attributes: userData.attributes //individual attributes can be found in self.User.attributes
        };

        self.User = result;
        console.log(result);
        //query database for cohort top modules
        database.getCohortTopModules(result.batch).then(doc => {
          self.cohortTopMods = doc;
        });
        // query database for course attributes
        database.getFacultyAttributes(result.faculty).then(attributes => {
          self.facultyAttributes = attributes.attributes; //added the attributes data from faculties in self.facultyAttributes ==> format is an array: [{att: "BT", grade: 4, amt: 2},{att: "CS", grade: 4.5, amt: 3}]
        });
        self.get_currentsem(self.User.sap_by_sem);
        self.get_modules(self.User.modules_taken);
      });

      
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