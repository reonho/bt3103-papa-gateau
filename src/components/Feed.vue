<template>
  <div>


     <b-row>
           
            <b-col>
             
               <md-card class="completed" style = "padding:2vh; background:whitesmoke"> 
                    <md-card style="color:whitesmoke; background-color:#1ABC9C; padding:1vh; margin-bottom:1vh; text-align:center">
                    <h1>Cohort Top Modules</h1> </md-card>
                    <br>
                    <h2>Top modules for {{course}} students now in {{sem}}</h2>
                    <div id="chart">
                      <apexchart type="bar" :options="chartOptions" :series="series" style=""></apexchart>
                    </div>
    
                    
                </md-card>
                    
            </b-col>

             <b-col cols="4">
         
                <md-card class="completed" style = "padding:2vh; background:whitesmoke"> 
                        <md-card style="color:whitesmoke; background-color:#1ABC9C; padding:1vh; margin-bottom:1vh; text-align:center">
                    <h1>Completed Modules</h1> </md-card>
                  
                    <br>
                    <b-row>
                      <b-col> 
                         
                           <div class="grid-container">
                             <div v-for="mod in modules" :key="mod" style="margin:5%" class="grid-item">
                              <b-button variant="outline-info" >
                                <h1>{{mod}}</h1>
                              </b-button>
                            </div>
                            </div>
                       
                      </b-col>
                    </b-row>
                </md-card>
            </b-col>


     </b-row>

  



   
  </div>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'

    export default {
        name: 'Feed',
        props: {
            modules: Array ,
            course:String,
            sem:String
        },
               components: {
          apexchart: VueApexCharts,
        },
        data: function() {
          return{
          
          series: [{
            data: [100,80,80,75,75,60,55,50,50,40,40,30,15]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
            },
            plotOptions: {
              bar: {
                horizontal: true,
                color:["teal"]
              }
            },
            dataLabels: {
              enabled: true
            },
            xaxis: {
              categories: [ "MA1101R","EC1301","GER1000","BT1101","IS1103","ST2334", "MA1521","BT2101","CS1010S","IS2101","BT2102","BT3103","BT3102", "CS2030",]
            }
          },
          
          
        }
        }
    }
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto ;
  padding: 2%;
  grid-column-gap: 2%;
  grid-auto-rows: auto;
  overflow: scroll;
}

.grid-item {
  text-align: center;
  padding:2%

}

.chart{
  overflow:scroll; 
  max-height:50vh
}

</style>
