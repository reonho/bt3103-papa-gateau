<template>
<body class="container-fluid">
  <div class="Registration">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 col-md-7 col-lg-5 mx-auto">
          <div class="cardbox card-signin my-5">
            <div style="padding:5%;  border-radius: 1rem 1rem 0 0;">
              <h1 class="text-center" style="color:white; font-weight:600;font-size:6vh;">MODEAUX</h1>
            </div>
            <div class="card-body">
              <!---form>
                      <div class="form-group">
                        <label for="username"> Username:</label>
                        <input type="username" id="username" placeholder="Enter username" v-model = "user">
                      </div>
                      <div class="form-group">
                        <label for="Password"> Password:</label>
                        <input type="password" id="password" placeholder="Password" v-model = "password">
                      </div>
                      <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" v-on:click = "validate">Sign In</button>
                      <span> {{this.error}}</span>
              </form-->
              <div style="text-align:center">
                <h1 style="color:DARKCYAN; font-size:3vh;">REGISTRATION</h1>
              </div>
              <br />
              <p class="reg-header">User Info</p>

              <md-field :class="getValidationClass('regForm', 'username')">
                <label>Email</label>
                <md-input type="username" id="username" v-model="regForm.username"></md-input>
                <span class="md-suffix">@u.nus.edu</span>
                <span class="md-error" v-if="!$v.regForm.username.required">This field is required</span>
              </md-field>
              <md-field :class="getValidationClass('regForm', 'name')">
                <label>Name</label>
                <md-input type="name" id="name" v-model="regForm.name"></md-input>
                <span class="md-error" v-if="!$v.regForm.name.required">This field is required</span>
              </md-field>
              <md-field :class="getValidationClass('regForm', 'password')">
                <label>Password</label>
                <md-input type="password" id="password" v-model="regForm.password"></md-input>
                <span class="md-error" v-if="!$v.regForm.password.required">This field is required</span>
                <span
                  class="md-error"
                  v-if="!$v.regForm.password.minLength"
                >Password must be at least 6 characters</span>
              </md-field>
              <md-field :class="getValidationClass('regForm', 'cfmpassword')">
                <label>Confirm Password</label>
                <md-input type="password" id="cfmpassword" v-model="regForm.cfmpassword"></md-input>
                <span
                  class="md-error"
                  v-if="!$v.regForm.cfmpassword.required"
                >This field is required</span>
                <span
                  class="md-error"
                  v-if="!$v.regForm.password.sameAsPassword & $v.regForm.cfmpassword.required"
                >Password does not match</span>
              </md-field>
              <br />
              <p class="reg-header">Education Info</p>

              <div class="md-layout">
                <div class="md-layout-item md-size-55">
                  <md-field :class="getValidationClass('regForm', 'coursechosen')">
                    <label>Course</label>
                    <md-select v-model="regForm.coursechosen" name="coursechosen" id="coursechosen">
                      <md-option
                        v-for="course in courselist"
                        :key="course.index"
                        :id="course.value"
                        v-model="course.value"
                      >{{ course.value }}</md-option>
                    </md-select>
                    <span
                      class="md-error"
                      v-if="!$v.regForm.coursechosen.required"
                    >This field is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-5"></div>
                <div class="md-layout-item md-size-40">
                  <!-- <md-field>
                    <label>Number of semesters completed</label>
                    <md-input type="number" v-on:keyup="filtersem" id="currentsem" v-model="semnum"></md-input>
                  </md-field>-->
                  <md-field :class="getValidationClass('regForm', 'yearchosen')">
                    <label>Year of Enrollment</label>
                    <md-select v-model="regForm.yearchosen" name="yearchosen" id="yearchosen">
                      <md-option
                        v-for="year in accumulateYear"
                        :key="year.index"
                        :id="year.value"
                        v-model="year.value"
                      >{{ year.value }}</md-option>
                    </md-select>
                    <span
                      class="md-error"
                      v-if="!$v.regForm.yearchosen.required"
                    >This field is required</span>
                  </md-field>
                </div>
              </div>
              <br />
              <button
                class="button btn btn-block text-uppercase"
                type="submit"
                v-on:click.prevent="addUser"
                style="background:linear-gradient(to right, teal,#17a2b8); font-weight:600;color:white;padding:1vh;"
              >
                <span style="font-size:1.6vh">Register</span>
              </button>
              <md-dialog-confirm
                :md-click-outside-to-close="false"
                :md-active.sync="showSubmitMessage"
                md-title="Success!"
                md-content="Thank you for registering with MODEAUX! You can procced to your dashboard."
                @md-confirm="goLogin"
                md-cancel-text
                md-confirm-text="Nice"
              />
              <md-dialog-confirm
                :md-click-outside-to-close="false"
                :md-active.sync="showError1Message"
                md-title="Invalid Email Address"
                md-content="Email is badly formatted. Please try again."
                @md-confirm="closemodal"
                md-cancel-text
                md-confirm-text="OK"
              />
              <md-dialog-confirm
                :md-click-outside-to-close="false"
                :md-active.sync="showError2Message"
                md-title="Email Address Exists"
                md-content="Email Address already exists. Please enter another email address."
                @md-confirm="closemodal"
                md-cancel-text
                md-confirm-text="OK"
              />
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
import database from "../firebase.js";
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "Registration",
  components: {},
  data: function() {
    return {
      regForm: {
        username: null,
        name: null,
        password: null,
        cfmpassword: null,
        coursechosen: null,
        yearchosen: null
      },
      courselist: [],
      showSubmitMessage: false,
      showError1Message: false,
      showError2Message: false
    };
  },
  mixins: [validationMixin],
  validations: {
    regForm: {
      username: {
        required
      },
      name: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      cfmpassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      coursechosen: {
        required
      },
      yearchosen: {
        required
      }
    }
  },
  computed: {
    accumulateYear() {
      var yearlist = [];
      var latest = parseInt(new Date().getFullYear());

      for (var i = 2016; i < latest; i++) {
        var start = i.toString().substring(2, 4);
        var end = (parseInt(start) + 1).toString();
        var value = "AY" + start + end;
        yearlist.push({
          value: value
        });
      }

      return yearlist;
    }
  },
  methods: {
    getValidationClass(formName, fieldName) {
      const field = this.$v[formName][fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    addUser() {
      var batch = {
        year: this.regForm.yearchosen,
        sem: "Semester 1"
      };

      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.regForm);
        console.log(batch);
        database
          .register(
            this.regForm.username + "@u.nus.edu",
            this.regForm.password,
            this.regForm.name,
            this.regForm.coursechosen,
            batch
          )
          .then(doc => {
            console.log(doc);
            this.showSubmitMessage = true;
            console.log(database.user);
          })
          .catch(err => {
            console.log(err);
            if (err == "The email address is badly formatted.") {
              this.showError1Message = true;
            } else if (err == "The email address is already in use by another account.") {
              this.showError2Message = true;
            }
          });
      }
    },
    goLogin() {
      this.$router.push({ path: "/" });
    },
    closemodal() {
      this.showError1Message = false;
      this.showError2Message = false;
    }
  },
  created() {
    //const self = this;
    //  database.getCourses().then(item => {
    //   this.courselist = item;
    //   console.log(this.courselist);
    // });
    database.firebase_data
      .collection("courses")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.courselist.push({
            value: doc.data().name
          });
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --input-padding-x: 2rem;
  --input-padding-y: 2rem;
}
h1 {
  margin-bottom: 0;
}
body {
  background: url("../assets/background.png") no-repeat;

  background-size: cover;
  width: 100%;
  min-height: 100vh;
  height: 125vh;
}
.button {
  font-family: Gill Sans;
  border-radius: 4px;
  border: none;
  text-align: center;
  margin: 0;
  transition: all 0.5s;
  cursor: pointer;
}
.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  font-size: 2vh;
  top: -0.55vh;
  right: -1vh;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 2.5vh;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
.cardbox {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
}
.card-signin {
  border: 0;
  top: 13vh;
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
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  padding: 5vh;
}
.reglink {
  color: #ec7663 !important;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 1vh;
}
.regbox {
  text-align: center;
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

.reg-header {
  font-weight: 600;
  font-size: 2vh;
  color: #ec7663;
}
.sem-header {
  font-weight: 600;
  font-size: 130%;
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
