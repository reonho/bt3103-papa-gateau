<template>
<div style="text-align:center">
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
                series1: [{ name: 'My Average',data: [4.9, 4.5, 4, 4.2, 4.1, 4.3],}, { name: 'NUS Average',data: [4, 3.9, 3.71, 3.70, 3.69, 3.67],}],
                chartOptions2: {
                    chart: {
                        type: 'area',
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
                            "labels": {
                                "formatter": function (val) {
                                    return val.toFixed(2)
                                }
                            }
                            }],

                    dataLabels: {
                        enabled: true,
                        "formatter": function (val) {
                                return val.toFixed(2)
                            }
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
                
                var sap_series = []
                var cum_series = []
                for(let i=0; i < 8; i++){
                    
                    //console.log(obj_array[0][key])
                    var value = obj_array[i]["cap"]
                    
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
