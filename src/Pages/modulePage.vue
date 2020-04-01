<template>
  <div>
    <NavBar />
    <div id="modulePage" style="margin-left:15vw;margin-right:15vw;margin-top:5vh">
      <title id="details">{{this.Modules[0].info.moduleCode}} - {{this.Modules[0].info.title}}</title>
      <div style="color:#0B5345; margin-left: 20px; margin-top:20px" class="header">
        <b>{{this.Modules[0].info.moduleCode}} - {{this.Modules[0].info.title}}</b>
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
      >{{this.Modules[0].info.department}} • {{this.Modules[0].info.faculty}} • {{this.Modules[0].info.moduleCredit}} MCs</div>
      <div
        style="color: #616a6b; margin-left: 22px; padding-top: 5px"
        class="depFac"
      >{{showsem(this.Modules[0].info.semesterData)}}</div>
      <hr />
      <div style="margin-left: 20px; margin-right:20px;font-size:15px">
        {{this.Modules[0].info.description}}
        <br />
        <br />
        <div class="row">
          <div class="col-5" style="text-align:left">
            <b style="color: #616a6b">Preclusion(s)</b>
            <br />
            {{this.Modules[0].info.preclusion}}
            <br />
            <br />
            <b style="color: #616a6b">Prerequisite(s)</b>
            <br />
            {{this.Modules[0].info.prerequisite}}
            <br />
            <br />
            <b style="color: #616a6b">Exam</b>
            <br />28-Nov-2019 5:00 PM • 2 hours
          </div>
          <div class="col-7">
            <b style="color: #616a6b">Workload - {{calcwork(this.Modules[0]) + " hours"}}</b>
            <workloadchart :seriesStats="formatwork(this.Modules[0].info.workload)"></workloadchart>
          </div>
        </div>
      </div>
      <hr />
      <div id="statistics">
        <span style="color:#0B5345; margin-top:20px; font-size: 25px">Statistics</span>
        <br />
        <br />
        <b-tabs
          active-nav-item-class="activetab"
          class="semtabs"
          content-class="mt-3"
          no-fade="false"
          lazy
        >
          <b-tab
            v-for="sem in checkSemester(this.Modules[0].info.semesterData)"
            v-bind:key="sem.index"
            :title="sem.semester"
            :title-link-class="sem.disabled"
          >
            <div id="container">
              <div class="row">
                <div class="col-4">
                  <pie-chart :chart-data="datacollection" :options="chartOptions"></pie-chart>
                </div>
                <div class="col-8 box">
                  <div class="row">
                    <div class="col-5">
                      <h3 style="padding-top: 10px;color:#0B5345">Student reviews</h3>
                      <p>
                        <span style="color: gold;font-size:16px;" class="star">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-half-alt"></i>
                        </span>
                        <span style="padding:10px;font-size: 15px">4.4 out of 5</span>
                      </p>
                      <h5 style="font-weight:400">10 student ratings</h5>
                      <bar-chart :chart-data="datacollection1" :options="chartOptions1"></bar-chart>
                    </div>
                    <div class="col-7">
                      <h4 style="padding-top: 10px;color:#0B5345">Features</h4>
                      <div class="row">
                        <div class="col-6">
                          <p style="font-weight:400; font-size:12px">Easy to understand</p>
                        </div>
                        <div class="col-6" style="float:right">
                          <p>
                            <span style="color: gold;" class="star">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </span>
                            <span style="color: lightgrey;" class="star">
                              <i class="fa fa-star"></i>
                            </span>
                            <span style="padding:10px;font-size: 12px">4.0</span>
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <p style="font-weight:400; font-size:12px">Manageable workload</p>
                        </div>
                        <div class="col-6" style="float:right">
                          <p>
                            <span style="color: gold;" class="star">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </span>
                            <span style="color: lightgrey;" class="star">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </span>
                            <span style="padding:10px;font-size: 12px">2.9</span>
                          </p>
                        </div>
                      </div>
                      <br />
                      <intakechart :seriesStats="seriesStats"></intakechart>
                    </div>
                  </div>
                  <br />
                  <intakechart :seriesStats="seriesStats"></intakechart>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <hr />
      <!-- First query if user has already written a review for the module, if yes then show a dialog else navigate to review page. Should pass module code here -->
      <div id="reviews" style="color:#0B5345; margin-left: 20px; margin-top:20px; font-size: 25px">
        Reviews
        <a
          class="btn btn-primary btn-lg mr-4"
          style="color: white; font-size: 15px; float:right"
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
        <ReviewSection
          :reviewData="reviewData"
        />
        <md-dialog-alert
          :md-active.sync="showDialog"
          md-content="You have already submitted a review for this module."
          md-confirm-text="Okay"
          md-title="Review already exists"
        />
      </div>
    </div>
  </div>
</template>

