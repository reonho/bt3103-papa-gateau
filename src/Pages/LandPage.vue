<template>
<div class="landPage" style=" padding: 40px 0 0 0;">
    <NavBar class="fixed-top"/>
    <div class = "container-fluid" style="width:90%">
        <md-card style = "margin-top:5%; padding:4vh; margin-bottom:1vh; color: whitesmoke; background-color:#1ABC9C;} " md-with-hover> 
            <div class="md-layout md-gutter md-alignment-center-right">

            <div class = "md-layout-item" > <h1 style="color:#FFFFFF; font-size:250%">Hello {{User.name}}! Welcome to your dashboard.
            <!--button v-on:click="readDatabase">Greet</button-->
            </h1></div>
            <div class = "md-layout-item" style="text-align:right">
                <AddModulesModal/>
            </div>
            </div>
        </md-card>


        <div  class="md-layout md-gutter md-alignment-center dashboard" style="" >
            <div class = "md-layout-item  ">
                 <md-card style='background:#1ABC9C;; color:whitesmoke' md-with-hover>
                    <md-card-header>
                        <md-card-media md-small style="padding:1vh">
                            <img src="../assets/deg.svg" alt="">
                        </md-card-media>
                        <md-card-header-text>
                            <div class="md-title" style="font-family: 'Montserrat', sans-serif;">ENROLLED COURSE:</div>
                            <div class="md-title">{{User.faculty}}, {{User.dept}} - {{User.course}}</div>
                        </md-card-header-text>
                    </md-card-header>
                 </md-card>
            </div>

             <div class = "md-layout-item md-size-20">
                 <md-card style='background: #1ABC9C; color:whitesmoke' md-with-hover>
                    <md-card-header>
                        <md-card-media md-small style="padding:1vh">
                            <img src="../assets/grade.svg" alt="">
                        </md-card-media>
                        <md-card-header-text>
                            <div class="md-title" style="font-family: 'Montserrat', medium; font-weight: 400;">CAP:</div>
                            <div class="md-title">{{User.overall_cap}}</div>
                        </md-card-header-text>
                    </md-card-header>
                 </md-card>
                
           
               
                  
            </div>

             <div class = "md-layout-item md-size-30" v-if="sem">
                    <md-card style='background: #1ABC9C;; color:whitesmoke' md-with-hover>
                        <md-card-header>
                            <md-card-media md-small style="padding:1vh">
                                <img src="../assets/prog.svg" alt="">
                            </md-card-media>
                            <md-card-header-text>
                                <div class="md-title" style="font-family: 'Montserrat', sans-serif; font-weight: 400;">SEMESTER:</div>
                                <div class="md-title"  >{{sem}}</div>
                            </md-card-header-text>
                        </md-card-header>
                    </md-card>
                 </div>
        </div>




        <!--div style="display:flex" class= "container-fluid p-3"-->
        <div  class="md-layout md-gutter " >
            <div class = "md-layout-item md-size-40 md-gutter" id = "StatsCard" >
            
                 <md-card  md-with-hover  >    
                    <RadarChart style="padding:2%"  :my_attr='[ { "attribute": "BT", "score": 4 }, { "attribute": "CS", "score": 4 }, { "attribute": "MA", "score": 4 }, { "attribute": "IS", "score": 4.5 },{ "attribute": "EC", "score": 4 }  ] ' :fac_attr='[ { "attribute": "BT", "score": 3.5 }, { "attribute": "CS", "score": 3.7 }, { "attribute": "MA", "score": 3.6 }, { "attribute": "IS", "score": 4.2 }, { "attribute": "EC", "score": 3.67 }  ] ' ></RadarChart>
                 </md-card>
                 <br>

                 <md-card  md-with-hover  >         
                    <capline v-if='User.sap_by_sem'  :sap="User.sap_by_sem" style="padding:2%"/>
                </md-card>                   
            </div>

            <div class="md-layout-item"  >   
                     <md-card style="background-color:#1ABC9C;; color:whitesmoke; padding:1vh; margin-bottom:1vh">
                        <h1>My Reviews</h1> </md-card>
                    <ReviewSection :reviewData="reviewData" class="ReviewSection" />
            </div>

        </div >

        <div>
            <div id = "DegreeProgressCard"  >

               <br>
                
                    <Feed v-if='User.modules_taken' :modules='modules' :course="User.course" :sem="sem"></Feed>
             
                
            </div>

        
        <!--/div-->
        <!-- <md-tabs class="md-transparent" md-alignment="fixed">
            <md-tab id="tab-home" md-label="Home"></md-tab>
            <md-tab id="tab-pages" md-label="Pages"></md-tab>
            <md-tab id="tab-posts" md-label="Posts"></md-tab>
            <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
        </md-tabs> -->
        <!-- <p>{{this.Data}}</p> -->
        <!-- <Feed/> -->
        <br>

            <!-- <ReviewCard/> -->
            
        </div>
    </div>
