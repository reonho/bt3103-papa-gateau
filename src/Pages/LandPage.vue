<template>
<div class="landPage" style=" padding: 45px 0 0 0;">
    <NavBarLandpage class="fixed-top" @scroll = "scrolltoView"/>
    <div class="container">
        <md-card class="test1" style = "margin-top:5%; padding:4vh; margin-bottom:4vh; color:white;background-color:#1ABC9C;} " md-with-hover> 
            <div class="md-layout md-gutter md-alignment-center-right">
            <div class = "md-layout-item" > <h1 style="color:#FFFFFF; font-size:250%">Hello {{User.User}}! Welcome to your dashboard.
            <button v-on:click="readDatabase">Greet</button>
            </h1></div>
            <div class = "md-layout-item" style="text-align:right">
                <AddModulesModal/>
            </div>
            </div>
        </md-card>
        <!--div style="display:flex" class= "container-fluid p-3"-->
        <div class="md-layout md-gutter md-alignment-center md-size-25">
            <div class = "md-layout-item" id = "StatsCard" >
            
                <md-card style="background:#1ABC9C; color:white" md-with-hover >
                    <md-card-header>
                        <div class="md-title">My Stats and Attributes</div>
                        <div class="md-subhead">Discover your strengths and weaknesses!</div>
                    </md-card-header>
                </md-card>
                <md-card md-with-hover style="padding:2vh">
        
                <div id="chart">
                    <RadarChart/>
                </div>
            
                </md-card>
            </div>

            <div class="md-layout-item">
                <md-card style="background:#1ABC9C; color:white" md-with-hover >
                <md-card-header>
                    <div class="md-title">My Cumulative Average Point</div>
                    <div class="md-subhead">How your CAP has changed over the semesters</div>
                </md-card-header>
                </md-card>
                <md-card  md-with-hover style="padding:2vh">         
                    <capline/>
                </md-card>   
            </div>

        </div>
        <br>
        <div>
            <div id = "DegreeProgressCard">
            <md-card style="background:#1ABC9C;color:white; margin-bottom:0vh" >
                    <md-card-header>
                        <div class="md-title">My Degree Progress</div>
                        <div class="md-subhead">Explore your graduation requirements and completed modules.</div>
                    </md-card-header>
            </md-card>
            <md-card style="height:90vh; margin-bottom:0vh; margin-top:0vh; padding:0vh; height:50vh" md-with-hover>
                
                <div id="treechart" class="container-fluid" >
                    <TreeChart v-bind:data = 'this.treeData' />
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
            <md-card style="background:#1ABC9C;color:white; margin-bottom:0vh" >
                    <md-card-header>
                        <div class="md-title">My Reviews</div>
                        <div class="md-subhead"></div>
                    </md-card-header>
            </md-card>
           
            <!-- <ReviewCard/> -->
            <ReviewSection/>
        </div>
    </div>
</div>


</template>


<script>
    import DataObject from "../Database.js"
    import AddModulesModal from "../components/AddModuleModal"
    // import FollowUpModal from "../compononets/FollowUpModal"
    import RadarChart from "../components/RadarChart.vue"
    import TreeChart from "../components/TreeCharts/TreeChart"
    //import OverallProgress from "../components/OverallProgress"
    import NavBarLandpage from '../components/NavBarLandpage'
    import capline from '../components/capline'
    // import Feed from '../components/Feed'
    // import Ratings from '../components/Ratings'
    import ReviewSection from '../components/ReviewSection'
    import database from '../firebase.js'

    export default {
    name: 'LandPage',
    props: [
        'userPassed'
    ],
    components:{
        AddModulesModal,
        RadarChart,
        TreeChart,
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
        readDatabase(){ // this is a function for testing the queries only. for reference
            database.getModuleDetails("BT2101").then(function(e){
                console.log(e)
            })
            database.getAllModules().then(function(e){
                console.log(e)
            })

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
            User: {User:"Thangarami Ramasamy"},
            treeData: [ {
                "name" : "General Modules",
                "off": true,
                "value": 0,
                "word" : "",
                "children": [
                     {
                        'name': "GER1000",
                        'value': 0,
                        "word" : ""
                    },
                    {
                        'name': "GET1001",
                        'value': 0.7,
                        "word" : "Not Completed!",
                    }
                ] 
            },{
                "name" : "Core Modules",
                "value": 0,
                "off": true,
                "word" : "",
                "children": [
                    {
                        'name': "BT2101",
                        'value': 0.7,
                        "word" : "Not Completed!",
                        "children":[
                            {
                        'name': "BT1101",
                        'value': 0,
                        "word" : "",
                        },
                         {
                        'name': "MA1521",
                        'value': 0.7,
                        "word" : "Not Completed!",
                    },

                        ]
                    }
                ] 
            },{
                "name" : "Programme Modules",
                "value": 0,
                "off": true,
                "word" : "",
                "children": [
                     {
                        'name': "BT4222",
                        'value': 0.7,
                        "word" : "Not Completed!",
                    },
                    {
                        'name': "BT4102",
                        'value': 0.7,
                        "word" : "Not Completed!",
                    }
                ] 
            },]
        };
    },
    mounted() {
        if (this.userPassed) {
            //this.User = this.userPassed  
            this.User = "Reon" 
        }
        else{
            this.User = {User:"there"}
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test{
    color:white;
    background-image :url(../assets/gradient.png)
}

.landPage{
    background-image : linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)
}

</style>
