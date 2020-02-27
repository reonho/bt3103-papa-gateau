<template>
<div class="landPage" style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);padding: 45px 0 0 0;">
    <NavBar class="fixed-top" @scroll = "scrolltoView"/>
    <md-card  style = "margin-top:3vh; padding:4vh; margin-bottom:4vh" md-with-hover> 
        <div class="md-layout md-gutter md-alignment-center-right">
        <div class = "md-layout-item"> <h1>Hello, {{User.User}}!</h1></div>
        <div class = "md-layout-item" style="text-align:right">
            <AddModulesModal/>
        </div>
        </div>
    </md-card>
        <!--div style="display:flex" class= "container-fluid p-3"-->
        <div class="md-layout md-gutter md-alignment-top-center" style="margin:15%; margin-top:0; margin-bottom:0">
            <div class = "md-layout-item" id = "StatsCard" >
            
            <md-card style="background:teal;color:white" md-with-hover >
                <md-card-header>
                    <div class="md-title">My Stats and Attributes</div>
                    <div class="md-subhead">Discover your strengths and weaknesses!</div>
                </md-card-header>
                </md-card>
            <md-card  md-with-hover>
    
            <div id="chart">
                <RadarChart/>
            </div>
            
            </md-card>
            </div>

            <div class="md-layout-item">
                <md-card style="background: teal; color:white" md-with-hover >
                <md-card-header>
                    <div class="md-title">My Cumulative Average Point</div>
                    <div class="md-subhead">How your CAP has changed over the semesters</div>
                </md-card-header>
                </md-card>
                <md-card style="padding: 6vh" md-with-hover>         
                    <capline/>
                </md-card>   
            </div>
        </div>
        <div id = "DegreeProgressCard">
        <md-card style="background:salmon;color:white; margin: 5vh; margin-bottom:0vh" >
                <md-card-header>
                    <div class="md-title">My Degree progress</div>
                    <div class="md-subhead">Explore your graduation requirements and completed modules.</div>
                </md-card-header>
        </md-card>
        </div>
        <md-card style="height:90vh; margin: 5vh; margin-bottom:0vh; margin-top:0vh; padding:0vh" md-with-hover>
               
            <div id="treechart" class = "container-fluid" >
                <TreeChart v-bind:data = 'this.treeData'/>
            </div>
            </md-card>
            <md-card md-with-hover>
                
                <div id="treechart" class = "container-fluid" >
                    <md-tabs md-alignment="centered">

                        <md-tab id="GE" md-label="General Electives" >
                            <TreeChartGe v-bind:data = 'this.treeData'/>
                        </md-tab>
                        <md-tab id="CE" md-label="Core Electives">
                            <TreeChartCe v-bind:data = 'this.treeData'/>
                        </md-tab>
                        <md-tab id="PE" md-label="Programme Electives">
                            <TreeChartPe v-bind:data = 'this.treeData'/>
                        </md-tab>
                    </md-tabs>
                </div>
                </md-card>
        
        
        <!--/div-->
        <!-- <md-tabs class="md-transparent" md-alignment="fixed">
            <md-tab id="tab-home" md-label="Home"></md-tab>
            <md-tab id="tab-pages" md-label="Pages"></md-tab>
            <md-tab id="tab-posts" md-label="Posts"></md-tab>
            <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
        </md-tabs> -->
        <!-- <p>{{this.Data}}</p> -->
        <!-- <Feed/> -->
        
           
        <md-card  style = " padding:2vh;  background:teal; color:white; margin-top:5vh"  md-with-hover> 
            <h2 style="text-align:center" >My Reviews</h2>
        </md-card>
   
        
        <div class = 'md-layout md-alignment-center-center'>
            <!-- <ReviewCard/> -->
            <ReviewSection/>
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
    import NavBar from '../components/NavBar'
    import capline from '../components/capline'
    // import Feed from '../components/Feed'
    // import Ratings from '../components/Ratings'
    import ReviewSection from '../components/ReviewSection'

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
            User: null,
            treeData: [ {
                "name" : "General Modules",
                "off": true,
                "value": 0,
                "children": [
                     {
                        'name': "GER1000",
                        'value': 0
                    },
                    {
                        'name': "GET1001",
                        'value': 0.7
                    }
                ] 
            },{
                "name" : "Core Modules",
                "value": 0,
                "off": true,
                "children": [
                     {
                        'name': "BT1101",
                        'value': 0
                    },
                    {
                        'name': "BT2101",
                        'value': 0
                    }
                ] 
            },{
                "name" : "Programme Modules",
                "value": 0,
                "off": true,
                "children": [
                     {
                        'name': "BT4222",
                        'value': 0.7
                    },
                    {
                        'name': "BT4102",
                        'value': 0.7
                    }
                ] 
            },]
        };
    },
    mounted() {
        if (this.userPassed) {
            this.User = this.userPassed   
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
