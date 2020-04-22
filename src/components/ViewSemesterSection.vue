/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div id="ViewSemesterSection">
    <div>
      <div class="md-layout">
        <div class="md-layout-item md-size-35">
           <md-field class="mod-dropdown">
            <label style="font-size:1vw">Year</label>
            <md-select v-model="yearchosen" name="yearchosen" id="yearchosen" md-dense multiple>
              <md-option
                v-for="year in showyears"
                :key="year.value"
                :id="year.value"
                v-model="year.value"
              >{{ year.value }}</md-option>
            </md-select>
          </md-field>
          <md-chips
            class="mod-chips"
            style="margin-bottom:0; padding:0"
            v-model="yearchosen"
            md-static
          ></md-chips>
        </div>
        <div class="md-layout-item md-size-5"></div>
        <div class="md-layout-item md-size-35">
          <md-field class="mod-dropdown">
            <label style="font-size:1vw">Semester</label>
            <md-select v-model="semchosen" name="semchosen" id="semchosen" multiple>
              <md-option
                v-for="sem in showsemesters"
                :key="sem.value"
                :id="sem.value"
                v-model="sem.value"
              >{{ sem.value }}</md-option>
            </md-select>
          </md-field>
          <md-chips
            class="mod-chips"
            style="margin-bottom:0; padding:0"
            v-model="semchosen"
            md-static
          ></md-chips>
        </div>
        <div class="md-layout-item md-size-5"></div>
        <div class="md-layout-item md-size-10">
          <md-field class="mod-dropdown" style="padding-top: 0;">
            <b-button
              style="padding:1vh;"
              v-on:click="clearfilter"
              variant="outline-info"
            >
              <span style="font-size:0.8vw; font-weight: bold">CLEAR FILTER</span>
            </b-button>
          </md-field>
        </div>
      </div>
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
                <p>Total CAP : {{formatcap(post)}}</p>
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
                <p class="mod-name">
                  <router-link
                    class="mod-name"
                    :to="'/'+mod.code"
                    style="color:#EC7663;"
                  >{{mod.code}} {{mod.name}}</router-link>
                </p>

                <p>{{mod.department}} • {{mod.faculty}} • {{mod.MC}} MCs</p>
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
                  <md-button class="md-icon-button mod-icon" v-on:click="editmod(mod)">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-dialog :md-active.sync="showModal">
                    <md-dialog-title>Edit Module for {{modalyear}} {{modalsem}}</md-dialog-title>
                    <md-dialog-content>
                      <ModuleForm
                        :sem="modalsem"
                        :year="modalyear"
                        :grade="grade"
                        :code="code"
                        :purpose="'Edit'"
                      />
                    </md-dialog-content>
                  </md-dialog>

                  <md-button class="md-icon-button mod-icon" v-on:click="deletemod(mod)">
                    <md-icon>delete</md-icon>
                  </md-button>
                  <md-dialog :md-active.sync="showDeleteModal">
                    <md-dialog-title>Remove {{code}} Module?</md-dialog-title>
                    <md-dialog-content>
                      Are You Sure?
                      <ConfirmModal :module="module" />
                    </md-dialog-content>
                  </md-dialog>
                </span>
              </div>
            </md-list>

            <div class="mod-list" style="text-align:center" v-show="!showmod(post.mods)">
              <md-button class="addsem" :md-ripple="false" v-on:click="addmod(post)">Add Module</md-button>
              <md-dialog :md-active.sync="showAddModal">
                <md-dialog-title>Add New Module for {{modalyear}} {{modalsem}}</md-dialog-title>
                <md-dialog-content>
                  <ModuleForm
                    :sem="modalsem"
                    :year="modalyear"
                    :grade="grade"
                    :code="code"
                    :purpose="'Add'"
                  />
                </md-dialog-content>
              </md-dialog>
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
import ModuleForm from "./ModuleForm.vue";
import ConfirmModal from "./ConfirmModal.vue";
import database from "../firebase.js";
export default {
  name: "ViewSemesterSection",
  props: {
    User: Object
  },
  data: () => ({
    showModal: false,
    showAddModal: false,
    showDeleteModal: false,
    yearlist: [],
    semlist: [],
    grade: null,
    mod: null,
    SU: null,
    semnum: 0,
    semesters: [],
    usergrades: [],
    modalyear: null,
    modalsem: null,
    currentdetails: [],
    yearchosen: [],
    semchosen: [],
    deleted: "",
    code: "",
    module: ""
  }),
  components: {
    //AddModuleModal
    ModuleForm,
    ConfirmModal
  },
  computed: {
    updatesem() {
      var semnum = 0;
      let sems = this.User.sap_by_sem;
      var available = 0;
      for (var m = 0; m < sems.length; m++) {
        if (Object.keys(sems[m]).length > 0) {
          available++;
        }
      }

      let semesters = [];
      var years = [];
      var semesterslist = [];
      var batchyr = this.User.batch.year;
      var flag = available;
      var flag2 = false;
      var latest = this.User.batch.year;
      var latestsem = "Semester 1";
      while (flag > 0) {
        var flag3 = false;
        for (var i = 0; i < available; i++) {
 
          if (Object.keys(sems[i]).length > 0) {
            if (
              semnum == 0 &&
              batchyr == sems[i].year &&
              latestsem == sems[i].sem
            ) {
              if (!years.includes(sems[i].year)) {
                years.push(sems[i].year);
              }
              if (!semesterslist.includes(sems[i].sem)) {
                semesterslist.push(sems[i].sem);
              }

              semesters.push({
                year: sems[i].year,
                semester: sems[i].sem,
                mods: [],
                cap: sems[i].cap,
                collapse: false
              });
              flag2 = true;
              flag--;
              semnum++;
              break;
            } else if (flag2) {

              if (flag3 == false) {
                if (latestsem == "Semester 1") {
                  latestsem = "Semester 2";
                } else {
                  var latest1 = parseInt(latest.substring(2, 4)) + 1;
                  var latest2 = parseInt(latest.substring(4, 6)) + 1;
                  latest = "AY" + latest1 + latest2;
                  latestsem = "Semester 1";
                }
                flag3 = true;
              }
              if (latest == sems[i].year && latestsem == sems[i].sem) {
                flag3 = false;
                if (!years.includes(sems[i].year)) {
                  years.push(sems[i].year);
                  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                }
                if (!semesterslist.includes(sems[i].sem)) {
                  semesterslist.push(sems[i].sem);
                  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                }

                semesters.push({
                  year: sems[i].year,
                  semester: sems[i].sem,
                  mods: [],
                  cap: sems[i].cap,
                  collapse: false
                });
                flag--;
                semnum++;
                break;
              }
            } else {
            
              continue;
            }
          }
        }
      }
 
      for (var k = 0; k < semesters.length; k++) {
        var usermods = this.usergrades;
       
        let sem = semesters[k];

        for (var j = 0; j < Object.keys(usermods).length; j++) {
          let mod = usermods[j];

          if ((mod.sem == sem.semester) & (mod.year == sem.year)) {
            if (mod.module != "") {
              var result = {
                code: mod.module,
                grade: mod.grade,
                SU: mod.SU,
                faculty: null,
                MC: 0,
                department: null,
                name: null,
                year: sem.year,
                semester: sem.semester
              };
              //check if its in the mods

              this.setModuleDetails(result.code);

              sem.mods.push(result);
            }
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.semesters = semesters;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.semnum = semnum;

      ///filtering
      let filterData = semesters;
      if (this.yearchosen.length > 0) {
        filterData = filterData.filter(item => {
          if (this.yearchosen.includes(item.year.toString())) {
            return true;
          }

          return false;
        });
      }
      if (this.semchosen.length > 0) {
        filterData = filterData.filter(item => {
          if (this.semchosen.includes(item.semester.toString())) {
            return true;
          }

          return false;
        });
      }

      return filterData;
    },
    showbutton() {
      if ((this.semnum == 8) | (this.semnum == 0)) {
        return false;
      }
      return true;
    },
    showyears() {
      let sems = this.semesters;
     
      var years = [];
      var yearlist = [];
      for (var i = 0; i < sems.length; i++) {
        if (!years.includes(sems[i].year)) {
          years.push(sems[i].year);
          yearlist.push({
            value: sems[i].year
          });
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        }
      }
      return yearlist;
    },
    showsemesters() {
      let sems = this.semesters;
      var semesters = [];
      var semesterslist = [];

      for (var i = 0; i < sems.length; i++) {
        if (!semesters.includes(sems[i].semester)) {
          semesters.push(sems[i].semester);
          semesterslist.push({
            value: sems[i].semester
          });
        }
      }
      return semesterslist;
    }
  },
  methods: {
    clearfilter() {
      this.yearchosen = [];
      this.semchosen = [];
    },
    addsem() {
      var semnum = this.semnum;
      var latest = this.User.batch.year;
      var latestsem = "Semester 1";

      //check if prev sem is filled with modules

      if (semnum > 0) {
        latestsem = this.semesters[semnum - 1].semester;
        if (latestsem == "Semester 1") {
          latest = this.semesters[semnum - 1].year;
          latestsem = "Semester 2";
          latestsem = "Semester 2";
        } else {
          var latest1 =
            parseInt(this.semesters[semnum - 1].year.substring(2, 4)) + 1;
          var latest2 =
            parseInt(this.semesters[semnum - 1].year.substring(4, 6)) + 1;
          latest = "AY" + latest1 + latest2;
          latestsem = "Semester 1";
        }
      }

      var dummy = {
        SU: "No",
        attribute: "",
        course: "Business Analytics",
        faculty: "",
        grade: "",
        module: "",
        sem: latestsem,
        year: latest
      };
      database
        .addModuleDummy(dummy)
        .then(e => {
          console.log(e);

          this.readData();
        })
        .catch(() => {});
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
      if (sem.semester != null && sem.year != null) {
        this.modalsem = sem.semester;
        this.modalyear = sem.year;
      } else {
        this.modalsem = this.User.batch.sem;
        this.modalyear = this.User.batch.year;
      }
      this.grade = "";
      this.code = "";
      this.showAddModal = true;
    },
    editmod(mod) {
      this.showModal = true;
      this.grade = mod.grade;
      this.code = mod.code;
      database.updateModuleResults(mod);
    },
    deletemod(mod) {
      this.module = mod;
      this.code = mod.code;

      this.showDeleteModal = true;
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
      var years = [];
      var semesters = [];
      for (var i = 0; i < sems.length; i++) {
        if (Object.keys(sems[i]).length > 0) {
          this.semnum++;

          if (!years.includes(sems[i].year)) {
            years.push(sems[i].year);
            this.yearlist.push({
              value: sems[i].year
            });
          }
          if (!semesters.includes(sems[i].sem)) {
            semesters.push(sems[i].sem);
            this.semlist.push({
              value: sems[i].sem
            });
          }
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
    updatefilter(year, sem) {
      var years = [];
      var sems = [];
      for (var i = 0; i < this.yearlist.length; i++) {
        years.push(this.yearlist[i].value);
      }
      for (var k = 0; k < this.semlist.length; k++) {
        sems.push(this.semlist[k].value);
      }
      if (!years.includes(year)) {
        years.push(year);
        this.yearlist.push({
          value: year
        });
      }
      if (!sems.includes(sem)) {
        sems.push(sem);
        this.semlist.push({
          value: sem
        });
      }
    },
    updateSemestermod(mod) {
      var semesters = this.semesters;

      for (var i = 0; i < semesters.length; i++) {
        let mods = semesters[i].mods;
        for (var k = 0; k < mods.length; k++) {
          if (mods[k].code == mod) {
            this.semesters[i].mods.$remove(mods[k]);
          }
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
              modules[k].faculty = list.info.faculty;
              modules[k].MC = list.info.moduleCredit;
              modules[k].name = list.info.title;
              modules[k].department = list.info.department;
            }
          }
        }
      });
    },

    formatcap(sem) {
      var total = 0;
      var MC = 0;
      if (sem.mods.length != 0) {
        for (var i = 0; i < sem.mods.length; i++) {
          total +=
            parseInt(sem.mods[i].MC) * database.convertCap(sem.mods[i].grade);
          MC += parseInt(sem.mods[i].MC);
        }
        total = total / MC;
      }
      return total.toFixed(2);
    },
    formatMC(sem) {
      var total = 0;
      for (var i = 0; i < sem.mods.length; i++) {
        total += parseInt(sem.mods[i].MC);
      }
      return total;
    },
    closeThis1() {
      this.showModal = false;
      this.showAddModal = false;
      this.readData();
    },
    closeThis2() {
      this.showModal = false;
      this.showAddModal = false;
      this.readData();
    },
    deleteitem() {
      this.showDeleteModal = false;
      this.readData();
      //delete from this.semesters
      // this.updatefilter(val.year, val.sem);
    },
    readData() {
      const self = this;
      database.getModuleResults().then(item => {
        this.usergrades = item;
      });
      // query database for user info
      database.firebase_data
        .collection("students")
        .doc(database.user)
        .onSnapshot(function(user) {
          var userData = user.data();

          var result = {
            name: userData.name,
            faculty: userData.faculty,
            dept: userData.dept,
            course: userData.course,
            modules: userData.modules_taken,
            sap_by_sem: userData.sam_by_sem,
            overall_cap: userData.overall_cap,
            batch: userData.batch, // for querying cohort top modules
            modules_taken: userData.modules_taken, //!!!THIS PART IS TO QUERY MODULES TAKEN; array of modules:[{SU:false,module:"BT2101"},....]
            attributes: userData.attributes //individual attributes can be found in self.User.attributes
          };

          self.currentuser = result;
        });
    }
  },

  created() {
    //this.accumulatesems();
    database.getModuleResults().then(item => {
      this.usergrades = item;
    });
  },
  mounted() {
    this.$root.$on("closeModal1", this.closeThis1);
    this.$root.$on("closeModal2", this.closeThis2);
    this.$root.$on("deleteitem", this.deleteitem);
  }
};
</script>

<style scoped>
.md-dialog {
  width: 40vw;
  overflow: auto;
  display: block;
}
.mod-dropdown.md-field {
  margin: 0.3vw 0 0.5vw !important;
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
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
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
  color: #ec7663 !important;
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