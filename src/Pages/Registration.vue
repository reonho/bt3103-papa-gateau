<template>
<body class="container-fluid">
  <div class="loginPage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body p-5">
              <h1 class="text-center" style="color:#17a2b8; font-size:500%">MODEAUX</h1>
              <h1 class="card-title text-center">Registration</h1>
              <br />
              <p class="reg-header">User Info</p>

              <div class="md-layout">
                <div class="md-layout-item md-size-45">
                  <md-field>
                    <label>Email</label>
                    <md-input type="username" id="username" v-model="user"></md-input>
                    <span class="md-suffix">@u.nus.edu</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-10"></div>
                <div class="md-layout-item md-size-45">
                  <md-field>
                    <label>Name</label>
                    <md-input type="name" id="name" v-model="name"></md-input>
                  </md-field>
                </div>
              </div>
              <md-field>
                <label>Password</label>
                <md-input type="password" id="password" v-model="password"></md-input>
              </md-field>
              <md-field>
                <label>Confirm Password</label>
                <md-input type="password" id="cfmpassword" v-model="cfmpassword"></md-input>
              </md-field>
              <br />
              <p class="reg-header">Education Info</p>

              <div class="md-layout">
                <div class="md-layout-item md-size-60">
                  <md-field>
                    <label>Course</label>
                    <md-select id="course" v-model="course"></md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-10"></div>
                <div class="md-layout-item md-size-30">
                  <!-- <md-field>
                    <label>Number of semesters completed</label>
                    <md-input type="number" v-on:keyup="filtersem" id="currentsem" v-model="semnum"></md-input>
                  </md-field>-->
                  <md-field>
                    <label>Current Year of Study</label>
                    <md-input type="number" id="year" v-model="year"></md-input>
                  </md-field>
                </div>
              </div>
              <br />

              <md-list v-for="post in updatesem" v-bind:key="post.index">
                <p class="sem-header">Year {{post.year}} {{post.semester}}</p>
                <md-empty-state v-show="showmod(post.mods)">
                  <p class="empty">No Modules to Show</p>
                  <p>Start adding modules by clicking the button below</p>
                  <md-button class="addsem" :md-ripple="false" v-on:click="addmod(post)">Add Module</md-button>
                </md-empty-state>
                <AddModulesModal />
                <md-list v-for="mod in post.mods" v-bind:key="mod.index">{{mod.code}} {{mod.grade}}</md-list>
                <p>Total CAP : 4.00</p>
              </md-list>

              <md-button
                class="addsem"
                :md-ripple="false"
                v-on:click="addsem"
                v-show="showbutton"
              >Add Semester</md-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</template>


<script>
// import DataObject from "../Database.js"
//import database from "../firebase.js"
export default {
  name: "Registration",
  components: {},
  data: function() {
    return {
      username: "",
      name: "",
      password: "",
      cfmpassword: "",
      course: "",
      year: 0,
      semnum: 0,
      semlist: []
    };
  },
  computed: {
    updatesem() {
      let allsems = this.semlist;
      var semesters = [];
      for (var k = 0; k < this.semnum; k++) {
        semesters.push(allsems[k]);
      }
      return semesters;
    },
    showbutton() {
      if (this.semnum == 8) {
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
            mods: []
          });
        } else if (k > 2 && k <= 4) {
          //Year 2
          semesters.push({
            year: 2,
            semester: sem[k % 2],
            mods: []
          });
        } else if (k > 4 && k <= 6) {
          //Year 3
          semesters.push({
            year: 3,
            semester: sem[k % 2],
            mods: []
          });
        } else if (k > 6 && k <= 8) {
          //Year 4
          semesters.push({
            year: 4,
            semester: sem[k % 2],
            mods: []
          });
        }
      }

      this.semlist = semesters;
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
    addmod(sem) {
      var code = "BT2101";
      var grade = "A";
      let currentsems = this.semlist;
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
      this.semlist = currentsems;
    }
  },
  created() {
    this.filtersem();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --input-padding-x: 2rem;
  --input-padding-y: 2rem;
}
body {
  background: #17a2b8;
  background: linear-gradient(to right, teal, #17a2b8);
  min-height: 300vh;
}
.card-signin {
  border: 0;
  top: 50%;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}
.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}
.card-signin .card-body {
  padding: 2rem;
}
.form-signin {
  width: 100%;
}
.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}
.form-label-group input {
  height: auto;
  border-radius: 2rem;
}
.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}
.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}
.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}
.form-label-group input:-ms-input-placeholder {
  color: transparent;
}
.form-label-group input::-ms-input-placeholder {
  color: transparent;
}
.form-label-group input::-moz-placeholder {
  color: transparent;
}
.form-label-group input::placeholder {
  color: transparent;
}
.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}
.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
.btn-google {
  color: white;
  background-color: #ea4335;
}
.btn-facebook {
  color: white;
  background-color: #3b5998;
}
.md-button.addsem {
  background-color: #17a2b8 !important;
  font-weight: bold;
  color: white;
  margin: 0;
}
.reg-header {
  font-weight: 600;
  font-size: 130%;
  color: #B82D17
}
.sem-header {
  font-weight: 600;
  font-size: 130%;
  color: #707b7c;
}
.empty {
  font-weight: 600;
  font-size: 120%;
  color: #707b7c;
}
/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}
/* Fallback for IE
-------------------------------------------------- */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>