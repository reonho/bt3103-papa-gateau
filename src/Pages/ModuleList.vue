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
                <b-button style="width: 8.5vw; padding:1vh;" variant="outline-info">
                  <span style="font-size:0.8vw; font-weight: bold">CLEAR FILTER</span>
                </b-button>
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
        <div>
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
                >No Modules with "{{ term }}" were found.</template>
              </md-autocomplete>
            </div>

            <div class="module-numberdiv">
              <span class="modnum">{{checkmodnum(modulenum)}}Found</span>
              <hr />
            </div>
          </div>
          <div class="module-div" id="ModuleItem">
            <md-list v-for="post in filteredList" v-bind:key="post.index">
              <div class="modulecard">
                <router-link
                  class="module-name"
                  :to="'/'+post.info.moduleCode"
                  style="color:#EC7663;"
                >{{post.info.moduleCode}} {{post.info.title}}</router-link>
                <br />

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
                  <div class="md-layout-item-30" style="padding-left:3vw">
                    <div>
                      <br />
                      <br />
                      <b-tabs
                        style="width:46vw;"
                        id="moduletabs"
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
                          :title-item-class="sem.disabled"
                          :active="sem.active"
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
                                <br />
                              </span>
                            </div>
                            <div style="width:29vw;background-color:white">
                              <workloadchart :seriesStats="formatwork(post.info.workload)"></workloadchart>
                            </div>
                          </div>
                        </b-tab>
                      </b-tabs>
                    </div>
                  </div>
                </div>
              </div>
            </md-list>

            <div style="height:200px">
              <div v-show="showEmpty">
                <md-empty-state
                  id="statebox"
                  style="max-width:0 !important;  color: #2e4053;"
                  md-icon="view_list"
                  md-label="No Modules to Display"
                ></md-empty-state>
              </div>
              <div v-show="loading">
                <md-empty-state
                  id="statebox"
                  style="max-width:0 !important; color: #2e4053;"
                  md-label="Loading Modules..."
                >
                <br/>
                <pulseloader :loading="loading" :color="color" :size="size"></pulseloader>
                </md-empty-state>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import NavBar from "../components/NavBar";
//import StudentIntakeChart from "../components/StudentIntakeChart";
import WorkloadChart from "../components/WorkloadChart";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    NavBar,
    // eslint-disable-next-line vue/no-unused-components
    apexchart: VueApexCharts,
    //intakechart: StudentIntakeChart,
    workloadchart: WorkloadChart,
    pulseloader: PulseLoader
  },
  props: {
    test: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      color: "teal",
      loading: true,
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
      return filterData;
    },
    showEmpty() {
      if ((this.modulenum == 0) & (this.loading == false)) {
        return true;
      }
      return false;
    }
  },
  methods: {
    readDatabase: function() {
      database.firebase_data
        .collection("modules")
        .get()
        .then(querySnapShot => {
          this.loading = true;
          var flookup = {};
          var dlookup = {};
          var slookup = {};
          //Loop through each item
          querySnapShot.forEach(doc => {
            //console.log(doc.id+"==>"+doc.data())
            var item = doc.data();
            this.modulesData.push(item);
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
            this.loading = false;
          });
        });
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
    checksemester(arr) {
      arr = arr.info.semesterData;
      var semesters = [
        {
          semester: "Semester 1",
          disabled: "disabledTab",
          examDate: null,
          examDuration: 0,
          active: false
        },
        {
          semester: "Semester 2",
          disabled: "disabledTab",
          examDate: null,
          examDuration: 0,
          active: false
        },
        {
          semester: "Special Term I",
          disabled: "disabledTab",
          examDate: null,
          examDuration: 0,
          active: false
        },
        {
          semester: "Special Term II",
          disabled: "disabledTab",
          examDate: null,
          examDuration: 0,
          active: false
        }
      ];
      var num = arr.length;
      var flag = false;
      for (var i = 0; i < num; i++) {
        if (arr[i].semester == 3) {
          semesters[2].disabled = "";
          if (flag === false) {
            semesters[2].active = true;
          }
          flag = true;
          if (Object.keys(arr[i]).length > 1) {
            semesters[2].examDate = arr[i].examDate;
            semesters[2].examDuration = arr[i].examDuration / 60;
          }
        } else if (arr[i].semester == 4) {
          semesters[3].disabled = "";
          if (flag === false) {
            semesters[3].active = true;
          }
          flag = true;
          if (Object.keys(arr[i]).length > 1) {
            semesters[3].examDate = arr[i].examDate;
            semesters[3].examDuration = arr[i].examDuration / 60;
          }
        } else if (arr[i].semester == 2) {
          semesters[1].disabled = "";
          if (flag === false) {
            semesters[1].active = true;
          }
          flag = true;
          if (Object.keys(arr[i]).length > 1) {
            semesters[1].examDate = arr[i].examDate;
            semesters[1].examDuration = arr[i].examDuration / 60;
          }
        } else {
          semesters[0].disabled = "";
          if (flag === false) {
            semesters[0].active = true;
          }
          flag = true;
          if (Object.keys(arr[i]).length > 1) {
            semesters[0].examDate = arr[i].examDate;
            semesters[0].examDuration = arr[i].examDuration / 60;
          }
        }
      }
      console.log(semesters);
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
        return " • " + duration + " hours";
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
    },
    passmod: function(code) {
      this.$router.push({ name: "modulePage", params: { code: code } });
    }
  },
  mounted() {
    //this.writeDatabase();

    this.readDatabase();

    //console.log(this.modulesData);
  }
};
</script>


