<template>
<body class="container-fluid">
  <div class="loginPage">
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
                <h1 style="color:DARKCYAN; font-size:3vh;">USER LOGIN</h1>
              </div>
              <br />
              <md-field>
                <label>Enter Email</label>
                <md-input type="username" id="username" v-model="user"></md-input>
              </md-field>
              <md-field>
                <label>Enter Password</label>
                <md-input type="password" id="password" v-model="password"></md-input>
              </md-field>

              <button
                class="button btn btn-block text-uppercase"
                type="submit"
                v-on:click="login"
                style="background:linear-gradient(to right, teal,#17a2b8); font-weight:600;color:white;padding:1.5vh;"
              >
                <span style="font-size:1.6vh">Sign In</span>
              </button>
            </div>
          </div>
          <div class="card card-signin my-5">
            <div class="card-body regbox p-5">
              <span>New User?</span>
              <router-link class="reglink" :to="'/Registration'">Create an Account</router-link>
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
export default {
  name: "loginPage",
  components: {},
  data: function() {
    return {
      user: "",
      password: "",
      userObject: "Reon",
      error: ""
    };
  },
  methods: {
    // skip(){
    //   this.userObject = {
    //       User: this.user,
    //       Password: "12345",
    //       ModulesTaken: ["MA1101R","CS2030","CS1010S"],
    //       Course: "Business Analytics",
    //       Minor: "",
    //       SecondMajor: "",
    //       DoubleDegree: ""
    //     };
    //   this.$router.push({ path: "/", params: {userPassed: this.userObject}})
    // },
    login() {
      const self = this;
      database.login(this.user, this.password).then(function(e) {
        if (e) {
          self.$router.push({ path: "/" });
        } else {
          alert(e);
        }
      });
      console.log(database.getUser());
    }
    // validate(){
    //   let data = DataObject.Students
    //   var error = true
    //   for (var i = 0; i < data.length; ++i){
    //       if (data[i].User == this.user && data[i].Password == this.password) {
    //           this.userObject = data[i]
    //           this.$router.push({ name: 'LandPage', params: {userPassed: this.userObject}})
    //           error = false
    //           break
    //       }
    //   }
    //   if (error == true){
    //     this.error = "Wrong username or passowrd!"
    //   } else {
    //     this.error = ""
    //   }
    // }
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
  overflow: hidden;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
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
  content: '\00bb';
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
<style>
.md-field.md-theme-default:before {
  background-color: teal;
}
.md-field.md-theme-default.md-focused label {
  color: teal;
}

</style>
