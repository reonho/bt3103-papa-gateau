<template>
<div id = "Radar" style="text-align:center">
     <md-card style="background-color:#1ABC9C;; color:whitesmoke; padding:1vh">
        <h1>My Strengths</h1> </md-card>
     <apexchart type="radar" :options="chartOptions2" :series="series1" ref="strengths"></apexchart>
</div>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'
    
export default {
    mounted(){
        this.update()
        //this.$refs.strengths.toggleSeries('My Average')
    },
    name: 'RadarChart',
    components:{
        apexchart: VueApexCharts
    },
    props: {
        msg: String
    },
    data: function(){ 
        return {
            series1: [{ name: 'My Average',data: [5, 4.5, 4, 5, 3, 4],}, { name: 'NUS Average',data: [3.6, 3, 4, 3.5, 4, 4],}, { name: 'Course Average',data: [4, 4.1, 4, 4.3, 4.2, 4],}],
            chartOptions2: {
                chart: {
                    id:"strengths",
                    height: 350,
                    type: 'radar',
                    dropShadow: {
                        enabled: false,
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
                colors:['#00aaff', '#ff9900', '#2cab93', "#77cbed", '#E91E63', '#FF9800',],
                fill: {
                    opacity: 0.05
                },
                plotOptions: {
                    radar: {
                        polygons: {
                        strokeColor: '#e8e8e8',
                        fill: {
                            colors: ['#f8f8f8', '#fff']
                        }
                        }
                    }
                    }
            },   
        }
    },
    methods:{
        update: function() {
            this.$refs.strengths.toggleSeries('Course Average')
    },
    
  }
}

   


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
