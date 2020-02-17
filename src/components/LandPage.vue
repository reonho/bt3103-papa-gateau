<template>
<div class="land">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
        <a class="navbar-brand" href="#">
            <img src="https://www.iconsdb.com/icons/preview/white/nike-xxl.png" alt="" height=50 width=50>
            </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
            <a class="nav-link" href="#">Home
                    <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
            </li>
        </ul>
        </div>
    </div>
    </nav>

<!-- Page Content -->
    <div class="container-fluid" style="text-align: justify">
        <h1 class="mt-4 mb-3 ml-3">BT3103 Protoype App</h1>
        <h3 class = "ml-3">My Stats </h3>
        <div style="display:flex" class= "container-fluid p-3">
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <apexchart type="radar" :options="chartOptions2" :series="series1"></apexchart>
            </div>
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <apexchart type="line" :options="chartOptions1" :series="series2"></apexchart>
            </div>
        </div>
        <AddModulesModal/>
    </div>
</div>
</template>


<script>
    import AddModulesModal from "./AddModuleModal.vue"
    export default {
    name: 'LandPage',
    props: {
        msg: String
    },
    components:{
        AddModulesModal
    },
    data: function(){ 
        return {series1: [{ name: 'My Average',data: [5, 4.5, 4, 5, 3, 4],}, { name: 'NUS Average',data: [3.6, 3, 4, 3.5, 4, 4],}],
        series2: [{ name: 'Series 2',data: [4.1, 4.4, 4.2, 4],}],
        chartOptions2: {
            chart: {
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 5,
                    blur: 3,
                    color: '#000',
                    opacity: 0.3
                },
            },
            dataLabels: {
                enabled: true,
            },
            title: {
                text: ''
            },
            xaxis: {
                labels: {
                style: {
                    fontSize: '15px',
                    colors: ''
                }
                },
                categories: ['CS', 'BT', 'EC', 'MA', 'IS', 'CNM']
            },
        },
        chartOptions1: {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 1,
                    left: 1,
                    blur: 10,
                    opacity: 0.15
                },
                toolbar: {
                show: false
                }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                labels: {
                    style: {
                    fontSize: '15px',
                    colors: ''
                    }
                },
                categories: ['Y1S1', 'Y1S2', 'Y1S2', 'Y2S2']
            },
            yaxis: {
                title: {
                    text: 'CAP'
                },
                
                max: 5.0,
                min: 1
                },
                
        }
        };
    
    }
    
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
