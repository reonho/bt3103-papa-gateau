<template>
<div id = "Radar">
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
                series1: [{ name: 'My Average',data: [4.9, 4.5, 4, 4.2, 4.1, 4.3],}, { name: 'NUS Average',data: [4, 3.9, 3.71, 3.70, 3.69, 3.67],}],
                chartOptions2: {
                    chart: {
                        type: 'line',
                        height: 350,
                          toolbar: {
                            show: false,
                          }
                    },
                    stroke: {
                    curve: 'smooth',
                    },
                    yaxis: [
                            {
                            min: 2.5,
                            max: 5,
                            }],

                    dataLabels: {
                        enabled: true,
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
