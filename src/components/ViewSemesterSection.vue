<template>
  <div id="ViewSemesterSection">
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
            <span class="sem-header">{{post.year}} {{post.semester}}</span>
          </div>

          <div class="sem-box" v-show="!post.collapse">
            <div class="md-layout sem-content">
              <div class="md-layout-item">
                <p>Total CAP : {{formatcap(post.cap)}}</p>
              </div>
              <div class="md-layout-item md-size-10"></div>
              <div class="md-layout-item">
                <p>{{formatMC(post)}} MCs Completed</p>
              </div>
              <div class="md-layout-item md-size-10"></div>
            </div>

            <md-empty-state v-show="showmod(post.mods)">
              <p class="empty">No Modules to Show</p>
              <p class="empty">Start adding modules by clicking the button</p>
              <md-button class="addsem" :md-ripple="false" v-on:click="addmod(post)">Add Module</md-button>
            </md-empty-state>

            <md-list v-for="mod in post.mods" v-bind:key="mod.index" class="mod-list">
              <div class="mod-card">
                <p class="mod-name">{{mod.code}} {{mod.name}}</p>
                <p>{{mod.faculty}} • Arts and Social Science • 4 MCs</p>
                <div class="md-layout mod-content">
                  <div class="md-layout-item">
                    <p>
                      Grade Obtained :
                      <span class="mod-content-text">{{mod.grade}}</span>
                    </p>
                  </div>
                  <div class="md-layout-item md-size-10"></div>
                  <div class="md-layout-item">
                    <p>
                      SU Selected :
                      <span class="mod-content-text">{{mod.SU}}</span>
                    </p>
                  </div>
                </div>
                <span class="footerright">
                  <md-button class="md-icon-button mod-icon">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button class="md-icon-button mod-icon">
                    <md-icon>delete</md-icon>
                  </md-button>
                </span>
              </div>
            </md-list>

            <div class="mod-list" style="text-align:center" v-show="!showmod(post.mods)">
              <md-button class="addsem" :md-ripple="false" v-on:click="addmod(post)">Add Module</md-button>
            </div>
            <md-dialog :md-active.sync="showModal">
              <md-dialog-title>Add New Module for {{modalyear}} {{modalsem}}</md-dialog-title>
              <md-dialog-content>
                <ModuleForm :sem="modalsem" :year="modalyear" />
              </md-dialog-content>
            </md-dialog>
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
import ModuleForm from "./ModuleForm.vue";
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
    usergrades: [],
    modalyear: null,
    modalsem: null,
    currentdetails: []
  }),
  components: {
    //AddModuleModal
    ModuleForm
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

          if ((mod.sem == sem.semester) & (mod.year == sem.year)) {
            var result = {
              code: mod.module,
              grade: mod.grade,
              SU: mod.SU,
              faculty: null,
              MC: 0,
              department: null,
              name: null
            };
            //check if its in the mods
            var flag = false;
            for (var t = 0; t < sem.mods.length; t++) {
              var modcode = sem.mods[t].code;
              if (modcode == mod.module) {
                //exists
                flag = true;
              }
            }
            if (flag) {
              continue;
            } else {
              //fill in the other details
              this.setModuleDetails(result.code);

              sem.mods.push(result);
            }
          }
        }
        semesters.push(sem);
      }
      console.log(semesters);
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
      var sem = ["Semester 2", "Semester 1"];
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
      var latest = this.User.batch.year;
      var latestsem = "Semester 1";
      if (this.semnum > 0) {
        var latest1 =
          parseInt(this.semesters[this.semnum - 1].year.substring(2, 4)) + 1;
        var latest2 =
          parseInt(this.semesters[this.semnum - 1].year.substring(4, 6)) + 1;
        latest = "AY" + latest1 + latest2;
        latestsem = this.semesters[this.semnum - 1].semester;

        if (latestsem == "Semester 1") {
          latestsem = "Semester 2";
        } else {
          latestsem = "Semester 1";
        }
      }

      this.semesters.push({
        year: latest,
        semester: latestsem,
        mods: [],
        cap: 0.0,
        collapse: false
      });
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
      this.modalsem = sem.semester;
      this.modalyear = sem.year;
      this.showModal = true;
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
          this.semesters.push({
            year: sems[i].year,
            semester: sems[i].sem,
            mods: [],
            cap: sems[i].cap,
            collapse: false
          });
        }
      }
    },
    setModuleDetails(mod) {
      database.getModules(mod).then(item => {
        var list = item;
        let semesterlist = this.semesters;
        for (var i = 0; i < semesterlist.length; i++) {
          var modules = semesterlist[i].mods;
          for (var k = 0; k < modules.length; k++) {
            if (modules[k].code == mod) {
              console.log(item);
              modules[k].faculty = list.info.faculty;
              modules[k].MC = list.info.moduleCredit;
              modules[k].name = list.info.title;
              modules[k].department = list.info.department;
            }
          }
        }
      });
    },

    formatcap(cap) {
      return cap.toFixed(2);
    },
    formatMC(sem) {
      var total = 0;
      for (var i = 0; i < sem.mods.length; i++) {
          total += parseInt(sem.mods[i].MC);
      }
      return total;
    },
    closeThis() {
      this.showModal = false;
    }
  },

  created() {
    //this.filtersem();
    this.accumulatesems();
    database.getModuleResults().then(item => {
      this.usergrades = item;
    });
  },
  mounted() {
    this.$root.$on("closeModal", this.closeThis);
  }
};
</script>

<style scoped>
.md-dialog {
  width: 40vw;
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