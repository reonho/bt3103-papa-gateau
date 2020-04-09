<template>
  <div id="ViewSemesterSection">
    {{this.getModuleDetails("BT2101")}}
    <div>
      <div class="md-layout">
        <div class="md-layout-item md-size-30">
          <md-field style="margin:0;padding:0;min-height:4.5vh">
            <label style="top:1.3vh;font-size:1vw">Year</label>
            <md-select v-model="yearchosen" name="yearchosen" id="yearchosen" multiple>
              <md-option
                v-for="year in yearlist"
                :key="year.index"
                :id="year.value"
                v-model="year.value"
              >Year {{ year.value }}</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-5"></div>
        <div class="md-layout-item md-size-30">
          <md-field style="margin:0;padding:0;min-height:4.5vh;">
            <label style="top:1.3vh;font-size:1vw">Semester</label>
            <md-select v-model="semchosen" name="semchosen" id="semchosen" multiple>
              <md-option
                v-for="sem in semlist"
                :key="sem.index"
                :id="sem.value"
                v-model="sem.value"
              >Semster {{ sem.value }}</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-10"></div>
        <div class="md-layout-item md-size-10">
          <b-button style="width: 8.5vw; padding:1vh;" variant="outline-info">
            <span style="font-size:0.8vw; font-weight: bold">CLEAR FILTER</span>
          </b-button>
        </div>
      </div>
      <br />
      <br />

      <!-- Semester Details -->
      <div>
        <md-empty-state v-show="showsems()">
          <p class="empty">No Semester Added Yet</p>
          <md-button class="addsem" :md-ripple="false" v-on:click="addsem">Add Semester</md-button>
        </md-empty-state>
        <md-list v-for="post in updatesem" v-bind:key="post.index">
          <div>
            <md-button
              class="md-icon-button"
              style="margin-top: -0.6vw"
              v-on:click="hideContent(post)"
              v-show="!post.collapse"
            >
              <md-icon
                style="font-size:1.5vw !important"
                v-on:click="hideContent(post)"
                v-show="!post.collapse"
              >expand_less</md-icon>
            </md-button>
            <md-button
              class="md-icon-button"
              style="margin-top: -0.6vw;margin-left:0.3vw;"
              v-on:click="showContent(post)"
              v-show="post.collapse"
            >
              <md-icon style="font-size:1.5vw !important">expand_more</md-icon>
            </md-button>
            <span class="sem-header">Year {{post.year}} Semester {{post.semester}}</span>
          </div>

          <div class="sem-box" v-show="!post.collapse">
            <div class="md-layout sem-content">
              <div class="md-layout-item">
                <p>Total CAP : {{post.cap}}</p>
              </div>
              <div class="md-layout-item md-size-10"></div>
              <div class="md-layout-item">
                <p>4 MCs Completed</p>
              </div>
              <div class="md-layout-item md-size-10"></div>
            </div>

            <md-empty-state v-show="showmod(post.mods)">
              <p class="empty">No Modules to Show</p>
              <p class="empty">Start adding modules by clicking the button</p>
              <md-button class="addsem" :md-ripple="false" v-on:click="addmod(post)">Add Module</md-button>
            </md-empty-state>
            <AddModulesModal />
            <md-list v-for="mod in post.mods" v-bind:key="mod.index" class="mod-list">
              <div class="mod-card">
                <p class="mod-name">AH3202 Time Traveller: The Curatorial in Southeast Asia</p>
                <p>History • Arts and Social Science • 4 MCs</p>
                <div class="md-layout mod-content">
                  <div class="md-layout-item">
                    <p>
                      Grade Obtained :
                      <span class="mod-content-text">B</span>
                    </p>
                  </div>
                  <div class="md-layout-item md-size-10"></div>
                  <div class="md-layout-item">
                    <p>
                      SU Selected :
                      <span class="mod-content-text">No</span>
                    </p>
                  </div>
                </div>
                <span class="footerright">
                  <md-button class="md-icon-button mod-icon">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button class="md-icon-button mod-icon" v-on:click="showDialog = true">
                    <md-icon>delete</md-icon>
                  </md-button>
                </span>
              </div>
            </md-list>

            <div class="mod-list" style="text-align:center" v-show="!showmod(post.mods)">
              <md-button class="addsem" :md-ripple="false" v-on:click="addmod(post)">Add Module</md-button>
            </div>
          </div>
        </md-list>
      </div>
      <div style="text-align:center; margin-top: 2vw; margin-bottom: 2vw" v-show="showbutton">
        <p class="empty">More Semesters to Add?</p>
        <md-button class="addsem" :md-ripple="false" v-on:click="addsem">Add Semester</md-button>
      </div>
    </div>
  </div>
</template>

