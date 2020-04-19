<template>
  <div>
    <NavBar />
    <div id="modulePage" style="margin-left:15vw;margin-right:15vw;margin-top:5vh">
      <title id="details">{{this.Modules[0].info.moduleCode}} - {{this.Modules[0].info.title}}</title>
      <div style="color:#EC7663; margin-left: 20px; margin-top:20px" class="header">
        <b>{{this.Modules[0].info.moduleCode}} - {{this.Modules[0].info.title}}</b>
      </div>

      <div
        style="color: #616a6b; margin-left: 22px; padding-top: 10px"
        class="depFac"
      ><p>{{this.Modules[0].info.department}} • {{this.Modules[0].info.faculty}} • {{this.Modules[0].info.moduleCredit}} MCs</p></div>
      <div
        style="color: #616a6b; margin-left: 22px; padding-top: 5px"
        class="depFac"
      >{{showsem(this.Modules[0].info.semesterData)}}</div>
      <hr />
      <div style="margin-left: 20px; margin-right:20px;font-size:2vh">
        <p>{{this.Modules[0].info.description}}</p>
        <br />
        <br />
        <div class="row">
          <div class="col-5" style="text-align:left">
            <div v-show="showPreclusions(this.Modules[0].info.preclusion)">
            <b style="color: #616a6b">Preclusion(s)</b>
            <br />
            <p>{{this.Modules[0].info.preclusion}}</p>
            <br />
            <br />
            </div>
            <div v-show="showPrereq(this.Modules[0].info.prerequisite)">
            <b style="color: #616a6b">Prerequisite(s)</b>
            <br />
            <p>{{this.Modules[0].info.prerequisite}}</p>
            <br />
            <br />
            <b style="color: #616a6b">Exam</b>
            <br /><p>28-Nov-2019 5:00 PM • 2 hours</p>
            </div>
          </div>
          <div class="col-7">
            <b style="color: #616a6b">Workload - {{calcwork(this.Modules[0]) + " hours"}}</b>
            <workloadchart :seriesStats="formatwork(this.Modules[0].info.workload)"></workloadchart>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div class="sub-contain-div2">
          <div class="sub-header-content">
            <div class="sub-header-title" style="padding-bottom:8vh;">STRENGTHS</div>
            <RadarChart
              v-if="typeof myAttCheck == 'string' && typeof topAttCheck == 'string' "
              :my_attr="topAttributes"
              :fac_attr="myAttributes"
              type="Module"
              label_1="Top Student Attributes"
              label_2="My Attributes"
            ></RadarChart>
            <RadarChart
              v-if="typeof myAttCheck === 'boolean' && typeof topAttCheck === 'string' "
              :my_attr="topAttributes"
              :fac_attr="null"
              type="Module"
              label_1="Top Student Attributes"
              label_2="My Attributes"
            ></RadarChart>
            <md-empty-state
              v-if="typeof myAttcheck === 'boolean' && typeof topAttCheck === 'boolean'"
              md-description='There is insufficient data for this module.'
              md-icon='assessment'
              md-label='Insufficient Data'
            />
          </div>
        </div>
      </div>
      <div id="statistics">
        <span style="color:#EC7663; margin-top:20px; font-size: 3vh">Statistics</span>
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
            v-for="sem in checksemester(this.Modules[0])"
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
                      <h4 style="padding-top: 10px;color:#616a6b; font-size:2.5vh">Student reviews</h4>
                      <p v-if="ratings != 0">
                        <span
                          v-for="n in numWholeStars(overallRating)"
                          :key="n"
                          style="color: gold;font-size:16px;"
                          class="star"
                          id="avg_gold_stars"
                        >
                          <i class="fa fa-star"></i>
                        </span>
                        <span
                          v-for="n in numHalfStars(overallRating)"
                          :key="n"
                          style="color: gold;font-size:16px;"
                          class="star"
                          id="avg_gold_stars_half"
                        >
                          <i class="fas fa-star-half-alt"></i>
                        </span>
                        <span
                          v-for="n in (5 - numWholeStars(overallRating) - numHalfStars(overallRating))"
                          :key="n"
                          style="color: lightgrey;font-size:16px;"
                          class="star"
                          id="avg_grey_stars"
                        >
                          <i class="fa fa-star"></i>
                        </span>
                        <span style="padding:8px;">{{ overallRating }} out of 5</span>
                      </p>
                      <h5 style="font-weight:400">
                        {{ratings}}
                        <span v-if="ratings > 1">student ratings</span>
                        <span v-else>student rating</span>
                      </h5>
                      <bar-chart :semester="chosenSem" :code="code" :years="yrs" :loading="loading"></bar-chart>
                    </div>
                    <div class="col-7">
                      <div v-show="loading"></div>
                      <div v-show="showEmpty"></div>
                      <div v-show="!loading&&!showEmpty" v-if="ratings != 0">
                        <h4
                          style="padding-top: 10px;color:#616a6b; padding-bottom:10px;font-size:2.5vh"
                        >Features</h4>
                        <div class="row">
                          <div class="col-6">
                            <p style="font-weight:400; font-size:1.5vh">Easy to understand</p>
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
                              <span style="padding:10px;font-size: 12px" id="easy">{{ easy }}</span>
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <p style="font-weight:400; font-size:1.5vh">Manageable assignments</p>
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
                                style="padding:10px;font-size: 12px"
                                id="manageable"
                              >{{ manag_asgn }}</span>
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <p style="font-weight:400; font-size:1.5vh">Manageable exams</p>
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
                              <span style="padding:10px;font-size: 12px" id="exam">{{ manag_exam }}</span>
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <p style="font-weight:400; font-size:1.5vh">Manageable workload</p>
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
                                style="padding:10px;font-size: 12px"
                                id="workload"
                              >{{ manag_wkld }}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <br />

                      <div v-show="!loading && !(findYears.length == 0)">
                        <h4 style="padding-top: 10px;color:#0B5345; font-size:2.5vh">Filter by Year</h4>

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
                            >AY 1920</md-option>
                            <md-option
                              v-if="findYears.includes('AY1819')"
                              value="AY1819"
                              v-bind:class="{'disabledTab': loading,  '': !loading }"
                            >AY 1819</md-option>
                            <md-option
                              v-if="findYears.includes('AY1718')"
                              value="AY1718"
                              v-bind:class="{'disabledTab': loading,  '': !loading }"
                            >AY 1718</md-option>
                            <md-option
                              v-if="findYears.includes('AY1617')"
                              value="AY1617"
                              v-bind:class="{'disabledTab': loading,  '': !loading }"
                            >AY 1617</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>

                <div style="width: 100vw;" v-show="loading">
                  <md-empty-state
                    id="statebox"
                    style="max-width:0 !important; margin-top:-2vw; margin-bottom:5vw;color: #2e4053;"
                    md-label="Loading..."
                  >
                    <br />
                    <ScaleLoader :loading="loading" :color="color" :size="size"></ScaleLoader>
                  </md-empty-state>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <hr />
      <!-- First query if user has already written a review for the module, if yes then show a dialog else navigate to review page. Should pass module code here -->
      <div id="reviews" style="color:#EC7663; margin-left: 20px; margin-top:20px; font-size: 3vh">
        Reviews
        <a
          class="btn btn-primary btn-lg mr-4"
          style="color: white; font-size:1.9vh; float:right; background-color:teal; border-color:teal"
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
        <md-dialog-alert
          :md-active.sync="showAddDialog"
          md-content="Please add the module first before writing a review."
          md-confirm-text="Okay"
          md-title="Module not added"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../PieChart.js";
