<template>
<div class="landPage" style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);">
    <NavBar/>
    <md-card  style = "margin-top:3vh; padding:2vh; margin:4vh" md-with-hover> 
        <div class="md-layout md-gutter md-alignment-center-right">
        <div class = "md-layout-item"> <h1>Hello, {{User.User}}!</h1></div>
        <div class = "md-layout-item" style="text-align:right">
            <AddModulesModal/>
        </div>
        </div>
    </md-card>
        <!--div style="display:flex" class= "container-fluid p-3"-->
        <div class="md-layout md-gutter md-alignment-center" style="margin:2vh">
            <div class = "md-layout-item">
            <md-card style="height:70vh" md-with-hover>
                <md-card style="background:salmon;color:white">
                <md-card-header>
                    <div class="md-title">My Stats and Attributes</div>
                    <div class="md-subhead">Discover your strengths and weaknesses!</div>
                </md-card-header>
                </md-card>
            <div id="chart">
                <RadarChart/>
            </div>
            </md-card>
            </div>
            <div class="md-layout-item">
            <md-card style="height:70vh" md-with-hover>
                <md-card style="background:salmon;color:white">
                <md-card-header>
                    <div class="md-title">My Degree progress</div>
                    <div class="md-subhead">Explore your graduation requirements and completed modules.</div>
                </md-card-header>
                </md-card>
            <div id="treechart" >
                <md-tabs md-alignment="centered">
                    <md-tab id="OverallProgress" md-label="Academic Progress" >
                        <OverallProgress/>
                    </md-tab>
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
            </div>
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
        
           
        <md-card  style = " padding:2vh;  margin-left:25vh; margin-right:25vh; background:salmon; color:white; margin-top:5vh"  md-with-hover> 
            <h2 style="text-align:center" >My Reviews</h2>
        </md-card>
   
        
        <div class = 'md-layout md-alignment-center-center'>
            <ReviewCard/>
        </div>
    </div>

</template>


<script>
    import DataObject from "../Database.js"
    import AddModulesModal from "../components/AddModuleModal"
    import RadarChart from "../components/RadarChart.vue"
    import TreeChartGe from "../components/TreeCharts/TreeChartGe"
    import TreeChartCe from "../components/TreeCharts/TreeChartCe"
    import TreeChartPe from "../components/TreeCharts/TreeChartPe"
    import OverallProgress from "../components/OverallProgress"
    import NavBar from '../components/NavBar'
    // import Feed from '../components/Feed'
    import ReviewCard from '../components/ReviewCard'
    export default {
    name: 'LandPage',
    props: [
        'userPassed'
    ],
    components:{
        AddModulesModal,
        RadarChart,
        TreeChartGe,
        TreeChartCe,
        TreeChartPe,
        OverallProgress,
        NavBar,
        // Feed
        ReviewCard
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
    },
    data: function(){ 
        return {
            // assign data into Data attribute
            Data: this.findModule("CS2030",DataObject),
            User: null,
            treeData: {
                "ge": ["GER1000","GET1001", "GEQ1000","GES1000"],
                "pe": ["BT4222","BT4221"],
                "ce": ["MA1101R","MA1521"] 
            }
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
