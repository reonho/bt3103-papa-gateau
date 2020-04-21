<template>
  <div>
    <NavBar />
    <main>
      <div id="modulePage" style="margin-top:5vh;">
        <title>{{this.Module.info.moduleCode}} - {{this.Module.info.title}}</title>
        <section id="details">
          <div style="color:#EC7663; margin-left: 1vw;" class="header">
            <b>{{this.Module.info.moduleCode}} - {{this.Module.info.title}}</b>
          </div>

          <div
            style="color: #616a6b; margin-left: 1vw; padding-top: 1vh"
            class="depFac"
          >{{this.Module.info.department}} • {{this.Module.info.faculty}} • {{this.Module.info.moduleCredit}} MCs</div>
          <div
            style="color: #616a6b; margin-left: 1vw; padding-top: 1vh"
            class="depFac"
          >{{showsem(this.Module.info.semesterData)}}</div>
          <hr />
          <div style="margin-left: 1vw; margin-right:1vw;font-size:2vh">
            {{this.Module.info.description}}
            <br />
            <br />
            <div class="row">
              <div class="col-4" style="text-align:left">
                <span v-if="this.Module.info.preclusion">
                  <b style="color: #616a6b">Preclusion(s)</b>
                  <br />
                  <span>{{this.Module.info.preclusion}}</span>
                  <br />
                  <br />
                </span>
                <span v-if="this.Module.info.prerequisite">
                  <b style="color: #616a6b">Prerequisite(s)</b>
                  <br />
                  {{this.Module.info.prerequisite}}
                  <br />
                  <br />
                </span>
                <p v-for="sem in checksemester(this.Module)" v-bind:key="sem.index">
                  <span v-if="sem.disabled == ''">
                    <b style="color: #616a6b">
                      {{ sem.semester }} Exam
                      <br />
                    </b>
                    <span v-if="sem.examDate == null">No Exam</span>
                    <span v-else>{{ formatDate(sem.examDate) }} • {{ sem.examDuration }} hrs</span>
                  </span>
                </p>
                <br />
              </div>
              <div class="col-8">
                <b style="color: #616a6b">Workload - {{calcwork(this.Module) + " hours"}}</b>
                <workloadchart :seriesStats="formatwork(this.Module.info.workload)"></workloadchart>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section id="attributes">
          <span
            style="color:#EC7663; margin-left:1vw; margin-top:1vh; font-size: 3vh"
          >Attributes of top scorers in this module</span>
          <i
            class="far fa-question-circle"
            style="font-size:3vh; color:grey"
            title="Average grades of students who have scored A and above in this module."
          ></i>
          <div style="text-align:center;">
            <RadarChart
              v-if="typeof myAttCheck == 'string' && typeof topAttCheck == 'string'"
              :my_attr="myAttributes"
              :fac_attr="topAttributes"
              type="Module"
              label_1="My Attributes"
              label_2="Top Student Attributes"
              style="display: inline-block; width:50%; height:50%; padding-top: 2vh"
            ></RadarChart>
            <RadarChart
              v-if="typeof myAttCheck === 'boolean' && typeof topAttCheck === 'string'"
              :my_attr="topAttributes"
              :fac_attr="null"
              type="Module"
              label_1="My Attributes"
              label_2="Top Student Attributes"
              style="display: inline-block; width:50%; height:50%; padding-top: 2vh"
            ></RadarChart>
            <md-empty-state
              v-if="topAttributes === 'no data'"
              style="padding-top:0;"
              id="statebox"
              md-description="There is insufficient data for this module."
              md-icon="assessment"
              md-label="Insufficient Data"
            />
          </div>
        </section>
        <hr />
        <section id="statistics" style="margin-left:1vw;">
          <span style="color:#EC7663;margin-top:1vh; font-size: 3vh">Review Statistics</span>
          <i
            class="far fa-question-circle"
            style="font-size:3vh; color: grey"
            title="Statistics collected based on reviews gathered from users below."
          ></i>
          <br />
          <br />
          <b-tabs
            active-nav-item-class="activetab"
            class="semtabs"
            id="moduletabs"
            v-model="chosenSem"
            content-class="mt-3"
            lazy
          >
            <b-tab
              v-for="sem in checksemester(this.Module)"
              v-bind:key="sem.index"
              :title="sem.semester"
              :title-link-class="sem.disabled"
              :active="sem.active"
            >
              <div id="container">
                <div v-show="showEmpty&&!loading">
                  <md-empty-state
                    id="statebox"
                    style="max-width:0 !important; color: #2e4053; padding:0"
                    md-label="No Data"
                    md-icon="cloud_circle"
                  ></md-empty-state>
                </div>
                <div class="row">
                  <div class="col-4" v-show="loading"></div>
                  <div class="col-4" v-show="showEmpty"></div>
                  <div class="col-4" v-show="!loading&&!showEmpty">
                    <pie-chart :semester="chosenSem" :code="code" :years="yrs"></pie-chart>
                  </div>
                  <div class="col-8 box">
                    <div class="row">
                      <div class="col-5" v-show="loading"></div>
                      <div class="col-5" v-show="showEmpty"></div>
                      <div class="col-5" v-show="!loading&&!showEmpty">
                        <h4
                          style="padding-top: 1.5vh;color:#616a6b; font-size:2.5vh"
                        >Student reviews</h4>
                        <p v-if="ratings != 0">
                          <span
                            v-for="n in numWholeStars(overallRating)"
                            :key="n"
                            style="color: gold;font-size:2.5vh;"
                            class="star"
                            id="avg_gold_stars"
                          >
                            <i class="fa fa-star"></i>
                          </span>
                          <span
                            v-for="n in numHalfStars(overallRating)"
                            :key="n"
                            style="color: gold;font-size:2.5vh;"
                            class="star"
                            id="avg_gold_stars_half"
                          >
                            <i class="fas fa-star-half-alt"></i>
                          </span>
                          <span
                            v-for="n in (5 - numWholeStars(overallRating) - numHalfStars(overallRating))"
                            :key="n"
                            style="color: lightgrey;font-size:2.5vh;"
                            class="star"
                            id="avg_grey_stars"
                          >
                            <i class="fa fa-star"></i>
                          </span>
                          <span style="padding:1.25vh;">{{ overallRating }} out of 5</span>
                        </p>
                        <h5 style="font-weight:400">
                          {{ratings}}
                          <span v-if="ratings > 1">student ratings</span>
                          <span v-else>student rating</span>
                        </h5>
                        <bar-chart
                          :semester="chosenSem"
                          :code="code"
                          :years="yrs"
                          :loading="loading"
                        ></bar-chart>
                      </div>
                      <div class="col-7">
                        <div v-show="loading"></div>
                        <div v-show="showEmpty"></div>
                        <div v-show="!loading&&!showEmpty" v-if="ratings != 0">
                          <h4
                            style="padding-top:1.5vh;color:#616a6b; padding-bottom:1vh;font-size:2.5vh"
                          >Features</h4>
                          <div class="row">
                            <div class="col-6">
                              <p style="font-weight:400; font-size:2vh">Easy to understand</p>
                            </div>
                            <div class="col-6" style="float:right">
                              <p>
                                <span
                                  v-for="n in numWholeStars(easy)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="easy_gold_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  v-for="n in numHalfStars(easy)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="easy_gold_stars_half"
                                >
                                  <i class="fas fa-star-half-alt"></i>
                                </span>
                                <span
                                  v-for="n in (5 - numWholeStars(easy) - numHalfStars(easy))"
                                  :key="n"
                                  style="color: lightgrey;"
                                  class="star"
                                  id="easy_grey_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span style="padding:1.25vh;font-size: 2vh" id="easy">{{ easy }}</span>
                              </p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-6">
                              <p style="font-weight:400; font-size:2vh">Manageable assignments</p>
                            </div>
                            <div class="col-6" style="float:right">
                              <p>
                                <span
                                  v-for="n in numWholeStars(manag_asgn)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="man_gold_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  v-for="n in numHalfStars(manag_asgn)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="man_gold_stars_half"
                                >
                                  <i class="fas fa-star-half-alt"></i>
                                </span>
                                <span
                                  v-for="n in (5 - numWholeStars(manag_asgn) - numHalfStars(manag_asgn))"
                                  :key="n"
                                  style="color: lightgrey;"
                                  class="star"
                                  id="man_grey_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  style="padding:1.25vh;font-size: 2vh"
                                  id="manageable"
                                >{{ manag_asgn }}</span>
                              </p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-6">
                              <p style="font-weight:400; font-size:2vh">Manageable exams</p>
                            </div>
                            <div class="col-6" style="float:right">
                              <p>
                                <span
                                  v-for="n in numWholeStars(manag_exam)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="exam_gold_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  v-for="n in numHalfStars(manag_exam)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="exam_gold_stars_half"
                                >
                                  <i class="fas fa-star-half-alt"></i>
                                </span>
                                <span
                                  v-for="n in (5 - numWholeStars(manag_exam) - numHalfStars(manag_exam))"
                                  :key="n"
                                  style="color: lightgrey;"
                                  class="star"
                                  id="exam_grey_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  style="padding:1.25vh;font-size: 2vh"
                                  id="exam"
                                >{{ manag_exam }}</span>
                              </p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-6">
                              <p style="font-weight:400; font-size:2vh">Manageable workload</p>
                            </div>
                            <div class="col-6" style="float:right">
                              <p>
                                <span
                                  v-for="n in numWholeStars(manag_wkld)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="wkload_gold_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  v-for="n in numHalfStars(manag_wkld)"
                                  :key="n"
                                  style="color: gold;"
                                  class="star"
                                  id="wkload_gold_stars_half"
                                >
                                  <i class="fas fa-star-half-alt"></i>
                                </span>
                                <span
                                  v-for="n in (5 - numWholeStars(manag_wkld) - numHalfStars(manag_wkld))"
                                  :key="n"
                                  style="color: lightgrey;"
                                  class="star"
                                  id="wkload_grey_stars"
                                >
                                  <i class="fa fa-star"></i>
                                </span>
                                <span
                                  style="padding:1.25vh;font-size: 2vh"
                                  id="workload"
                                >{{ manag_wkld }}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <br />

                        <div v-show="!loading && !(findYears.length == 0)">
                          <h4
                            style="padding-top: 1.3vh;color:#0B5345; font-size:2.5vh"
                          >Filter by Year</h4>

                          <md-field style="width: 20vw">
                            <label for="years">Years Selected</label>
                            <md-select
                              v-model="yrs"
                              multiple
                              name="years"
                              id="years"
                              @md-selected="showloading"
                            >
                              <md-option
                                v-if="findYears.includes('AY1920')"
                                value="AY1920"
                                v-bind:class="{'disabledTab': loading,  '': !loading }"
                              >AY 1920 ({{ countInArray(findYears, 'AY1920') }})</md-option>
                              <md-option
                                v-if="findYears.includes('AY1819')"
                                value="AY1819"
                                v-bind:class="{'disabledTab': loading,  '': !loading }"
                              >AY 1819 ({{ countInArray(findYears, 'AY1819') }})</md-option>
                              <md-option
                                v-if="findYears.includes('AY1718')"
                                value="AY1718"
                                v-bind:class="{'disabledTab': loading,  '': !loading }"
                              >AY 1718 ({{ countInArray(findYears, 'AY1718') }})</md-option>
                              <md-option
                                v-if="findYears.includes('AY1617')"
                                value="AY1617"
                                v-bind:class="{'disabledTab': loading,  '': !loading }"
                              >AY 1617 ({{ countInArray(findYears, 'AY1617') }})</md-option>
                            </md-select>
                          </md-field>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>

                  <div style="width: 100%;" v-show="loading">
                    <md-empty-state
                      id="statebox"
                      style="max-width:0 !important; margin-top:-2vw; margin-bottom:5vw;color: #2e4053;"
                      md-label="Loading..."
                    >
                      <br />
                      <ScaleLoader :loading="loading" :color="color"></ScaleLoader>
                    </md-empty-state>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </section>
        <hr />
        <!-- First query if user has already written a review for the module, if yes then show a dialog else navigate to review page. Should pass module code here -->
        <section id="reviews">
          <div style="color:#EC7663; margin-top:1vh; margin-left:1vw; font-size: 3vh">
            Reviews
            <a
              class="btn btn-primary btn-lg mr-4"
              style="color: white; font-size: 2vh; float:right; background-color:teal; border-color:teal"
              href="#"
              id="addReview"
              @click="review"
            >New Review</a>
            <b-dropdown
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              style="float:right"
              no-caret
            >
              <template v-slot:button-content>
                <h5>Sort by Newest &#9662;</h5>
              </template>
              <b-dropdown-item href="#">
                <h5>Best</h5>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <h5>Newest</h5>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <h5>Oldest</h5>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <br />
          <div>
            <ReviewSection :reviewData="reviewData" />
            <md-dialog-alert
              :md-active.sync="showDialog"
              md-content="You have already submitted a review for this module."
              md-confirm-text="Okay"
              md-title="Review already exists"
            />
            <md-dialog-confirm
              :md-active.sync="showAddDialog"
              md-content="Please add the module to your dashboard before writing a review."
              md-confirm-text="Bring me there"
              md-title="Module not added"
              md-cancel-text="Cancel"
              @md-confirm="goLand"
            />
          </div>
        </section>
      </div>
      <nav class="section-nav">
        <ol>
          <li>
            <a href="#details" id="navlink">Details</a>
          </li>
          <li>
            <a href="#attributes" id="navlink">Top Scorers' Attributes</a>
          </li>
          <li>
            <a href="#statistics" id="navlink">Review Statistics</a>
          </li>
          <li>
            <a href="#reviews" id="navlink">Reviews</a>
          </li>
        </ol>
      </nav>
    </main>
  </div>
