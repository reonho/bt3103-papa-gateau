<template>
<div class="landPage">
    <NavBar/>
    <div class="container-fluid" style="text-align: justify">
        <h1 class="mt-4 mb-3 ml-3">Student Insights</h1>
        <h3 class = "ml-3">My Stats </h3>
        <div style="display:flex" class= "container-fluid p-3">
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <RadarChart/>
            </div>
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <TreeChart/>
            </div>
        </div>
        <AddModulesModal/>
    </div>
</div>
</template>


<script>
    import AddModulesModal from "../components/AddModuleModal"
    import RadarChart from "../components/RadarChart.vue"
    import TreeChart from "../components/TreeChart"
    import NavBar from '../components/NavBar'
    export default {
    name: 'LandPage',
    props: {
        msg: String
    },
    components:{
        AddModulesModal,
        RadarChart,
        TreeChart,
        NavBar
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
