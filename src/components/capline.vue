<template>
  <div style="text-align:center" id="chart">
    <apexchart ref="chart" type="line" :options="chartOptions2" :series="series1"></apexchart>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import database from "../firebase.js";
export default {
  name: "capline",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    msg: String,

    User: Object,

  },
  data: function() {
    return {
      modulesData: [],
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
        xaxis: {
          tooltip: {
            formatter: function (value) {
              return "Semester " + value
            }
          }
        },
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
    parse_sap: function(obj_array, grades) {
      var clone_array = [...obj_array];
      var clone_grades = [...grades];
      clone_array = clone_array.sort(function(a, b) {
        if (a.year.substring(2, 6) == b.year.substring(2, 6)) {
          return a.sem.substring(9, 10) - b.sem.substring(9, 10);
        }
        return a.year.substring(2, 6) - b.year.substring(2, 6);
      });

      var sap_series = [];
      var cum_series = [];
      var total_sems = [];
      if (grades.length > 0) {
      for (var k = 0; k < clone_array.length; k++) {
        var sem = clone_array[k];
        var total_grades = [];

        for (var j = 0; j < clone_grades.length; j++) {
          var mod = clone_grades[j];
          if (mod.year == sem.year && mod.sem == sem.sem) {
            var result = {
              code: mod.module,
              grade: mod.grade,
              MC: 4,
              year: mod.year,
              sem: mod.sem
            };

            total_grades.push(result);
          }
        }
        var result2 = {
          mods: total_grades,
          sem: sem.sem,
          year: sem.year,
          cap: sem.cap
        };
        total_sems.push(result2);
      }

      var totalscore = 0;
      var mc = 0;
      for (let i = 0; i < total_sems.length; i++) {
        var actmodules = total_sems[i].mods;
        //console.log(obj_array[0][key])
        for (var m = 0; m < actmodules.length; m++) {
          var module = actmodules[m];

          totalscore += database.convertCap(module.grade) * module.MC;
          mc += module.MC;
        }
        if (i != 0) {
          var cum = totalscore / mc;
          cum_series.push(cum);
        } else {
          cum_series.push(total_sems[i].cap);
        }
        sap_series.push(total_sems[i].cap);
      }
      this.series1[0].data = sap_series;
      this.series1[1].data = cum_series;
      }
    }
  },
  computed: {
    combined() {
      return this.sap && this.usergrades;
    }
  },
  created() {
        this.parse_sap(this.User.sap_by_sem, this.User.usergrades);
  },
  watch: {
    User: function() {
     
        console.log("changed");
        this.parse_sap(this.User.sap_by_sem, this.User.usergrades);
        console.log(this.series1[1].data);
        this.$refs.chart.updateSeries([
          { data: this.series1[0].data },
          { data: this.series1[1].data}
        ]);
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>