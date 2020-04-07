<template>
  <div class="landPage">
    <NavBar class="fixed-top"/>
    <div class="container-fluid" style="width:90%">
      <md-card class="header-card" md-with-hover>
        <div class="md-layout md-gutter md-alignment-center-right">
          <div class="md-layout-item md-size-80">
            <h1 class="header">
              Hello {{User.name}}! Welcome to your dashboard.
              <!--button v-on:click="readDatabase">Greet</button-->
            </h1>
          </div>
          <div class="md-layout-item md-size-20" style="text-align:right">
            <AddModulesModal />
            <div>
                <button v-on:click="test">Add 1</button>
            </div>
          </div>
        </div>
      </md-card>
      <br />
      <table style="width:100%">
        <tr>
          <td style="width: 55%;padding:0;">
            <div>
              <div class="sub-header-title">ENROLLED DEGREE</div>

              <div class="sub-header-content" style="padding-top:2vw;">
                <p class="sub-content-title">Faculty and Department</p>
                <p class="sub-content-text">{{User.faculty}}, {{User.dept}}</p>
                <p class="sub-content-title">Course Programme</p>
                <p class="sub-content-text">{{User.course}}</p>
                <p class="sub-content-title">Current Semester</p>
                <p class="sub-content-text">{{sem}}</p>
                <p class="sub-content-title">Overall Cap</p>
                <p class="sub-content-text">{{User.overall_cap}}</p>
              </div>
            </div>
          </td>
          <td style="width: 5%"></td>
          <td style="width: 40%;padding:0">
            <div>
              <div class="sub-header-title">STRENGTHS</div>
              <div class="sub-header-content">
                <RadarChart  v-if="facultyAttributes" :my_attr="User.attributes" :fac_attr="facultyAttributes"></RadarChart>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <br />
      <br />
      <table style="width:100%">
        <tr>
          <td style="width: 35%;padding:0;">
            <div>
              <div class="sub-header-title">GRADES</div>            

              <div class="sub-header-content" style="padding-top:2vw;">
                <capline v-if="User.sap_by_sem" :sap="User.sap_by_sem" style="padding:2%" />
              </div>
            </div>
          </td>
          <td style="width: 5%"></td>
          <td style="width: 60%;padding:0">
            <div>
              <div class="sub-header-title">MY REVIEWS</div>
              <div class="sub-header-content" style="padding:0;background-color:#e5e8e8;">
                <ReviewSection
                  style="min-height:52vh"
                  :reviewData="reviewData"
                  class="ReviewSection"
                />
              </div>
            </div>
          </td>
        </tr>
      </table>
      <br />
      <br />
      <Feed :modules="modules" :course="cohortTopMods" :sem="sem"  v-if="cohortTopMods"></Feed>
    </div>
    <div style="height:200px"></div>
  </div>
</template>
<script>
import DataObject from "../Database.js";
import AddModulesModal from "../components/AddModuleModal";
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
    AddModulesModal,
    RadarChart,
    // //coursetree,
    // //TreeChart,
    // //OverallProgress,
    capline,
    NavBar,
    Feed,
    ReviewSection
    // // Ratings
  },
    methods: {
        test(){
            var batch = {
                year: 2018,
                sem: 1
            }
            database.register('test@gmail.com', '123456', 'testname', 'Business Analytics', batch).then(doc =>{
                console.log(doc)
            }).catch(err =>{
                console.log(err)
            })
        },
        //use this method to find data of a specific module
        findModule(mod,database){
            var data = database.Modules
            for (var i = 0; i < data.length; ++i){
                if (data[i].Name == mod) {
                    return data[i]
                }
            }
        },
        get_currentsem(obj_array){

            var sem_no = 1
            for(let i=0; i < 8; i++){
                //console.log(obj_array[0][key])
                var value = obj_array[i]
                if (Object.entries(value).length === 0){
                    sem_no = i
                    break
                }
            }
            var year = Math.floor(sem_no/2)+1
            var sem = sem_no%2+1
            this.sem = "Year " + year.toString() + " Semester " +  sem.toString()
        },

        get_modules(modules){
            var mods = []
            for(let i =0; i < modules.length; i++){
                mods.push(modules[i]["module"])
            }
            this.modules = mods
        },

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
      cohortTopMods: null
    };
  },
    created(){
        const self = this
        // query database for review data
        database.getUser().then(user => {
          console.log(user);
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
        database.firebase_data.collection("students").doc(database.user)
        .onSnapshot(function(user){ 
            var userData = user.data()
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
            }
            
            self.User = result

            //query database for cohort top modules
            database.getCohortTopModules(result.batch).then(doc =>{
                self.cohortTopMods = doc
            })

            // query database for course attributes
            database.getFacultyAttributes(result.faculty).then(attributes =>{
              self.facultyAttributes = attributes.attributes //added the attributes data from faculties in self.facultyAttributes ==> format is an array: [{att: "BT", grade: 4, amt: 2},{att: "CS", grade: 4.5, amt: 3}]
            })      

            self.get_currentsem(self.User.sap_by_sem)
            self.get_modules(self.User.modules_taken)
            
        })
       
        
        
    },
    mounted() {
        
        if (this.userPassed) {
            //this.User = this.userPassed  
        }
        else{
            this.User = {User:"there"}
        }
    }
}
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  color: white;
  padding: 2%;
}
.landPage {
  background: #EAECEE;
   font-family: 'Helvetica', sans-serif;
}
/* Header card css */
.header-card {
  margin-top:13vh;
  margin-bottom: 3vh !important;
  padding: 4vh;
  margin-bottom: 1vh;
  color: whitesmoke;
  border: 1px solid #17a2b8;
  border-radius: 25px;
  background-color: #17a2b8 !important;
  

}
.header {
  color: #ffffff;
  font-size: 3vh;
  font-weight: bold;
}
.sub-header-title {
  font-size: 2.3vh;
  font-weight: bold;
  text-align: left;
  padding: 25px;
  background-color: #17a2b8;
  color:white;

}
.sub-header-content {
  background: white;
  text-align: left;
  padding: 0;
  padding-left: 25px;
  max-height: 100vh;
  min-height: 52vh;
}
.sub-content-title {
  font-size: 2.1vh;
  font-weight: bold;
  text-align: left;
  color: #EC7663;
}
.sub-content-text {
  font-size: 2vh;
  text-align: left;
  padding-bottom: 4vh;
  color: #2e4053;
}

.ReviewSection {
  max-height: 50vh;
  overflow: scroll;
}

</style>