<style lang="scss" scoped>
@import "~vue-material/src/theme/engine";
p,
span {
  font-size: 2.1vh;
  line-height: 1.5;
}

.md-content {
  max-width: 22vw;
  max-height: 100vh;
  overflow: auto;
  padding: 1vw;
  padding-left: 1.5vw;
}
hr {
  height: 0px !important;
  margin: 0 !important;
  margin-top: 10px !important;
}

.sticky-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

/* Filter section css */
.md-content.md-scrollbar {
  position: fixed;
  margin-top: 3.5vw;
  width: 22vw;
}
.filter-header {
  margin-bottom: 1vw;
  margin-top: 2.7vw;
  width: 19vw;
}
.filter-head {
  font-size: 1.2vw;
  color: #616a6b;
  font-weight: bold;
  margin-right: 3vw;
}
.minihead {
  color: #616a6b;
  font-size: 1.9vh;
  font-weight: bold;
  margin-bottom: 0.5vw;
  display: block;
}
.btn-outline-info {
  color: teal;
  float: right;
  border-color: teal;
  border: 2px solid;
}

.btn-outline-info:hover {
  color: white;
  background-color: teal;
  border-color: teal;
}
.md-button.clear-filter.md-theme-default {
  color: white !important;
}
.module-numberdiv {
  text-align: right;
}
.modnum {
  margin-right: 2vw;
  color: #ec7663;
  font-weight: bold;
}

.md-checkbox {
  display: flex !important;
  margin: 0.3vw 0.3vw 0.3vw 0 !important;
}

.mod-dropdown.md-field {
  margin: 0.3vw 0 0.5vw !important;
}

/* Module Card css */
#ModuleItem {
  margin-top: 25vh;
}
.modulecard {
  margin: 2vw;
  margin-bottom: 0 !important;
}
.module-name {
  font-size: 1.4vw;
  font-weight: bold;
}
.module-type {
  padding-top: 1vh;
}
.module-preclusionhead {
  font-size: 2.3vh;
  color: #616a6b;
  font-weight: bold;
}
.module-prerequisitehead {
  font-size: 2.3vh;
  color: #616a6b;
  font-weight: bold;
}
.search-wrapper {
  margin: 0 auto;
  margin-bottom: 1vw;
  margin-top: 5.5vw;
}
.module-header {
  position: fixed;
  background-color: white;
  margin-top: 1vw;
  margin-right: 2vw;
  top: 0;
  right: 0;
  width: 71vw;
  z-index: 1;
}

.examhead {
  font-size: 2vh;
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

<style>
.md-field label {
  font-size: 1.7vh !important;
}
label {
  font-weight: 200 !important;
  font-size: 1.7vh;
}

/* Module Sem Tab CSS */
#moduletabs .nav-item .nav-link.activetab {
  background-color: teal !important;
  font-weight: bold !important;
}
.md-theme-default #moduletabs .nav-link.active:not(.md-button) {
  color: white !important;
  font-size: 1.8vh;
}
.md-theme-default #moduletabs .nav-link:not(.md-button) {
  color: teal !important;
  font-weight: bold !important;
  font-size: 1.8vh;
}
#moduletabs .disabledTab {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}

/* checkbox css */

.md-checkbox.md-theme-default.md-checked .md-checkbox-container {
  background-color: #ec7663 !important;
}
.md-checkbox .md-checkbox-container {
  border: 1px solid #616a6b !important;
  border-radius: 3px !important;
}
.md-checkbox.md-checked .md-checkbox-container:after {
  border-color: white !important;
  top: 1px;
  left: 6px;
}

/* Chips css */
.md-chips.md-field.mod-chips.md-theme-default:after {
  background-color: white !important;
}
.mod-chips .md-chip.md-theme-default {
  background-color: #ec7663 !important;
  color: white !important;
  font-weight: bold !important;
}

.md-list.md-theme-default .md-selected .md-list-item-content,
.md-list.md-theme-default .router-link-active .md-list-item-content {
  color: #b82d17 !important;
}

/* Empty State */
#statebox .md-icon.md-icon-font.md-empty-state-icon.md-theme-default {
  font-size: 9vw !important;
  color: teal
}

#statebox .md-empty-state-label {
  font-size: 1.3vw !important;
}

#statebox .md-empty-state-description {
  font-size: 1vw !important;
}

#statebox .md-empty-state-container {
  padding-top: 5vh;
  width: 42vw;
}
</style>