</template>

<script>
import PieChart from "../PieChart.js";
import BarChart from "../BarChart.js";
import WorkloadChartForMod from "../components/WorkloadChartForMod";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import RadarChart from "../components/RadarChart";
import NavBar from "../components/NavBar";
import database from "../firebase";
import ReviewSection from "../components/ReviewSection";

export default {
  name: "ModulePage",
  props: {
    code: String
  },
  components: {
    PieChart,
    BarChart,
    workloadchart: WorkloadChartForMod,
    ScaleLoader,
    NavBar,
    ReviewSection,
    RadarChart
  },
  computed: {
    showEmpty: function() {
      return this.ratings == 0;
    },
    findYears: function() {
      var years = [];
      for (var docu in this.reviewData) {
        let sem = this.reviewData[docu].detailsForm.selectedSemester;
        if (
          isNaN(sem)
            ? sem.includes("Semester " + (this.chosenSem + 1))
            : sem == this.chosenSem
        ) {
          years.push(this.reviewData[docu].detailsForm.selectedYear);
        }
      }
      return years;
    }
  },
  methods: {
    goLand() {
      this.$router.push({ name: "LandPage" });
    },
    countInArray(array, value) {
      return array.reduce((n, x) => n + (x === value), 0);
    },
    numWholeStars(n) {
      return Math.floor(n);
    },
    numHalfStars(n) {
      if (n % 1 >= 0.5) {
        return 1;
      } else return 0;
    },
    shortload: function(n) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, n);
    },
    showloading: function() {
      this.loading = true;
      this.$root.$on("showValues", this.showValues);
      setTimeout(() => {
        this.loading = false;
      }, 800);
    },
    review() {
      database.getUser().then(user => {
        //check if user has added module
        database.ifAddedModule(this.code, user).then(mod => {
          if (mod === null) {
            this.showAddDialog = true;
          } else {
            database.ifAddedReview(this.code, user).then(rev => {
              //if user has not written review yet
              if (rev === null) {
                this.$router.push({
                  name: "ReviewForm",
                  params: { mod: this.Module.info.moduleCode }
                });
              } else {
                //user has already written a review, prompt them
                this.showDialog = true;
              }
            });
          }
        });
      });
    },

    formatwork(workload) {
      var series = [];
      series.push({
        name: "Workload",
        data: workload
      });
      return series;
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
      return semesters;
    },
    showsem(sem) {
      var totalsems = "";
      var num = sem.length;
      for (var i = 0; i < num; i++) {
        var semesters = ["Semester 1", "Semester 2"];
        if (sem[i].semester == 3) {
          totalsems += semesters[2] + " • ";
        } else if (sem[i].semester == 4) {
          totalsems += semesters[3] + " • ";
        } else if (sem[i].semester == 2) {
          totalsems += semesters[1] + " • ";
        } else {
          totalsems += semesters[0] + " • ";
        }
      }
      return totalsems.slice(0, -3);
    },
    calcwork(arr) {
      arr = arr.info.workload;
      var num = 0;
      for (var i = 0; i < arr.length; i++) {
        num = num + arr[i];
      }
      return num;
    },
    showValues(value, str) {
      if (str == "ratings") {
        this.ratings = value;
      } else if (str == "avg") {
        this.overallRating = value;
      } else if (str == "easy") {
        this.easy = value;
      } else if (str == "manag_asgn") {
        this.manag_asgn = value;
      } else if (str == "manag_exam") {
        this.manag_exam = value;
      } else if (str == "manag_wkld") {
        this.manag_wkld = value;
      }
    }
  },
  created() {
    //replace this with a query by module code
    database.firebase_data
      .collection("reviews")
      .where("module_code", "==", this.code)
      .onSnapshot(querySnapShot => {
        this.reviewData = [];
        querySnapShot.forEach(doc => {
          let item = {};
          item = doc.data();
          item.id = doc.id;
          this.reviewData.push(item);
          //console.log(this.reviewData);
        });
      });
    //get module details
    database.getModules(this.code).then(item => {
      this.Module = item;
    });

    database.firebase_data
      .collection("students")
      .doc(database.user)
      .get()
      .then(user => {
        var userData = user.data();
        this.myAttributes = userData.attributes;
        //console.log(typeof this.myAttCheck);
        this.myAttCheck = userData.attributes[0].att;
        //console.log("Check myAtt");
      });

    database.getModuleAttributes(this.code).then(ma => {
      console.log(ma);
      this.topAttributes = ma;

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      var self = this;
      async function check(self) {
        // console.log(typeof ma );

        while (typeof ma[0] == "undefined") {
          await sleep(2000);
        }
        self.topAttCheck = ma[0].att;
      }
      //no top students data
      if (ma !== "no data") {
        check(self);
      }
    });
  },
  updated() {
    // For the scrollspy
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (document.querySelector(`nav li a[href="#${id}"]`) !== null) {
          if (entry.intersectionRatio > 0) {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              .parentElement.classList.add("active");
          } else {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              .parentElement.classList.remove("active");
          }
        }
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll("section[id]").forEach(section => {
      observer.observe(section);
    });
  },
  mounted() {
    this.loading = false;
    this.shortload(2000);
    this.$root.$on("showValues", this.showValues);
  },
  data: () => ({
    topAttributes: null,
    myAttributes: null,
    myAttCheck: false,
    topAttCheck: false,
    color: "#eda200",
    ratings: 0,
    overallRating: 0,
    easy: 0,
    manag_asgn: 0,
    manag_exam: 0,
    manag_wkld: 0,
    loading: true,
    showAddDialog: false,
    showDialog: false,
    yrs: ["AY1920", "AY1819", "AY1718", "AY1617"],
    totalsems: "",
    reviewData: [],
    infodes: null,
    module_code: "",
    chosenSem: 0,
    Module: {
      info: {
        department: "",
        description: "",
        faculty: "",
        moduleCode: "",
        moduleCredit: "",
        prerequisite: "",
        semesterData: [],
        title: "",
        workload: []
      }
    }
  }),
  watch: {
    yrs: function() {
      this.$root.$on("showValues", this.showValues);
    },
    chosenSem: function() {
      this.shortload(900);
    },
    topAttCheck: function() {
      console.log(this.topAttCheck);
    },
    topAttributes: function() {
      console.log(this.topAttributes);
    },
    myAttributes: function() {
      console.log(this.myAttributes);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~vue-material/src/theme/engine";
@import "../assets/stylesheets/scrollSpy.scss";
.header {
  padding: 1vh;
  padding-left: 0;
  font-size: 1.8vw;
}
.miniheader {
  font-size: 1.2vw;
  color: #616a6b;
  font-weight: bold;
}
.depFac {
  font-size: 2vh;
}
span {
  font-size: 2.1vh;
  line-height: 1.5;
}
.button {
  display: block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: white;
  text-align: center;
  font-size: 15px;
  padding: 15px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 10px;
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
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.button:hover span {
  padding-right: 25px;
}
.button:hover span:after {
  opacity: 1;
  right: 0;
}
.box {
  border-style: solid;
  border-width: 0;
  border-left-width: 0px;
}
.btn-link {
  color: #ec7663 !important;
  font-weight: bold !important;
  font-size: 1vw !important;
}

.dropdown-item h5 {
  color: #ec7663;
}

.sidebar {
  position: fixed;
  top: 30px;
  left: 10px;
  max-width: 230px;
  font-size: 18px;
}

.menu-item {
  margin-bottom: 20px;
}

.menu-item a {
  cursor: pointer;
}

.menu {
  padding: 0;
  list-style: none;
}

.customActive {
  color: #178ce6;
  border-left: 1px solid #178ce6;
  padding-left: 5px;
  transition: all 0.5s;
}

#navlink {
  text-decoration: none;
  display: block;
  padding: 0.125rem 0;
  color: #ccc;
  transition: all 50ms ease-in-out;
}

#navlink:hover,
#navlink:focus {
  color: #666;
}

.section-nav li.active > #navlink {
  color: #333;
  font-weight: 500;
}
</style>
<style lang="scss">
.disabledTab {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>