<template>
<div id = "Radar">
     <apexchart type="radar" :options="chartOptions2" :series="series1"></apexchart>
</div>
</template>


<script>
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'RadarChart',
        components:{
            apexchart: VueApexCharts
        },
        props: {
            msg: String
        },
        data: function(){ 
            return {
                series1: [{ name: 'My Average',data: [5, 4.5, 4, 5, 3, 4],}, { name: 'NUS Average',data: [3.6, 3, 4, 3.5, 4, 4],}],
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
