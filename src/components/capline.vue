<template>
<div style="text-align:center">
    <md-card style="background-color:#1ABC9C;; color:whitesmoke; padding:1vh">
        <h1>My Grade</h1> </md-card>
    <apexchart type="line" :options="chartOptions2" :series="series1"></apexchart>
</div>
</template>


<script>
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'capline',
        components:{
            apexchart: VueApexCharts
        },
        props: {
            msg: String
        },
        data: function(){ 
            return {
                series1: [{ name: 'Semester Grade',data: [4.9, 4.5, 4, 4.2, 4.1, 4.3],},
                 { name: 'NUS Average',data: [4, 3.9, 3.71, 3.70, 3.69, 3.67],}, 
                 { name: 'Course Average',data: [4, 4.1, 4, 4.3, 4.2, 4],}, 
                 { name: 'Cumulative Grade',data: [4.9, 4.7, 4.46, 4.4, 4.34, 4.33],}],
                chartOptions2: {
                    chart: {
                        type: 'line',
                        toolbar: {
                            show: false,
                          },
                        selection:false
                    },
                    stroke: {
                    curve: 'smooth',
                    },
                    yaxis: [
                            {
                            min: 3,
                            max: 5,
                            }],

                    dataLabels: {
                        enabled: true,
                    },
                    colors:['#00aaff', '#ff9900', '#2cab93', "#9500ff", '#E91E63', '#FF9800',],
                    fill: {
                        opacity: 0.5,
                        colors: []
                        }

                },   
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
