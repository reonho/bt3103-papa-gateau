<template>
  <div>
    <NavBar />

    <div class="md-layout">
      <div class="md-layout-item md-size-25">
        <!-- Filter -->
        <md-content class="md-scrollbar">
          <table class="filter-header">
            <tr>
              <td>
                <span class="filter-head">FILTERS</span>
              </td>
              <td>
                <span>
                  <md-button
                    class="clear-filter"
                    :md-ripple="false"
                    v-on:click="clearfilter"
                  >Clear Filters</md-button>
                </span>
              </td>
            </tr>
          </table>
          <span class="minihead">Faculty</span>

          <md-field>
            <label for="faculties">Add Faculties...</label>
            <md-select v-model="chosenfac" name="chosenfac" id="chosenfac" md-dense multiple>
              <md-option
                v-for="faculty in faculties"
                v-bind:key="faculty.text"
                :id="faculty.text"
                v-model="faculty.value"
              >{{ faculty.text }}</md-option>
            </md-select>
          </md-field>

          <md-chips v-model="chosenfac" md-static></md-chips>

          <span class="minihead">Department</span>

          <md-field>
            <label for="faculties">Add Departments...</label>
            <md-select v-model="chosendept" name="chosendept" id="chosendept" md-dense multiple>
              <md-option
                v-for="dept in departments"
                v-bind:key="dept.text"
                :id="dept.text"
                v-model="dept.value"
              >{{ dept.text }}</md-option>
            </md-select>
          </md-field>
          <md-chips v-model="chosendept" md-static></md-chips>
          <span class="minihead">Offered in</span>
          <span v-for="sem in semarr" :key="sem.value">
            <md-checkbox v-bind:value="sem.value" v-model="chosensems">{{ sem.text }}</md-checkbox>
          </span>
          <br />
          <span class="minihead">Exams</span>
          <span v-for="exam in examarr" :key="exam.value">
            <md-checkbox v-bind:value="exam.value" v-model="chosenexam">{{ exam.text }}</md-checkbox>
          </span>
          <br />
          <span class="minihead">Level</span>
          <span v-for="lvl in levels" :key="lvl.value">
            <md-checkbox v-bind:value="lvl.value" v-model="chosenlevel">{{ lvl.text }}</md-checkbox>
          </span>
          <br />
          <span class="minihead">MCs</span>
          <span v-for="mc in mclevels" :key="mc.value">
            <md-checkbox v-bind:value="mc.value" v-model="chosenmc">{{ mc.text }}</md-checkbox>
          </span>

          <br />
          <br />
        </md-content>
      </div>
      <div class="md-layout-item">
        <!-- Modules -->
        <div>
          <div class="search-wrapper">
            <md-field>
              <label>Search for modules</label>
              <md-input v-model="searchbar"></md-input>
            </md-field>
          </div>

          <div class="module-numberdiv">
            <span class="modnum">{{modulenum}} Modules Found</span>
          </div>
          <hr style="width:95%" />
          <div id="ModuleItem">
            <md-list v-for="post in filteredList" v-bind:key="post.index">
              <div class="modulecard">
                <p class="module-name">{{post.moduleCode}} - {{post.title}}</p>
                <p
                  class="module-type"
                >School Of {{post.faculty}} | {{post.department}} | {{post.moduleCredit}} MCs</p>
                <p class="module-desc">{{post.description}}</p>

                <div class="md-layout">
                  <div class="md-layout-item md-size-30">
                    <br />
                    <br />
                    <br />
                    <span class="module-preclusionhead">
                      Preclusions
                      <br />
                    </span>
                    <span class="module-preclusion">{{post.preclusion}}</span>
                    <br />
                    <br />
                    <span class="module-prerequisitehead">
                      Prerequisites
                      <br />
                    </span>

                    <span class="module-prerequisite">{{post.prerequisite}}</span>
                    <br />
                  </div>
                  <div class="md-layout-item" style="padding-left:25px">
                    <div>
                      <md-tabs class="md-accent" md-alignment="fixed" style="width:680px">
                        <md-tab
                          v-for="sem in checksemester(post.semesterData)"
                          v-bind:key="sem.index"
                          :md-label="sem.semester"
                        >
                          <div class="md-layout">
                            <div class="md-layout-item md-size-35">
                              <br />
                              <span class="examhead">
                                Exam
                                <br />
                              </span>
                              <span
                                class="exambody"
                              >{{formatDate(sem.examDate) + formatDur(sem.examDuration)}}</span>
                              <br />
                              <br />
                              <br />
                              <span class="examhead">
                                WorkLoad - {{calcwork(post.workload) + " hours"}}
                                <md-tooltip md-direction="bottom">
                                  <apexchart
                                    style="background-color:white;width:350px"
                                    type="bar"
                                    height="150"
                                    :options="chartOptions"
                                    :series="formatwork(post.workload)"
                                  ></apexchart>
                                </md-tooltip>
                                <br />
                              </span>
                            </div>
                            <div>
                              <apexchart
                                style="background-color:white;width:410px"
                                type="line"
                                height="170"
                                :options="chartOptions2"
                                :series="seriesStats"
                              ></apexchart>
                            </div>
                          </div>
                        </md-tab>
                      </md-tabs>
                    </div>
                  </div>
                </div>
              </div>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataObject from "../Database.js";