<script>
//import DataObject from "../Database.js";
import PieChart from "../PieChart.js";
import BarChart from "../BarChart.js";
import StudentIntakeChart from "../components/StudentIntakeChart";
import WorkloadChartForMod from "../components/WorkloadChartForMod";
// import ReviewCardForMod from "../components/ReviewCardForMod";
import NavBar from "../components/NavBar";
import database from "../firebase";
import ReviewSection from "../components/ReviewSection";
export default {
  props: {
    code: String
  },
  components: {
    PieChart,
    BarChart,
    intakechart: StudentIntakeChart,
    workloadchart: WorkloadChartForMod,
    // reviewcard: ReviewCardForMod,
    NavBar,
    ReviewSection
  },
  methods: {
    review() {
      //prevents user from submitting multiple reviews
      // database.getUser().then(user => {
      //   database
      //     .ifAddedModule(this.Modules[0].info.moduleCode, user)
      //     .then(mod => {
      //       if (mod === null) {
      //         this.$router.push({
      //           name: "ReviewForm",
      //           params: { mod: this.Modules[0].info.moduleCode }
      //         });
      //       } else {
      //         this.showDialog = true
      //       }
      //     });
      this.$router.push({
        name: "ReviewForm",
        params: { mod: this.Modules[0].info.moduleCode }
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
    },
    showsem(sem) {
      var totalsems = "";
      var num = sem.length;
      for (var i = 0; i < num; i++) {
        var semesters = [
          { semester: "Semester 1", disabled: "disabledTab" },
          { semester: "Semester 2", disabled: "disabledTab" },
          { semester: "Special Term I", disabled: "disabledTab" },
          { semester: "Special Term II", disabled: "disabledTab" }
        ];
        if (sem[i].semester == 3) {
          totalsems += semesters[2].semester + " • ";
        } else if (sem[i].semester == 4) {
          totalsems += semesters[3].semester + " • ";
        } else if (sem[i].semester == 2) {
          totalsems += semesters[1].semester + " • ";
        } else {
          totalsems += semesters[0].semester + " • ";
        }
      }
      return totalsems.slice(0, -3);
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
      return "No Exam";
    },
    formatDur: function(duration) {
      if (duration !== 0) {
        return " | " + duration + " hours";
      } else {
        return "";
      }
    },
    calcwork(arr) {
      arr = arr.info.workload;
      var num = 0;
      for (var i = 0; i < arr.length; i++) {
        num = num + arr[i];
      }
      return num;
    }
  },
  created() {
    //replace this with a query by module code
    console.log("created");
    console.log(this.code);
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
          // console.log(doc.id)
        });
        console.log(this.reviewData)
      });
    //get module details
    database.getModules(this.code).then(item => {
      this.Modules.push(item);
    });
  },
  data: () => ({
    showDialog: false,
    totalsems: "",
    reviewData: [],
    infodes: null,
    module_code: "", //testing purposes, replace with passed module code
    seriesStats: [
      {
        name: "Intake",
        data: [150, 210, 186, 195]
      }
    ],
    Modules: [],
    chartOptions: {
      title: {
        display: true,
        text: "Faculties",
        padding: 5
      },
      legend: {
        position: "bottom",
        fullWidth: true
      }
    },
    datacollection: {
      labels: ["Computing", "Science", "Arts and Social Sciences"],
      datasets: [
        {
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)"
          ],
          data: [10, 5, 3]
        }
      ]
    },
    chartOptions1: {
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              display: true
            },
            gridLines: {
              display: true
            }
          }
        ]
      },
      legend: {
        display: false
      }
    },
    datacollection1: {
      labels: ["5 star", "4 star", "3 star", "2 star", "1 star"],
      datasets: [
        {
          label: "Number of votes",
          backgroundColor: "rgba(255,99,132, 0.5)",
          data: [3, 5, 1, 2, 2]
        }
      ]
    }
  })
};
// archive
// <div id="reviews" style="color:#0B5345; margin-top:20px; font-size: 25px">
//         Reviews
//         <a
//           class="btn btn-primary btn-lg mr-4"
//           style="color: white; font-size: 15px; float:right"
//           href="/#/review"
//           id="addReview"
//         >New Review</a>
//         <b-dropdown
//           size="lg"
//           variant="link"
//           toggle-class="text-decoration-none"
//           style="float:right"
//           no-caret
//         >
//           <template v-slot:button-content>Sort by Newest &#9662;</template>
//           <b-dropdown-item href="#">
//             <h5>Best</h5>
//           </b-dropdown-item>
//           <b-dropdown-item href="#">
//             <h5>Newest</h5>
//           </b-dropdown-item>
//           <b-dropdown-item href="#">
//             <h5>Oldest</h5>
//           </b-dropdown-item>
//         </b-dropdown>
//       </div>
//       <br />
//       <div>
//         <reviewcard :review="reviewData" />
//       </div>
//       <hr />
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
