<template>
<div class="landPage" style=" padding: 40px 0 0 0;">
    <NavBarLandpage class="fixed-top" @scroll = "scrolltoView"/>
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
                            <div class="md-title" style="font-family: 'Montserrat', sans-serif; font-weight: 400;">ENROLLED COURSE:</div>
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
                            <div class="md-title" style="font-family: 'Montserrat', sans-serif; font-weight: 400;">CAP:</div>
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
                    <RadarChart style="padding:2%"></RadarChart>
                 </md-card>
                 <br>

                 <md-card  md-with-hover  >         
                    <capline v-if='User.sap_by_sem'  :sap="User.sap_by_sem" style="padding:2%"/>
                </md-card>                   
            </div>

            <div class="md-layout-item"  >   
                     <md-card style="background-color:#1ABC9C;; color:whitesmoke; padding:1vh; margin-bottom:1vh">
                        <h1>My Reviews</h1> </md-card>
                    <ReviewSection class="ReviewSection"/>
            </div>

        </div >

        <div>
            <div id = "DegreeProgressCard" >
            
            <md-card style="height:90vh; margin-bottom:0vh; padding:2vh; margin-top:5vh; height:50vh" md-with-hover>

                <md-card style="background:#1ABC9C;color:white; margin-bottom:0vh" >
                    <md-card-header>
                        <div class="md-title">My Degree Progress</div>
                    </md-card-header>
                </md-card>
                
                <div id="treechart" class="container-fluid" >
                    <coursetree></coursetree>
                </div>
                </md-card>
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
    import NavBarLandpage from '../components/NavBarLandpage'
    import capline from '../components/capline'
    // import Feed from '../components/Feed'
    // import Ratings from '../components/Ratings'
    import ReviewSection from '../components/ReviewSection'
    import database from '../firebase.js'
    import coursetree from '../components/coursetree'

    export default {
    name: 'LandPage',
    props: [
        'userPassed'
    ],
    components:{
        AddModulesModal,
        RadarChart,
        coursetree,
        //TreeChart,
        //OverallProgress,
        capline,
        NavBarLandpage,
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
            var keys = ["one","two","three","four","five", "six", "seven", "eight"]
            var sem_no = 1
            for(let i=0; i < 8; i++){
                var key = keys[i]
                //console.log(obj_array[0][key])
                var value = obj_array[i][key]
                if (!value){
                    sem_no = i+1
                    break
                }
            }

            var year = Math.ceil(sem_no/2)
            var sem = sem_no%2

            this.sem = "Year " + year.toString() + " Semester " +  sem.toString()



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

        },

        scrolltoView(elementPosition){
            var headerOffset = 90;
            //227.578125
            //863.828125
            var offsetPosition = elementPosition - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
        }
    },  
    data: function(){ 
        return {
            // assign data into Data attribute
            Data: this.findModule("CS2030",DataObject),
            User: {},
            sem: null,
            facultyAttributes: [],
            // treeData: [ {
            //     "name" : "General Modules",
            //     "off": true,
            //     "value": 0,
            //     "word" : "",
            //     "children": [
            //          {
            //             'name': "GER1000",
            //             'value': 0,
            //             "word" : ""
            //         },
            //         {
            //             'name': "GET1001",
            //             'value': 0.7,
            //             "word" : "Not Completed!",
            //         }
            //     ] 
            // },{
            //     "name" : "Core Modules",
            //     "value": 0,
            //     "off": true,
            //     "word" : "",
            //     "children": [
            //         {
            //             'name': "BT2101",
            //             'value': 0.7,
            //             "word" : "Not Completed!",
            //             "children":[
            //                 {
            //             'name': "BT1101",
            //             'value': 0,
            //             "word" : "",
            //             },
            //              {
            //             'name': "MA1521",
            //             'value': 0.7,
            //             "word" : "Not Completed!",
            //         },

            //             ]
            //         }
            //     ] 
            // },{
            //     "name" : "Programme Modules",
            //     "value": 0,
            //     "off": true,
            //     "word" : "",
            //     "children": [
            //          {
            //             'name': "BT4222",
            //             'value': 0.7,
            //             "word" : "Not Completed!",
            //         },
            //         {
            //             'name': "BT4102",
            //             'value': 0.7,
            //             "word" : "Not Completed!",
            //         }
            //     ] 
            // },]
        };
    },
    created(){

        const self = this

        database.getStudentInfo().then(function(user){
            self.User = user
        })

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
            sap_by_sem: userData.sap_by_sem,
            overall_cap: userData.overall_cap,
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
                console.log("Attribute info according to user's faculty:")
                console.log(attributes) // console log result for reference
                self.facultyAttributes = attributes //added the attributes data from faculties in self.facultyAttributes ==> format is an array: [{attribute: "BT", score: 4},{attribute: "CS", score: 4.5}]
            })
        


            self.get_currentsem(self.User.sap_by_sem)
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
