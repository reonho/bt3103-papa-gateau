<template>
  <div>
    <div class="sticky-header">
      <NavBar />
    </div>

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

          <md-field class="mod-dropdown">
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

          <md-chips class="mod-chips" v-model="chosenfac" md-static></md-chips>

          <span class="minihead">Department</span>

          <md-field class="mod-dropdown">
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
          <md-chips class="mod-chips" v-model="chosendept" md-static></md-chips>
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
        <div class="module-div">
          <div class="module-header">
            <div class="search-wrapper">
              <md-autocomplete v-model="searchbar" :md-options="searchlist">
                <label>Search for Modules...</label>

                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                  <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                </template>

                <template
                  slot="md-autocomplete-empty"
                  slot-scope="{ term }"
                >No employees matching "{{ term }}" were found.</template>
              </md-autocomplete>
            </div>

            <div class="module-numberdiv">
              <span class="modnum">{{checkmodnum(modulenum)}}Found</span>
              <hr />
            </div>
          </div>
          <div id="ModuleItem">
            <md-list v-for="post in filteredList" v-bind:key="post.index">
              <div class="modulecard">
                <a
                  class="module-name"
                  href="/#/module"
                  style="color:#0B5345;"
                >{{post.info.moduleCode}} {{post.info.title}}</a>
                <p
                  class="module-type"
                >{{post.info.department}} • {{post.info.faculty}} • {{post.info.moduleCredit}} MCs</p>
                <p class="module-desc">{{post.info.description}}</p>

                <div class="md-layout">
                  <div class="md-layout-item md-size-30">
                    <br />
                    <br />
                    <br />
                    <span class="module-preclusionhead">
                      Preclusions
                      <br />
                    </span>
                    <span class="module-preclusion">{{post.info.preclusion}}</span>
                    <br />
                    <br />
                    <span class="module-prerequisitehead">
                      Prerequisites
                      <br />
                    </span>

                    <span class="module-prerequisite">{{post.info.prerequisite}}</span>
                    <br />
                  </div>
                  <div class="md-layout-item-30" style="padding-left:25px">
                    <div>
                      <br />
                      <br />
                      <b-tabs
                        style="width:45vw;"
                        active-nav-item-class="activetab"
                        class="semtabs"
                        content-class="mt-3"
                        no-fade="false"
                        lazy
                      >
                        <b-tab
                          v-for="sem in checksemester(post)"
                          v-bind:key="sem.index"
                          :title="sem.semester"
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
                                Workload - {{calcwork(post) + " hours"}}
                                <md-tooltip class="mod-tooltip" md-direction="bottom">
                                  <workloadchart :seriesStats="formatwork(post)"></workloadchart>
                                </md-tooltip>
                                <br />
                              </span>
                            </div>
                            <div style="width:27vw;background-color:white">
                              <intakechart :seriesStats="seriesStats"></intakechart>
                            </div>
                          </div>
                        </b-tab>
                      </b-tabs>
                    </div>
                  </div>
                </div>
              </div>
            </md-list>
            <div style="height:200px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../firebase_wx.js";
