<template>
<div style="text-align:center">
    <md-card style="background-color:#1ABC9C;; color:whitesmoke; padding:1vh">
        <h1>My Grades</h1> </md-card>
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
            msg: String,
            sap: Array
        },

        data: function(){ 
            return {
                series1: [{ name: 'Semester Grade', data: [0,0],},
                 { name: 'Cumulative Grade', data: [0,0],}],
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
        },
        methods:{
            parse_sap: function(obj_array){
                console.log(obj_array[0].one)
                var sap_series = []
                var cum_series = []
                var keys = ["one","two","three","four","five", "six", "seven", "eight"]
                for(let i=0; i < 8; i++){
                    var key = keys[i]
                    //console.log(obj_array[0][key])
                    var value = obj_array[i][key]
                    
                    if (!value){
                        break
                    }
                    
                    
                    sap_series.push(value)
                    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
                    cum_series.push(average(sap_series))
                    
                }
                this.series1[0].data = sap_series
                this.series1[1].data = cum_series
            }
        },
        created(){
            this.parse_sap(this.sap)
            
        },
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
