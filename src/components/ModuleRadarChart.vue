<template>
  <div id="Radar">
    <apexchart type="radar" :options="chartOptions2" :series="series1" ref="strengths"></apexchart>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import database from "../firebase";
export default {
  name: "ModuleRadarChart",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    my_attr: Array,
    fac_attr: Array,
    module_code: String //pass in modulecode from modulepage
  },
  data: function() {
    return {
      series1: [
        { name: "My Attributes", data: [5, 0] },
        { name: "Top Atttributes", data: [0, 5] }
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
          fac_attrs[f_code] = [fac_attr[i].grade];
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
    var top_students = []
    var top_attributes = {}
    //find all students who scored at least an A for the given module
    database.firebase_data
      .collection("module_grades")
      .where("module", "==", "BT2101")
      .where("grade", "in", ["A+", "A"])
      .get()
      .then(results => {
        var top_students = [];
        results.forEach(r => {
          top_students.push({
            studentID: r.data().studentID,
            grade: r.data().grade
          });
        });
        return top_students;
      })
      .then(ts => {
        var top_attributes = {};
        ts.forEach(s => {
          database.firebase_data
            .collection("students")
            .doc(s.studentID)
            .get()
            .then(user => {
              var attributes = user.data().attributes;
              attributes.forEach(attribute => {
                var att = attribute.att;
                var grade = attribute.grade;
                // top_attributes.push[{ att: att, grade: grade }];
                if (att in top_attributes) {
                  top_attributes[att].total += grade;
                  top_attributes[att].amt += 1;
                } else {
                  top_attributes[att] = {total: grade, amt: 1};
                }
              });
            });
        });
        console.log(top_attributes)
        for (var key of Object.keys(top_attributes)) {
          console.log(key)
          top_attributes[key].grade = top_attributes[key].total/top_attributes[key].amt

        }
        console.log(top_attributes);
      });

    //console.log(this.fac_attr);
    this.parse_attr2(this.my_attr, this.fac_attr);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>