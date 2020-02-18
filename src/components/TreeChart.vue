<template>
<div id = "Tree">
    <apexchart type="line" :options="chartOptions1" :series="series2"></apexchart>
</div>
</template>


<script>
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'TreeChart',
        components:{
            apexchart: VueApexCharts
        },
        props: {
            msg: String
        },
        data: function(){ 
            return {
                series2: [{ name: 'Series 2',data: [4.1, 4.4, 4.2, 4],}],
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
                        categories: ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2']
                    },
                    yaxis: {
                        title: {
                            text: 'CAP'
                        },
                        max: 5.0,
                        min: 1
                    },
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
