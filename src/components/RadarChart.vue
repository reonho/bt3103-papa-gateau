<template>
  <div id="Radar">
    <apexchart type="radar" :options="chartOptions2" :series="series1" ref="strengths"></apexchart>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import database from "../firebase";
export default {
  name: "radar",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    my_attr: Array,
    fac_attr: Array
  },
  data: function() {
    return {
      series1: [
        { name: "My Attributes", data: [5, 0] },
        { name: "Faculty Average", data: [0, 5] }
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
          }
        },
        dataLabels: {
          enabled: true
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
    parse_attr: function(my_attr, fac_attr) {
      var my_attrs = [];
      var attr_labels = [];
      var fac_attrs = [];
      var len = my_attr.length;
      var lenf = fac_attr.length;
      for (let i = 0; i < len; i++) {
        var m_code = my_attr[i].att;
        attr_labels.push(m_code);
        var m_val = my_attr[i].grade;
        my_attrs.push(m_val);
        for (let u = 0; u < lenf; u++) {
          var f_code = fac_attr[u].att;
          if (f_code == m_code) {
            fac_attrs.push(fac_attr[u].grade);
          }
        }
      }

      this.series1[0].data = my_attrs;
      this.series1[1].data = fac_attrs;
      this.chartOptions2.xaxis.categories = attr_labels;
    },

    parse_attr2: function(my_attr, fac_attr) {
      var attr_labels = [];
      var fac_attrs = {};
      var m_list = [];
      var f_list = [];
      var lenf = fac_attr.length;
      for (let i = 0; i < lenf; i++) {
        var f_code = fac_attr[i].att;
        if (fac_attrs[f_code] == undefined) {
          fac_attrs[f_code] = [fac_attr[i].grade.toFixed(2)];
        }
      }

      my_attr.sort(function(a, b) {
        return b.grade - a.grade;
      });

      var len = my_attr.length;
      if (len > 6) {
        len = 6;
      }
      for (let i = 0; i < len; i++) {
        var m_code = my_attr[i].att;
        m_list.push(my_attr[i].grade);
        attr_labels.push(m_code);
        f_list.push(fac_attrs[m_code]);
      }

      this.series1[0].data = m_list;
      this.series1[1].data = f_list;
      this.chartOptions2.xaxis.categories = attr_labels;
    }
  },
  created() {
    //console.log(this.fac_attr);
    this.parse_attr2(this.my_attr, this.fac_attr);

    database.getModuleAttributes('BT2101').then(m => {
      console.log(m)
      console.log(m[0])

      
    })

    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>