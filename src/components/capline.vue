<template>
  <div style="text-align:center">
    <apexchart type="line" :options="chartOptions2" :series="series1"></apexchart>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "capline",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    msg: String,
    sap: Array
  },
  data: function() {
    return {
      series1: [
        { name: "Semester CAP", data: [] },
        { name: "Cumulative CAP", data: [] }
      ],
      chartOptions2: {
        chart: {
          type: "area",
          toolbar: {
            show: false
          },
          selection: false
        },
        stroke: {
          curve: "smooth"
        },
        yaxis: [
          {
            min: 0,
            max: 5,
            labels: {
              formatter: function(val) {
                return val.toFixed(2);
              }
            }
          }
        ],
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val.toFixed(2);
          }
        },
        colors: [
          "#00aaff",
          "#2cab93",
          "#ff9900",
          "#9500ff",
          "#E91E63",
          "#FF9800"
        ],
        fill: {
          opacity: 0.5,
          colors: []
        }
      }
    };
  },
  methods: {
    parse_sap: function(obj_array) {
      console.log(obj_array)
      obj_array = obj_array.sort(function(a, b) {
        if (a.year.substring(2,6) == b.year.substring(2,6)) {
          return a.sem.substring(9,10) - b.sem.substring(9,10);
        }
        return a.year.substring(2,6) - b.year.substring(2,6);
      });

      var sap_series = [];
      var cum_series = [];

      for (let i = 0; i < obj_array.length; i++) {
        //console.log(obj_array[0][key])
        var value = obj_array[i]["cap"];
        if (typeof value != "undefined" && value != 0) {
          sap_series.push(value);
          const average = list =>
            list.reduce((prev, curr) => prev + curr) / list.length;
          cum_series.push(average(sap_series));
        }
      }
      this.series1[0].data = sap_series;
      this.series1[1].data = cum_series;
    }
  },
  created() {
    this.parse_sap(this.sap);
  },
  watch: {
    // sap(value) {
     
    //   console.log('watch')
    //   this.parse_sap(value);
    //   console.log(value)
      
    // }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>