<template>
  <div>
    
      <apexchart
        style="background-color:white;width:100%;margin-top:-2%"
        type="bar"
        height="170"
        :options="chartOptions"
        :series="seriesStats"
      ></apexchart>
    
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
export default {
  props: {
    seriesStats: {
      type: Array,
      required: true
    }
  },
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          }
        },
        fill: {
            colors: ['#EC7663']
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#EC7663'],
        xaxis: {
          categories: [
            "Lectures",
            "Tutorials",
            "Laboratory",
            "Project",
            "Preparation"
          ],
          tickAmount: 10,
          max: 10
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>
