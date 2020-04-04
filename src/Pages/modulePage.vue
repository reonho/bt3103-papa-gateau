<template>
  <div>
    <NavBar />
    <div id="modulePage" style="margin-left:15vw;margin-right:15vw;margin-top:5vh">
      <title id="details">{{Modules[0].moduleCode}} - {{Modules[0].title}}</title>
      <div style="color:#0B5345; margin-left: 20px; margin-top:20px" class="header">
        <b>{{Modules[0].moduleCode}} - {{Modules[0].title}}</b>
      </div>
      <button
        class="button"
        style="float: right; margin-right: 20px;background-color:#0B5345"
        onclick="window.location.href = '/#/ModuleList';"
      >
        <span>Back To All Modules</span>
      </button>
      <div
        style="color: #616a6b; margin-left: 22px; padding-top: 10px"
        class="depFac"
      >{{Modules[0].department}} • {{Modules[0].faculty}} • {{Modules[0].moduleCredit}} MCs</div>
      <div
        style="color: #616a6b; margin-left: 22px; padding-top: 5px"
        class="depFac"
      >Semester 1 • Semester 2 • Special Term I</div>
      <hr />
      <div style="margin-left: 20px; margin-right:20px;font-size:15px">
        {{Modules[0].description}}
        <br />
        <br />
        <div class="row">
          <div class="col-4" style="text-align:left">
            <b style="color: #616a6b">Preclusion(s)</b>
            <br />
            {{Modules[0].preclusion}}
            <br />
            <br />
            <b style="color: #616a6b">Prerequisite(s)</b>
            <br />
            {{Modules[0].prerequisite}}
            <br />
            <br />
            <b style="color: #616a6b">Exam</b>
            <br />4-Dec-2019 9:00 AM • 2 hours
          </div>
          <div class="col-8">
            <b style="color: #616a6b">Workload</b>
            <workloadchart :seriesStats="formatwork(Modules[0].workload)"></workloadchart>
          </div>
        </div>
      </div>
      <hr />
      <div id="statistics">
        <div class="row">
          <div class="col" style="color:#0B5345; margin-top:20px; font-size: 25px">Statistics</div>
        </div>
        <br />
        <br />
        <b-tabs
          active-nav-item-class="activetab"
          class="semtabs"
          v-model="chosenSem"
          content-class="mt-3"
          lazy
        >
          <b-tab
            v-for="sem in checkSemester(Modules[0].semesterData)"
            v-bind:key="sem.index"
            :title="sem.semester"
            :title-link-class="sem.disabled"
          >
            <div id="container">
              <div class="row">
                <div class="col-4">
                  <pie-chart :semester="chosenSem"></pie-chart>
                </div>
                <div class="col-8 box">
                  <div class="row">
                    <div class="col-5">
                      <h3 style="padding-top: 10px;color:#0B5345">Student reviews</h3>
                      <p>
                        <span style="color: gold;font-size:16px;" class="star" id = "avg_gold_stars">
                        </span>
                        <span style="color: lightgrey;font-size:16px;" class="star" id = "avg_grey_stars">
                        </span>
                        <span style="padding:10px;font-size: 15px">
                          <span id="avg"></span> out of 5
                        </span>
                      </p>
                      <h5 style="font-weight:400">
                        <span id="ratings"></span> student ratings
                      </h5>
                      <bar-chart :semester="chosenSem"></bar-chart>
                    </div>
                    <div class="col-7">
                      <h4 style="padding-top: 10px;color:#0B5345">Features</h4>
                      <div class="row">
                        <div class="col-6">
                          <p style="font-weight:400; font-size:12px">Easy to understand</p>
                        </div>
                        <div class="col-6" style="float:right">
                          <p>
                            <span style="color: gold;" class="star" id = "easy_gold_stars">
                            </span>
                            <span style="color: lightgrey;" class="star" id = "easy_grey_stars">
                            </span>
                            <span style="padding:10px;font-size: 12px" id="easy"></span>
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <p style="font-weight:400; font-size:12px">Manageable assignments</p>
                        </div>
                        <div class="col-6" style="float:right">
                          <p>
                            <span style="color: gold;" class="star" id = "man_gold_stars">
                            </span>
                            <span style="color: lightgrey;" class="star" id = "man_grey_stars">
                            </span>
                            <span style="padding:10px;font-size: 12px" id="manageable"></span>
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <p style="font-weight:400; font-size:12px">Manageable exams</p>
                        </div>
                        <div class="col-6" style="float:right">
                          <p>
                            <span style="color: gold;" class="star" id = "exam_gold_stars">
                            </span>
                            <span style="color: lightgrey;" class="star" id = "exam_grey_stars">
                            </span>
                            <span style="padding:10px;font-size: 12px" id = "exam"></span>
                          </p>
                        </div>
                      </div>
                      <br />
                      <h4 style="padding-top: 10px;color:#0B5345">Filter by Year</h4>
                      <md-field style="width: 20vw">
                      <label for="years">All Years Selected</label>
                      <md-select multiple name="years" id="years">
                        <md-option value="AY 1819">AY 1819</md-option>
                        <md-option value="AY 1920">AY 1920</md-option>
                      </md-select>
                    </md-field>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <hr />
      <div id="reviews" style="color:#0B5345; margin-top:20px; font-size: 25px">
        Reviews
        <a
          class="btn btn-primary btn-lg mr-4"
          style="color: white; font-size: 15px; float:right"
          href="/#/review"
          onclick="window.scrollTo(0, 0)"
          id="addReview"
        >New Review</a>
        <b-dropdown
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
          style="float:right"
          no-caret
        >
          <template v-slot:button-content>Sort by Newest &#9662;</template>
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
        <ReviewSection :review="reviewData" />
      </div>
      <hr />
      <!-- First query if user has already written a review for the module, if yes then show a dialog else navigate to review page. Should pass module code here -->
    </div>
  </div>