<script>
//import AddModuleModal from "./AddModuleModal.vue";
import database from "../firebase.js";
export default {
  name: "ViewSemesterSection",
  props: {
    User: Object
  },
  data: () => ({
    showModal: false,
    yearlist: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
    semlist: [{ value: 1 }, { value: 2 }],
    semnum: 0,
    semesters: [],
    usergrades: []
  }),
  components: {
    //AddModuleModal
  },
  computed: {
    updatesem() {
      let allsems = this.semesters;
      let usersems = this.User.sap_by_sem;
      let usermods = this.usergrades;
      var semesters = [];
      for (var k = 0; k < this.semnum; k++) {
        let sem = allsems[k];
        sem.cap = usersems[k].cap;
        //read in the mods
        for (var i = 0; i < Object.keys(usermods).length; i++) {
          let mod = usermods[i];
          console.log(sem);
          if (
            (mod.sem == sem.semester) &
            (this.User.batch.year - mod.year + 1 == sem.year)
          ) {
            
            sem.mods.push([
              {
                code: mod.module,
                grade: mod.grade,
                SU: mod.SU,
                faculty: mod.faculty,
                MC: 0,
                department: null,
                name: null
              }
            ]);
          }
        }
        semesters.push(allsems[k]);
      }

      return semesters;
    },
    showbutton() {
      if ((this.semnum == 8) | (this.semnum == 0)) {
        return false;
      }
      return true;
    }
  },
  methods: {
    filtersem() {
      var sem = [2, 1];
      var semesters = [];
      for (var k = 1; k <= 8; k++) {
        if (k <= 2) {
          //Year 1

          semesters.push({
            year: 1,
            semester: sem[k % 2],
            mods: [],
            cap: 0.0,
            collapse: false
          });
        } else if (k > 2 && k <= 4) {
          //Year 2
          semesters.push({
            year: 2,
            semester: sem[k % 2],
            mods: [],
            cap: 0.0,
            collapse: false
          });
        } else if (k > 4 && k <= 6) {
          //Year 3
          semesters.push({
            year: 3,
            semester: sem[k % 2],
            mods: [],
            cap: 0.0,
            collapse: false
          });
        } else if (k > 6 && k <= 8) {
          //Year 4
          semesters.push({
            year: 4,
            semester: sem[k % 2],
            mods: [],
            cap: 0.0,
            collapse: false
          });
        }
      }

      this.semesters = semesters;
    },
    addsem() {
      this.semnum++;
    },
    showmod: function(mods) {
      if (Object.keys(mods).length > 0) {
        return false;
      }
      return true;
    },
    showsems: function() {
      return this.semnum == 0;
    },
    addmod(sem) {
      var code = "BT2101";
      var grade = "A";
      let currentsems = this.semesters;
      for (var i = 0; i < currentsems.length; i++) {
        if (
          currentsems[i].year == sem.year &&
          currentsems[i].semester == sem.semester
        ) {
          currentsems[i].mods.push({
            code: code,
            grade: grade
          });
        }
      }
      this.semesters = currentsems;
    },
    hideContent(sem) {
      let currentsems = this.semesters;
      for (var i = 0; i < currentsems.length; i++) {
        if (
          currentsems[i].year == sem.year &&
          currentsems[i].semester == sem.semester
        ) {
          currentsems[i].collapse = true;
        }
      }
      this.semesters = currentsems;
    },
    showContent(sem) {
      let currentsems = this.semesters;
      for (var i = 0; i < currentsems.length; i++) {
        if (
          currentsems[i].year == sem.year &&
          currentsems[i].semester == sem.semester
        ) {
          currentsems[i].collapse = false;
        }
      }
      this.semesters = currentsems;
    },
    accumulatesems() {
      let sems = this.User.sap_by_sem;
      for (var i = 0; i < sems.length; i++) {
        if (Object.keys(sems[i]).length > 0) {
          this.semnum++;
        }
      }
    },
   
  },

  created() {
    this.filtersem();
    this.accumulatesems();
    database.getModuleResults().then(item => {
      this.usergrades = item;
    });
  }
};
</script>

<style scoped>
.md-dialog {
  width: 50vw;
  overflow: auto;
  display: block;
}
.btn-outline-info {
  color: teal;
  border-color: teal;
  border: 2px solid;
}

.btn-outline-info:hover {
  color: white;
  background-color: teal;
  border-color: teal;
}

.md-button.addsem {
  background-color: teal !important;
  font-weight: bold;
  color: white;
  margin-top: 1vh;
  width: 8vw;
  font-size: 0.8vw;
}
.sem-header {
  font-weight: 600;
  font-size: 1vw;
  margin-bottom: 2vh;
  color: #2e4053;
}
.empty {
  font-size: 0.8vw;
  color: #2e4053;
  font-weight: bold;
}
.sem-box {
  background-color: #ebecf0;
  margin-bottom: 1vw;
}
.sem-content {
  margin: 1.5vw 0vw 0vw 2.5vw;
  color: #2e4053;
  font-weight: bold;
  font-size: 0.8vw;
}
.mod-card {
  padding: 1vw 0vw 0vw 1.5vw;
}
.mod-name {
  color: #ec7663;
  font-weight: bold;
  font-size: 0.9vw;
}

.mod-name:hover {
  text-decoration: underline;
}

.mod-content {
  margin-top: 1vw;
  font-size: 0.8vw;
  color: #2e4053;
}
.mod-content-text {
  font-weight: bold;
}
.mod-list {
  margin: 1vw 1vw 1.5vw 1vw;
  font-size: 0.8vw;
  padding-bottom: 0;
}
.footerright {
  float: right;
  margin-bottom: 0.2vw;
}
.mod-icon {
  min-width: 1vw !important;
  width: 1.5vw;
  height: 1.5vw;
}

.md-icon {
  font-size: 1vw !important;
}
.md-empty-state {
  padding-top: 1.5vw;
}
</style>