import dataObject from "../Database.js";
import NavBar from "../components/NavBar";
import StudentIntakeChart from "../components/StudentIntakeChart";
import WorkloadChart from "../components/WorkloadChart";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    NavBar,
    // eslint-disable-next-line vue/no-unused-components
    apexchart: VueApexCharts,
    intakechart: StudentIntakeChart,
    workloadchart: WorkloadChart
  },
  props: {
    test: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchbar: "",
      modulenum: 0,
      modulesData: [],
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
      faculties: [],
      departments: [],
      searchlist: [],
      seriesStats: [{ data: [150, 210, 186, 195] }],
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
          for (var i = 0; i < item.info.semesterData.length; i++) {
            if (
              this.chosensems.includes(
                item.info.semesterData[i].semester.toString()
              )
            ) {
              return true;
            }
          }
          return false;
        });
      }
      if (this.chosenexam) {
        filterData = filterData.filter(item => {
          if (Object.keys(item.info.semesterData[0]).length === 1) {
            return true;
          }

          return false;
        });
      }
      if (this.chosenlevel.length > 0) {
        filterData = filterData.filter(item => {
          var str = item.info.moduleCode.toString();
          var matches = str.match(/(\d+)/);
          if (this.chosenlevel.includes(matches[0].charAt(0) + "000")) {
            return true;
          }
          return false;
        });
      }
      if (this.chosenmc.length > 0) {
        filterData = filterData.filter(item => {
          var mc = parseInt(item.info.moduleCredit);

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
          return this.chosenfac.includes(item.info.faculty);
        });
      }
      if (this.chosendept.length > 0) {
        filterData = filterData.filter(item => {
          return this.chosendept.includes(item.info.department);
        });
      }
      if (this.searchbar !== "") {
        filterData = filterData.filter(item => {
          var title =
            item.info.moduleCode.toLowerCase() +
            " " +
            item.info.title.toLowerCase();
          return title.indexOf(this.searchbar.toLowerCase()) > -1;
        });
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.modulenum = filterData.length;
      console.log(this.modulesData);
      console.log(filterData.length);
      return filterData;
    }
  },
  methods: {
    readDatabase: function() {
      database
        .collection("modules")
        .get()
        .then(querySnapShot => {
          var flookup = {};
          var dlookup = {};
          var slookup = {};
          //Loop through each item
          querySnapShot.forEach(doc => {
            //console.log(doc.id+"==>"+doc.data())
            this.modulesData.push(doc.data());
            var fac = doc.data().info.faculty;
            var dept = doc.data().info.department;
            if (!(fac in flookup)) {
              flookup[fac] = 1;
              this.faculties.push({
                text: fac,
                value: fac,
                selected: false
              });
            }
            if (!(dept in dlookup)) {
              dlookup[dept] = 1;
              this.departments.push({
                text: dept,
                value: dept,
                selected: false
              });
            }

            //search list
            var name = doc.data().info.moduleCode + " " + doc.data().info.title;

            if (!(name in slookup)) {
              slookup[name] = 1;
              this.searchlist.push(name);
            }
          });
        });
    },
    writeDatabase: function() {
      var items = dataObject.Modules2;

      for (var i = 0; i < items.length; i++) {
        var item = {
          info: items[i],
          intake: 0
        };

        database
          .collection("modules")
          .doc()
          .set(item);
      }
    },
    clearfilter: function() {
      this.searchbar = "";
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
      arr = arr.info.semesterData;
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
    formatprereq: function(arr) {
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          str = str + arr[i];
        } else {
          str = str + arr[i] + ", ";
        }
      }
      return str;
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
        var ampm = (hours >= 1) & (hours <= 8) ? "PM" : "AM";
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
    calcwork(arr) {
      arr = arr.info.workload;
      var num = 0;
      for (var i = 0; i < arr.length; i++) {
        num = num + arr[i];
      }
      return num;
    },
    formatwork(workload) {
      var series = [];
      series.push({
        data: workload
      });

      return series;
    },
    checkmodnum(modnum) {
      if (modnum === 1) {
        return "1 Module ";
      } else if (modnum === 0) {
        return "No Module ";
      } else {
        return modnum + " Modules ";
      }
    }
  },
  mounted() {
    //this.writeDatabase();
    this.readDatabase();
  }
};
</script>


<style lang="scss" scoped>
@import "~vue-material/src/theme/engine";
.md-content {
  max-width: 400px;
  max-height: 700px;
  overflow: auto;
  padding: 20px;
  padding-left: 30px;
}
hr {
  height: 0px !important;
  margin: 0 !important;
  margin-top: 10px !important;
}
</style>
<style>
label {
  font-weight: 100 !important;
}

.sticky-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
.module-div {
  position: relative;
}
/* Filter section css */
.md-content.md-scrollbar {
  position: fixed;
  margin-top: 70px;
  width: 25%;
}
.filter-header {
  margin-bottom: 20px;
  margin-top: 20px;
  width: 50%;
}
.filter-head {
  font-size: 130%;
  color: #616a6b;
  font-weight: bold;
  margin-right: 80px;
}
.minihead {
  color: #0b5345;
  font-size: 80%;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}
.md-button.clear-filter {
  background-color: #17a589 !important;
  font-weight: bold;
  margin-left: 30%;
}
.md-button.clear-filter.md-theme-default {
  color: white !important;
}
.module-numberdiv {
  text-align: right;
}
.modnum {
  margin-right: 30px;
  color: #0b5345;
  font-weight: bold;
}
.md-checkbox.md-theme-default.md-checked .md-checkbox-container {
  background-color: #0b5345 !important;
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
.md-checkbox {
  display: flex !important;
  margin: 5px 5px 5px 0px !important;
}
.levelcheck {
  padding: 11px;
  padding-top: 0px;
}

.mod-dropdown.md-field {
  margin: 4px 0px 10px !important;
}

/* Chips css */
.md-chips.md-field.mod-chips.md-theme-default:after {
  background-color: white !important;
}
.mod-chips .md-chip.md-theme-default {
  background-color: #0b5345 !important;
  color: white !important;
  font-weight: bold !important;
}

/* Module Card css */
#ModuleItem {
  margin-top: 20%;
}
.modulecard {
  margin: 30px;
  margin-bottom: 0px !important;
}
.module-name {
  font-size: 150%;
  color: #1abc9c;
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
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 100px;
}
.module-header {
  position: fixed;
  background-color: white;
  left: 27%;
  top: 0;
  right: 0;
  z-index: 5;
  width: 71%;
}

.activetab {
  background-color: #1abc9c !important;
  font-weight: bold !important;
}

.md-theme-default .nav-link:not(.md-button) {
  color: #17a589 !important;
  font-weight: bold !important;
}

.md-theme-default .nav-link.active:not(.md-button) {
  color: white !important;
}

.md-tabs.test .md-tabs-content {
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
.md-tooltip.mod-tooltip .md-tooltip-top {
  background-color: white !important;
}
.md-tooltip.mod-tooltip.md-theme-default {
  background-color: transparent !important;
}
</style>