</template>

<script>
import DataObject from "../Database.js";
import PieChart from "../PieChart.js";
import BarChart from "../BarChart.js";
import WorkloadChartForMod from "../components/WorkloadChartForMod";
// import ReviewCardForMod from "../components/ReviewCardForMod";
import NavBar from "../components/NavBar";
import database from "../firebase";
import ReviewSection from "../components/ReviewSection";

export default {
  components: {
    PieChart,
    BarChart,
    workloadchart: WorkloadChartForMod,
    // reviewcard: ReviewCardForMod,
    NavBar,
    ReviewSection
  },
  methods: {
    numWholeStars(ele) {
      var num = 0;
      if (ele == "easy") {
        num = this.easy;
      } else if (ele == "manag") {
        num = this.manageable;
      } else {
        num = this.avg;
      }
      return Math.floor(num / 1);
    },

    formatwork(workload) {
      var series = [];
      series.push({
        name: "Workload",
        data: workload
      });
      return series;
    },

    checkSemester(arr) {
      var semesters = [
        { semester: "Semester 1", disabled: "disabledTab" },
        { semester: "Semester 2", disabled: "disabledTab" },
        { semester: "Special Term I", disabled: "disabledTab" },
        { semester: "Special Term II", disabled: "disabledTab" }
      ];
      var num = arr.length;
      for (var i = 0; i < num; i++) {
        if (arr[i].semester == 3) {
          semesters[2].disabled = "";
        } else if (arr[i].semester == 4) {
          semesters[3].disabled = "";
        } else if (arr[i].semester == 2) {
          semesters[1].disabled = "";
        } else {
          semesters[0].disabled = "";
        }
      }
      return semesters;
    }
  },

  created() {
    //replace this with a query by module code
    console.log("created");
    database.firebase_data.collection("reviews").onSnapshot(querySnapShot => {
      this.reviewData = [];
      querySnapShot.forEach(doc => {
        let item = {};
        item = doc.data();
        item.id = doc.id;
        this.reviewData.push(item);
      });
    });
  },
  data: () => ({
    avg: 0,
    manageable: 0,
    easy: 0,
    reviewData: [],
    chosenSem: 0,
    seriesStats: [
      {
        name: "Intake",
        data: [150, 210, 186, 195]
      }
    ],
    Modules: DataObject.Modules2
  })
};
</script>


<style lang="scss">
@import "~vue-material/src/theme/engine";
.header {
  font-size: 30px;
}
.depFac {
  font-size: 15px;
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
  border-left-width: 0.1px;
}

.disabledTab {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>