
<template>
  <div>
    <div class="contain-div">
      <div class="sub-contain-div1">
        <div class="sub-header-content">
          <div class="sub-header-title">COMPLETED MODULES</div>
          <div class="sub-header-content" style="padding:3vh;">
            <ViewSemesterSection :User="User" v-if="User" />
          </div>
        </div>
      </div>

      <div class="sub-contain-div2">
        <div class="sub-header-content">
          <div class="sub-header-title">TOP MODULES TAKEN BY YOUR COHORT</div>
          <div v-show="loading">
            <md-empty-state
              id="statebox"
              style="max-width:0 !important; color: #2e4053;"
              md-label="Loading Modules..."
            >
              <br />
              <ScaleLoader :loading="loading" :color="color"></ScaleLoader>
            </md-empty-state>
          </div>
          <div class="sub-header-content" style="padding-top:1vw;" v-show="!loading">
            <div id="chart">
              <apexchart
                type="bar"
                :options="chartOptionsYear"
                v-show="!showEmpty"
                :series="series"
                ref="top"
              ></apexchart>
              <div v-show="showEmpty">
                <md-empty-state
                  id="stateboxcor"
                  style="max-width:0 !important;  color: #2e4053;"
                  md-icon="bar_chart"
                  md-label="No Batch Data to Display"
                  md-description="There is no one in your batch who took the same modules. Start adding new modules in the Grades section!"
                ></md-empty-state>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import ViewSemesterSection from "../components/ViewSemesterSection";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
//import database from "../firebase.js";
export default {
  name: "Feed",
  props: {
    modlist: Array,
    sem: String,
    User: Object
  },
  components: {
    ViewSemesterSection,
    apexchart: VueApexCharts,
    ScaleLoader
  },
  data: function() {
    return {
      course: Object,
      color: "#eda200",
      loading: false,
      series: [
        {
          name: "Number of students taking the module",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          padding: 1
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        fill: {
          colors: ["#008080"]
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: []
        }
      }
    };
  },
  created() {
    this.readData(this.modlist);
  },

  methods: {
    redirect: function(mod) {
      this.$router.push("/" + mod);
    },
    readData: function(modlst1) {
    
      var modlst = [...modlst1];
      modlst = modlst.sort((a, b) => -a.amt + b.amt);
    
      var series_mod = [];
      var mods = [];
      for (let i = 0; i < modlst.length; i++) {
        series_mod.push(Math.trunc(modlst[i].amt));
        if (!mods.includes(modlst[i].mod)) {
          mods.push(modlst[i].mod);
        }
      }
      this.series[0].data = series_mod;
      this.chartOptionsYear.xaxis.categories = mods;
      this.loading = false;
     
    }
  },
  computed: {
    chartOptionsYear: function() {
      return {
        colors: ["#008080"],
        chart: {
          toolbar: {
            show: false
          },
          type: "bar",
          events: {
            dataPointSelection: (e, chart, opts) => {
              // you can call Vue methods now as "this" will point to the Vue instance when you use ES6 arrow function
              //console.log(e)
              var mod = this.chartOptionsYear.xaxis.categories[
                opts.dataPointIndex
              ];
             
              this.redirect(mod);
            }
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
          categories: []
        }
      };
    },
    showEmpty() {
      if (this.series[0].data.length == 0 && this.loading == false) {
        return true;
      }
      return false;
    }
  },
  watch: {
    modlist: function() {
      this.readData(this.modlist);

      this.$refs.top.updateSeries(
        [
          {
            data: this.series[0].data
          }
        ],
        false,
        true
      );
      this.$refs.top.updateOptions({
        xaxis: {
          categories: this.chartOptionsYear.xaxis.categories
        }
      });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0;
  grid-auto-rows: auto;
  overflow-y: auto;
}
.grid-item {
  text-align: center;
  padding: 2%;
}
.chart {
  overflow-y: scroll;
  max-height: 100vh;
}
.sub-header-title {
  font-size: 2.3vh;
  font-weight: bold;
  text-align: left;
  padding: 3vh;
  color: #566573;
}
.sub-header-content {
  font-family: "Open Sans", sans-serif;
  background: white;
  text-align: left;
  padding: 0;
  min-height: 67vh;
}
.sub-content-title {
  font-size: 2.5vh;
  font-weight: bold;
  text-align: left;
}
.sub-content-text {
  font-size: 3vh;
  text-align: left;
  padding-bottom: 4vh;
  color: #2e4053;
}
.mod-btn {
  width: 15vh;
  padding: 0.5vh;
}

.contain-div {
  display: flex;
  background-color: white;
  max-height: 75vh;
}
.sub-contain-div1 {
  border-right: 2vw solid #ebecf0;
  width: 43vw;

  background-color: white;
  float: left;
  overflow-y: scroll;
}
.sub-contain-div2 {
  width: 47vw;

  background-color: white;
  float: right;
}
.btn-outline-info {
  color: #ec7663;
  border-color: #ec7663;
  border: 2px solid;
}

.btn-outline-info:hover {
  background-color: #ec7663;
  border-color: #ec7663;
}
</style>
<style>
#stateboxcor .md-icon.md-icon-font.md-empty-state-icon.md-theme-default {
  font-size: 9vw !important;
  color: teal;
}

#stateboxcor .md-empty-state-label {
  font-size: 1.3vw !important;
}

#stateboxcor .md-empty-state-description {
  font-size: 1vw !important;
}

#stateboxcor .md-empty-state-container {
  padding-top: 10vh;
  width: 28vw;
}
</style>