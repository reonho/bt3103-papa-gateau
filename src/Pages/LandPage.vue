<template>
<div class="landPage">
    <NavBar/>
    <div class="container-fluid" style="text-align: justify">
        <h1 class="mt-4 mb-3 ml-3">Student Insights</h1>
        <AddModulesModal class="ml-3"/><br>
        <h3 style="text-align:center">My Stats </h3>
        <div style="display:flex" class= "container-fluid p-3">
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <RadarChart/>
            </div>
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <TreeChart/>
            </div>
        </div>
       
        <Feed/>
    </div>
</div>
</template>


<script>
    import AddModulesModal from "../components/AddModuleModal"
    import RadarChart from "../components/RadarChart.vue"
    import TreeChart from "../components/TreeChart"
    import NavBar from '../components/NavBar'
    import Feed from '../components/Feed'
    export default {
    name: 'LandPage',
    props: {
    },
    components:{
        AddModulesModal,
        RadarChart,
        TreeChart,
        NavBar,
        Feed
    },
    data: function(){ 
        return {
        };
    
    }
    
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
