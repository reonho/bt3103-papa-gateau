<template>
  <div id="Radar">
    <apexchart
      type="radar"
      :options="chartOptions2"
      :series="series1"
      v-show="!showEmpty"
      ref="strengths"
    ></apexchart>
    <div v-show="showEmpty">
      <md-empty-state
        id="statebox"
        style="max-width:0 !important;  color: #2e4053;"
        md-icon="layers"
        md-label="No Attributes to Display"
        md-description="Start by adding modules in the Grades section!"
      ></md-empty-state>
    </div>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "radar",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    my_attr: Array,
    fac_attr: Array,
    type: String,
    label_1: String,
    label_2: String
  },
  data: function() {
    return {
      series1: [
        { name: this.label_1, data: [] },
        { name: this.label_2, data: [] }
      ],
      chartOptions2: {
        chart: {
          id: "strengths",
          type: "radar",
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 5,
            left: 5,
            blur: 3,
            color: "#000",
            opacity: 0.3
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: true
        },

        legend: {
          position: "bottom"
        },

        title: {
          text: ""
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "15px",
              colors: ""
            }
          },
          categories: []
        },
        colors: [
          "#00aaff",
          "#ff9900",
          "#2cab93",
          "#77cbed",
          "#E91E63",
          "#FF9800"
        ],
        fill: {
          opacity: 0.05
        },
        plotOptions: {
          radar: {
            polygons: {
              strokeColor: "#e8e8e8",
              fill: {
                colors: ["#f8f8f8", "#fff"]
              }
            }
          }
        }
      }
    };
  },
  methods: {
    parse_attr2: function(my_attr1, fac_attr1) {
      var my_attr = [...my_attr1];
      var fac_attr = [...fac_attr1];
      var attr_labels = [];
      var fac_attrs = {};
      var m_list = [];
      var f_list = [];
      if (this.type == "Module" && !fac_attr && my_attr) {
        //For ModuleRadarChart, if the user has no attributes
        var len = my_attr.length;
        if (len > 6) {
          len = 6;
        }
        for (let i = 0; i < len; i++) {
          var m_code = my_attr[i].att;
          if (m_code !== "") {
            m_list.push(my_attr[i].grade.toFixed(2));
            attr_labels.push(m_code);
            f_list.push(0);
          }
        }
      } else {
        var lenf = fac_attr.length;
        for (let i = 0; i < lenf; i++) {
          var f_code = fac_attr[i].att;
          if (fac_attrs[f_code] == undefined) {
            fac_attrs[f_code] = fac_attr[i].grade.toFixed(2);
          }
        }
        my_attr.sort(function(a, b) {
          return b.grade - a.grade;
        });
        len = my_attr.length;

        if (len > 6) {
          len = 6;
        }
        for (let i = 0; i < len; i++) {
          m_code = my_attr[i].att;
   
          if (m_code !== "") {
            m_list.push(my_attr[i].grade.toFixed(2));
            attr_labels.push(m_code);
            if (fac_attrs[m_code] !== undefined) {
              f_list.push(fac_attrs[m_code]);
            } else {
              f_list.push(0);
            }
          }
        }
      }

      this.series1[0].data = m_list;
      this.series1[1].data = f_list;
      this.chartOptions2.xaxis.categories = attr_labels;
   
    }
  },
  created() {
    this.parse_attr2(this.my_attr, this.fac_attr);
    
  },
  computed: {
    showEmpty() {

      var attr = []
      for (var i = 0; i < this.my_attr.length; i++) {
        if (this.my_attr[i].att != "") {
          attr.push(this.my_attr[i])
        }
      } 
      if (this.type === "Faculty" && attr.length === 0) {
        return true;
      }
      return false;
    }
  },
  watch: {
    my_attr: function() {
      //console.log("changed");
      this.parse_attr2(this.my_attr, this.fac_attr);
      this.$refs.strengths.updateSeries(
        [
          {
            data: this.series1[0].data
          },
          { data: this.series1[1].data }
        ],
        false,
        true
      );
      this.$refs.strengths.updateOptions({
        xaxis: {
          categories: this.chartOptions2.xaxis.categories
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#statebox .md-icon.md-icon-font.md-empty-state-icon.md-theme-default {
  font-size: 9vw !important;
  color: teal;
}
#statebox .md-empty-state-label {
  font-size: 1.3vw !important;
}
#statebox .md-empty-state-description {
  font-size: 1vw !important;
}
#statebox .md-empty-state-container {
  width: 42vw;
}

@media screen and (min-width: 1700px) {
  #statebox .md-icon.md-icon-font.md-empty-state-icon.md-theme-default {
    font-size: 5vw !important;
    color: teal;
  }
  #statebox .md-empty-state-label {
    font-size: 1vw !important;
  }
  #statebox .md-empty-state-description {
    font-size: 1vw !important;
  }
  #statebox .md-empty-state-container {
    width: 42vw;
  }
}
</style>