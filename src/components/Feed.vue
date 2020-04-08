
<template>
  <div>
    <div class="contain-div">
      <div class="sub-contain-div1">
        <div class="sub-header-content">
          <div class="sub-header-title">TOP COHORT</div>
          <div class="sub-header-content" style="padding-top:1vw;">
            <div id="chart">
              <apexchart type="bar" :options="chartOptionsYear" :series="series"></apexchart>
            </div>
          </div>
        </div>
      </div>

      <div class="sub-contain-div2">
        <div class="sub-header-content">
          <div class="sub-header-title">COMPLETED MODULES</div>
          <div class="sub-header-content" style="padding:0;;">
            <div class="grid-container">
              <div
                v-for="mod in modules"
                :key="mod"
                style="margin-top:1vh; margin-bottom:1vh"
                class="grid-item"
              >
               <router-link class="nav-link" :to = " '/' + mod" >
                  <b-button class="mod-btn" variant="outline-info">
                    <h1 style="font-size:2.5vh">{{mod}}</h1>
                  </b-button>
                </router-link>
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
export default {
  name: "Feed",
  props: {
    modules: Array,
    course: Object,
    sem: String
  },
  components: {
    apexchart: VueApexCharts
  },
  data: function() {
    return {
      series: [
        {
          data: []
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
    var modlst = [];

    for (let i = 0; i < this.course.module.length; i++) {
      var mod = {};
      mod["amt"] = this.course.amount[i];
      mod["mod"] = this.course.module[i];
      modlst.push(mod);
    }
    modlst = modlst.sort((a, b) => a.amt - b.amt);

    for (let i = 0; i < this.course.module.length; i++) {
      this.series[0].data.push(modlst[i].amt);
      this.chartOptionsYear.xaxis.categories.push(modlst[i].mod);
    }

    console.log(this.series[0].data);
  },

  methods: {
    redirect: function(mod) {
      this.$router.push("/" + mod);
    }
  },
  computed: {
    chartOptionsYear: function() {
      return {
        chart: {
          type: "bar",
          events: {
            dataPointSelection: (e, chart, opts) => {
              // you can call Vue methods now as "this" will point to the Vue instance when you use ES6 arrow function
              //console.log(e)
              var mod = this.chartOptionsYear.xaxis.categories[
                opts.dataPointIndex
              ];
              console.log("#/" + mod);
              this.redirect(mod);
            }
          }
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
          enabled: false,
          
        },
        xaxis: {
          categories: []
        }
      };
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  font-weight: bold;
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
  padding:0.5vh;
}

.contain-div {
  display: flex;
  background-color:white;
}
.sub-contain-div1 {
border-right: 2vw solid #eaecee;
  width: 58vw;
  background-color: white;
  float: left;
}
.sub-contain-div2 {

  width: 32vw;
  background-color: white;
  float: right;
}
.btn-outline-info {
  color: #ec7663;
  border-color: #ec7663;
  border: 2px solid;
}

.btn-outline-info:hover{
  background-color: #ec7663;
  border-color: #ec7663;
}
</style>
