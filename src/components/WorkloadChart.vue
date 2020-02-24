<template>
  <div>
    
      <apexchart
        style="background-color:white;width:350px;padding:10px"
        type="bar"
        height="150"
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
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },

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
