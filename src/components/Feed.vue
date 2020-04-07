<template>
  <div>
    <table style="width:100%">
      <tr>
        <td style="width: 60%;padding:0;">
          <div>
            <div class="sub-header-title">TOP COHORT</div>
            <div class="sub-header-content" style="padding-top:1vw;">
              <div id="chart">
                <apexchart type="bar" :options="chartOptions" :series="series" style></apexchart>
              </div>
            </div>
          </div>
        </td>
        <td style="width: 5%"></td>
        <td style="width: 435%;padding:0">
          <div>
            <div class="sub-header-title">COMPLETED MODULES</div>
            <div class="sub-header-content" style="padding:0;;">
              <div class="grid-container">
                <div v-for="mod in modules" :key="mod" style="margin:5%" class="grid-item">
                 <router-link class="nav-link" :to = " '/' + mod" >
                  <b-button class="mod-btn" variant="outline-info">
                    <h1 style="font-size:2.5vh">{{mod}}</h1>
                  </b-button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "Feed",
  props: {
    modules: Array,
    course: String,
    sem: String
  },
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    return {
      series: [
        {
          data: [100, 80, 80, 75, 75, 60, 55, 50, 50, 40, 40, 30, 15]
        }
      ],
      chartOptions: {
        chart: {
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },

        fill: {
          colors: ["#17a2b8"]
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: [
            "MA1101R",
            "EC1301",
            "GER1000",
            "BT1101",
            "IS1103",
            "ST2334",
            "MA1521",
            "BT2101",
            "CS1010S",
            "IS2101",
            "BT2102",
            "BT3103",
            "BT3102",
            "CS2030"
          ]

        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 2%;
  grid-column-gap: 2%;
  grid-auto-rows: auto;
  overflow: scroll;
}
.grid-item {
  text-align: center;
  padding: 2%;
}
.chart {
  overflow: scroll;
  max-height: 100vh;
}

.sub-header-title {
  font-family: "Open Sans", sans-serif;
  font-size: 150%;
  font-weight: bold;
  text-align: left;
  padding: 25px;
  background-color: #17a2b8;
  color: white;
}
.sub-header-content {
  font-family: "Open Sans", sans-serif;
  background: white;
  font-weight: bold;
  text-align: left;
  padding: 0;
  padding-left: 25px;
  min-height:67vh;

}
.sub-content-title {
  font-size: 2.5vh;
  font-weight: bold;
  text-align: left;
  color: #17a2b8;
}
.sub-content-text {
  font-size: 3vh;
  text-align: left;
  padding-bottom: 4vh;
  color: #2e4053;
}

.mod-btn {
  width: 15vh;
}
</style>