</div>


</template>


<script>
    import DataObject from "../Database.js"
    import AddModulesModal from "../components/AddModuleModal"
    // import FollowUpModal from "../compononets/FollowUpModal"
    import RadarChart from "../components/RadarChart.vue"
    //import TreeChart from "../components/TreeCharts/TreeChart"
    //import OverallProgress from "../components/OverallProgress"
    import NavBar from '../components/NavBar'
    import capline from '../components/capline'
    import Feed from '../components/Feed'
    // import Ratings from '../components/Ratings'
    import ReviewSection from '../components/ReviewSection'
    import database from '../firebase.js'
    //import coursetree from '../components/coursetree'
    export default {
    name: 'LandPage',
    props: [
        'userPassed'
    ],
    components:{
        AddModulesModal,
        RadarChart,
        //coursetree,
        Feed,
        //TreeChart,
        //OverallProgress,
        capline,
        NavBar,
        // Feed
        ReviewSection,
        // Ratings
    },
    methods: {
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
        readUser(){ // this is a function for testing the queries only. for reference
            database.getStudentInfo().then((e)=>{
                this.User = e
                console.log(e)
                this.get_currentsem(e.sap_by_sem)
            })
            // database.getStudentInfo().then(function(e){
            //     this.User = e
            //     console.log(e)
            // })
        }


    },  
    data: function(){ 
        return {
            // assign data into Data attribute
            Data: this.findModule("CS2030",DataObject),
            User: {},
            reviewData:[],
            sem: null,
            modules:["MA1521","BT2101","CS1010S","IS2101","BT2102","BT3103","BT3102", "CS2030", "MA1101R", "EC1301","GER1000","BT1101","IS1103","ST2334"],
            facultyAttributes: [],

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
            modules_taken: userData.modules_taken, //!!!THIS PART IS TO QUERY MODULES TAKEN; array of modules:[{SU:false,module:"BT2101"},....]
            attributes: userData.attributes //individual attributes can be found in self.User.attributes
            }
            
            self.User = result
            console.log("User info:")
            console.log(self.User) // console log result for reference
            // query database for course attributes
            var attributes = []
            database.firebase_data.collection("faculties").where("name", "==", self.User.faculty)
            .onSnapshot(function(onSnapshot){
                onSnapshot.forEach(function(doc){
                    var attr= doc.data().attributes
                    var x
                    for (x of attr){
                        attributes.push({
                            attribute: x.name,
                            score: x.avg_score
                        })
                    }
                })
                //console.log("Attribute info according to user's faculty:")
                //console.log(attributes) // console log result for reference
                self.facultyAttributes = attributes //added the attributes data from faculties in self.facultyAttributes ==> format is an array: [{attribute: "BT", score: 4},{attribute: "CS", score: 4.5}]
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
.dashboard{
    color:white;
    padding:2%;
}
.landPage{
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(176,176,176,0.7959558823529411) 100%);
}
.ReviewSection{
    max-height:95vh;
    overflow:scroll;
}
</style>