import BarChart from "../BarChart.js";
import WorkloadChartForMod from "../components/WorkloadChartForMod";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
// import ReviewCardForMod from "../components/ReviewCardForMod";
import NavBar from "../components/NavBar";
import database from "../firebase";
import ReviewSection from "../components/ReviewSection";
import RadarChart from "../components/RadarChart";
export default {
  props: {
    code: String
  },
  components: {
    PieChart,
    BarChart,
    workloadchart: WorkloadChartForMod,
    RadarChart,
    ScaleLoader,
    // reviewcard: ReviewCardForMod,
    NavBar,
    ReviewSection
  },
  computed: {
    showEmpty: function() {
      return this.ratings == 0;
    },
    findYears: function() {
      var years = [];
      for (var docu in this.reviewData) {
        let sem = this.reviewData[docu].detailsForm.selectedSemester
        console.log(sem)
        if (!years.includes(this.reviewData[docu].detailsForm.selectedYear) && (sem == ("Semester " + (this.chosenSem + 1)) ||
                  sem == ("Special Term " + (this.chosenSem - 1)))) {
          years.push(this.reviewData[docu].detailsForm.selectedYear)
        }
      }
      return years;
    }
  },
  methods: {
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
                  params: { mod: this.Modules[0].info.moduleCode }
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
      return semesters;
    },
    showsem(sem) {
      var totalsems = "";
      var num = sem.length;
      for (var i = 0; i < num; i++) {
        var semesters = [
          "Semester 1",
          "Semester 2",
          "Special Term I",
          "Special Term II"
        ];
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
    },
    showPreclusions(val) {
      console.log(val)
      if (val != null) {
        return true;
      }
      return false;
    },
    showPrereq(val) {
      if (val != null) {
        return true;
      }
      return false;
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
          console.log(this.reviewData);
        });
      });
    //get module details
    database.getModules(this.code).then(item => {
      this.Modules.push(item);
    });
    database.firebase_data
      .collection("students")
      .doc(database.user)
      .get()
      .then(user => {
        var userData = user.data();
        this.myAttributes = userData.attributes;
        console.log(typeof this.myAttCheck);
        this.myAttCheck = userData.attributes[0].att;
        console.log("Check myAtt");
      });

    database.getModuleAttributes(this.code).then(ma => {
      console.log(ma);
      this.topAttributes = ma;
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      var self = this;
      async function check(self) {
        console.log(typeof ma[0]);
        while (typeof ma[0] == "undefined") {
          await sleep(2000);
          console.log(typeof ma[0]);
        }
        self.topAttCheck = ma[0].att;
      }
      check(self);
    });

    //Query attributes of top scorers
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
    Modules: []
  }),
  watch: {
    yrs: function() {
      this.$root.$on("showValues", this.showValues);
    },
    chosenSem: function() {
      this.shortload(900);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~vue-material/src/theme/engine";
p {
   font-size: 1.8vh;
  line-height: 1.5;
}
.header {
  padding: 1vh;
  padding-left: 0;
  font-size: 3.5vh;
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
.section-header {
  color: #ec7663;
  margin-top: 20px;
  font-size: 25px;
  font-size: 1.9vw;
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
</style>
<style lang="scss">
.disabledTab {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>

