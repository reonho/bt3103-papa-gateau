<template>
  <div>
    <NavBar />

    <div class="md-layout">
      <div class="md-layout-item md-size-25 ">
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
          <span class="minihead">Offered in</span>
          <span v-for="sem in semarr" :key="sem.value">
            <md-checkbox v-bind:value="sem.value" v-model="chosensems">{{ sem.text }}</md-checkbox>
          </span>
          <br />
          <span class="minihead">Exams</span>
          <md-checkbox
            v-for="exam in examarr"
            v-bind:key="exam.text"
            :id="exam.text"
            v-model="exam.value"
          >{{ exam.text }}</md-checkbox>
          <br />
          <span class="minihead">Level</span>
          <md-checkbox
            v-for="lvl in levels"
            v-bind:key="lvl.text"
            :id="lvl.text"
            v-model="lvl.value"
          >{{ lvl.text }}</md-checkbox>

          <br />
          <span class="minihead">MCs</span>
          <md-checkbox
            v-for="mc in mclevels"
            v-bind:key="mc.text"
            :id="mc.text"
            v-model="mc.value"
          >{{ mc.text }}</md-checkbox>

          <br />
          <br />
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
export default {
  components: {
    NavBar
  },
  data() {
    return {
      searchbar: "",
      modulesData: DataObject.Modules,
      modulenum: DataObject.Modules.length,
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
        { text: "0-3 MC", value: "0-3 MC", selected: false },
        { text: "4 MC", value: "4 MC", selected: false },
        { text: "5-8 MC", value: "5-8 MC", selected: false },
        { text: "More than 8 MC", value: "More than 8 MC", selected: false }
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
          value: "Information Systems and Analytics ",
          selected: false
        }
      ],
      chosenfac: [],
      chosendept: [],
      chosensems: []
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

      if (this.searchbar !== "") {
        filterData = filterData.filter(item => {
          return (
            item.title.toLowerCase().indexOf(this.searchbar.toLowerCase()) > -1
          );
        });
      }

      return filterData;
    }
  },
  methods: {
    clearfilter: function() {
      this.chosensems = [];
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
  background-color:#8e44ad !important; 
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
.modulecard {
  margin: 30px;
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
</style>
