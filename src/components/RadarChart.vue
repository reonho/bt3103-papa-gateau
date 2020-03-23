<template>
<div style="text-align:center">
    <md-card style="background-color:#1ABC9C;; color:whitesmoke; padding:1vh">
        <h1>My Grades</h1> </md-card>
    <apexchart type="radar" :options="chartOptions2" :series="series1"></apexchart>
</div>
</template>


<script>
    import VueApexCharts from 'vue-apexcharts'
    export default {
        name: 'radar',
        components:{
            apexchart: VueApexCharts
        },
        props: {
            my_attr: Array,
            fac_attr: Array,
        },

        data: function(){ 
            return {
                series1: [{ name: 'My Attributes', data: [5,0],},
                 { name: 'Faculty Average', data: [0,5],}],
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
                    categories: [1,2,3,4]
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
            parse_attr: function(my_attr, fac_attr){

                var my_attrs = []
                var attr_labels = []
                var fac_attrs = []
                var len = my_attr.length
                var lenf = fac_attr.length

                for(let i=0; i < len; i++){
                    var m_code = my_attr[i].attribute
                    attr_labels.push(m_code)
                    var m_val = my_attr[i].score
                    my_attrs.push(m_val)
                    for(let u=0; u < lenf; u++){
                        var f_code = fac_attr[u].attribute
                        if (f_code == m_code){
                            fac_attrs.push(fac_attr[u].score)
                        }
                    }
                }
                this.series1[0].data = my_attrs
                this.series1[1].data = fac_attrs
                this.chartOptions2.xaxis.categories = attr_labels
                console.log(attr_labels)
            }
        },
        created(){
            console.log("test")
            console.log(this.fac_attr[0])
            this.parse_attr(this.my_attr, this.fac_attr)
            
        },
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