import NavBar from "../components/NavBar";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    NavBar,
    // eslint-disable-next-line vue/no-unused-components
    apexchart: VueApexCharts
  },
  data() {
    return {
      searchbar: "",
      modulesData: DataObject.Modules,
      modulenum: 0,
      examarr: [{ text: "No Exam", value: "No Exam", selected: false }],
      semarr: [
        { text: "Semester 1", value: "1", selected: false },
        { text: "Semester 2", value: "2", selected: false },
        { text: "Special Term 1", value: "3", selected: false },
        { text: "Special Term 2", value: "4", selected: false }
      ],
      levels: [
        { text: "1000", value: "1000", selected: false },
        { text: "2000", value: "2000", selected: false },
        { text: "3000", value: "3000", selected: false },
        { text: "4000", value: "4000", selected: false },
        { text: "5000", value: "5000", selected: false },
        { text: "6000", value: "6000", selected: false },
        { text: "8000", value: "8000", selected: false }
      ],
      mclevels: [
        { text: "0-3 MC", value: "1", selected: false },
        { text: "4 MC", value: "2", selected: false },
        { text: "5-8 MC", value: "3", selected: false },
        { text: "More than 8 MC", value: "4", selected: false }
      ],
      faculties: [
        { text: "Computing", value: "Computing", selected: false },
        { text: "Science", value: "Science", selected: false }
      ],
      departments: [
        {
          text: "Computer Science",
          value: "Computer Science",
          selected: false
        },
        {
          text: "Mathematics",
          value: "Mathematics",
          selected: false
        },
        {
          text: "Information Systems and Analytics",
          value: "Information Systems and Analytics",
          selected: false
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
          ]
        }
      },
      seriesStats: [{ data: [150, 210, 186, 195] }],
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
      },
      chosenfac: [],
      chosendept: [],
      chosensems: [],
      chosenexam: false,
      chosenlevel: [],
      chosenmc: []
    };
  },
  computed: {
    filteredList: function() {
      let filterData = this.modulesData;
      if (this.chosensems.length > 0) {
        filterData = filterData.filter(item => {
          for (var i = 0; i < item.semesterData.length; i++) {
            if (
              this.chosensems.includes(item.semesterData[i].semester.toString())
            ) {
              return true;
            }
          }
          return false;
        });
      }
      if (this.chosenexam) {
        filterData = filterData.filter(item => {
          if (Object.keys(item.semesterData[0]).length === 1) {
            return true;
          }

          return false;
        });
      }
      if (this.chosenlevel.length > 0) {
        filterData = filterData.filter(item => {
          var str = item.moduleCode.toString();
          var matches = str.match(/(\d+)/);
          console.log(matches[0].charAt(0) + "000");
          if (this.chosenlevel.includes(matches[0].charAt(0) + "000")) {
            return true;
          }
          return false;
        });
      }
      if (this.chosenmc.length > 0) {
        filterData = filterData.filter(item => {
          var mc = parseInt(item.moduleCredit);

          if (mc < 4) {
            return this.chosenmc.includes("1");
          } else if (mc === 4) {
            return this.chosenmc.includes("2");
          } else if (5 <= mc && mc <= 8) {
            return this.chosenmc.includes("3");
          } else {
            return this.chosenmc.includes("4");
          }
        });
      }
      if (this.chosenfac.length > 0) {
        filterData = filterData.filter(item => {
          return this.chosenfac.includes(item.faculty);
        });
      }
      if (this.chosendept.length > 0) {
        filterData = filterData.filter(item => {
          return this.chosendept.includes(item.department);
        });
      }
      if (this.searchbar !== "") {
        filterData = filterData.filter(item => {
          return (
            item.title.toLowerCase().indexOf(this.searchbar.toLowerCase()) > -1
          );
        });
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.modulenum = filterData.length;
      return filterData;
    }
  },
  methods: {
    clearfilter: function() {
      this.chosensems = [];
      this.chosenfac = [];
      this.chosendept = [];
      this.chosenexam = false;
      this.chosenlevel = [];
      this.chosenmc = [];
    },
    checkexam(semester) {
      if (semester.length === 1) {
        return "No Exam";
      }
      return semester.examDate + " | " + semester.examDuration / 60 + " Hrs";
    },
    checksemester(arr) {
      var semesters = [];
      var num = arr.length;
      for (var i = 1; i <= 4; i++) {
        var semname;
        var examDate;
        var examDuration;
        if (i === 3) {
          semname = "Special Term 1";
        } else if (i === 4) {
          semname = "Special Term 2";
        } else {
          semname = "Sem " + i;
        }
        if (i > num) {
          //leftover
          examDate = null;
          examDuration = 0;
        } else {
          if (Object.keys(arr[i - 1]).length > 1) {
            examDate = arr[i - 1].examDate;
            examDuration = arr[i - 1].examDuration / 60;
          } else {
            examDate = null;
            examDuration = 0;
          }
        }

        semesters.push({
          semester: semname,
          examDate: examDate,
          examDuration: examDuration
        });
      }

      return semesters;
    },
    formatDate: function(datetime) {
      //2019-12-04T09:00:00.000Z
      var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      if (datetime !== null) {
        var date = datetime.substring(0, 10).split("-");
        var time = datetime.substring(11, 19).split(":");
        var finishDate = new Date(
          date[0],
          date[1],
          date[2],
          time[0],
          time[1],
          time[2]
        );

        var hours = finishDate.getHours();
        var minutes = finishDate.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return (
          finishDate.getDate() +
          "-" +
          monthNames[date[1] - 1] +
          "-" +
          date[0] +
          " " +
          strTime
        );
      }
      return "No Exam";
    },
    formatDur: function(duration) {
      if (duration !== 0) {
        return " | " + duration + " hours";
      } else {
        return "";
      }
    },
    calcwork(workload) {
      var num = 0;
      for (var i = 0; i < workload.length; i++) {
        num = num + workload[i];
      }
      return num;
    },
    formatwork(workload) {
      var series = [];
      series.push({
        data: workload
      });
      console.log(series);
      return series;
    }
  }
};
</script>


