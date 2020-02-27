<template>
  <div>
    <apexchart
      style=""
      type="line"
      height="170"
      :options="chartOptions2"
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
      required : true
    }
  },
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      chartOptions2: {
        title: {
          text: "Student Intake Per Semester"
        },
        chart: {
          type: "line",
          height: 150,
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth",
          width: 3
        },
        xaxis: {
          categories: ["Aug 2018", "Jan 2019", "Aug 2019", "Jan 2020"]
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
