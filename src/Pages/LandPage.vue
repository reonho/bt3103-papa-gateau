<template>
<div class="landPage">
    <NavBar/>
    <div class="container-fluid" style="text-align: justify">
        <h1 class="mt-4 mb-3 ml-3"> Hello {{User.User}}!</h1>
        <AddModulesModal class="ml-3"/><br>
        <h3 style="text-align:center">My Stats </h3>
        <div style="display:flex" class= "container-fluid p-3">
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <RadarChart/>
            </div>
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
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
        </div>
        <!-- <md-tabs class="md-transparent" md-alignment="fixed">
            <md-tab id="tab-home" md-label="Home"></md-tab>
            <md-tab id="tab-pages" md-label="Pages"></md-tab>
            <md-tab id="tab-posts" md-label="Posts"></md-tab>
            <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
        </md-tabs> -->
        <!-- <p>{{this.Data}}</p> -->
        <!-- <Feed/> -->
        <md-content class = 'md-layout md-alignment-center-center'>
        <ReviewCard/>
        </md-content>
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