<style lang="scss">
@import "~vue-material/src/theme/engine";
.md-content {
  max-width: 400px;
  max-height: 700px;
  overflow: auto;
  padding: 20px;
  padding-left: 30px;
  font-family: Helvetica;
}
</style>
<style>
.md-theme-default {
  background-color: transparent !important;
}
html {
  background-color: white;
}
hr {
  height: 0px !important;
}
.filter-head {
  font-size: 130%;
  color: #616a6b;
  font-weight: bold;
  margin-right: 80px;
}
.clear-filter {
  background-color: #8e44ad !important;
}
.md-button-content {
  color: white;
  font-weight: bold;
}
.module-numberdiv {
  text-align: right;
}
.modnum {
  margin-right: 30px;
  color: #8e44ad;
  font-weight: bold;
}
.md-checkbox.md-theme-default.md-checked .md-checkbox-container {
  background-color: #8e44ad !important;
}
.md-checkbox .md-checkbox-container {
  border: 1px solid rgba(0, 0, 0, 0.54) !important;
  border-radius: 3px !important;
}
.md-checkbox.md-checked .md-checkbox-container:after {
  border-color: white !important;
  top: 1px;
  left: 6px;
}
.minihead {
  color: #8e44ad;
  font-size: 80%;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}
.md-checkbox {
  display: flex !important;
  margin: 5px 5px 5px 0px !important;
}
.levelcheck {
  padding: 11px;
  padding-top: 0px;
}
.flex.xs6 {
  max-width: 150% !important;
}
label.v-label.theme--light {
  margin-bottom: 0;
}
div.v-input--selection-controls__input {
  padding-right: 20px;
  padding-left: 10px;
}
.md-field {
  margin: 4px 0px 10px !important;
}
.md-chips.md-field.md-theme-default:after {
  background-color: white !important;
}
.filter-header {
  margin-bottom: 20px;
  margin-top: 20px;
  width: 50%;
}
</style>
<style>
/* Module Card css */
.modulecard {
  margin: 30px;
  margin-bottom: 20px;
}
.module-name {
  font-size: 150%;
  color: #8e44ad;
  font-weight: bold;
}
.module-preclusionhead {
  font-size: 120%;
  color: #616a6b;
  font-weight: bold;
}
.module-prerequisitehead {
  font-size: 120%;
  color: #616a6b;
  font-weight: bold;
}
.search-wrapper {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 35px;
}

.md-tabs-navigation {
  background-color: #bb8fce !important;
  height: 30px;
}
.md-tabs-navigation .md-button-content {
  color: white !important;
  font-size: 85% !important;
}
.md-tabs-navigation .md-button {
  height: 30px !important;
}
.md-active {
  background-color: #8e44ad !important;
}
.md-tabs-content {
  height: 190px !important;
  max-width: 100% !important;
  padding-left: 0px !important;
  padding-right: 10px !important;
  padding-top: 5px !important;
}
.examhead {
  font-size: 110%;
  color: #616a6b;
  font-weight: bold;
}
.md-tooltip .md-tooltip-top {
  background-color: white !important;
}
</style>
