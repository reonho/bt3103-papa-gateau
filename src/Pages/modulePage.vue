<template>
  <div id="modulePage">
    <title>{{Modules[0].moduleCode}} - {{Modules[0].title}}</title>
    <div style="color:orangered; margin-left: 20px; margin-top:20px" class="header">
      <b>{{Modules[0].moduleCode}} - {{Modules[0].title}}</b>
    </div>
    <button
      class="button"
      style="float: right; margin-right: 20px"
      onclick="window.location.href = #"
    >
      <span>Back To All Modules</span>
    </button>
    <div
      style="color: rgb(104, 104, 104); margin-left: 22px; padding-top: 10px"
      class="depFac"
    >{{Modules[0].department}} • {{Modules[0].faculty}} • {{Modules[0].moduleCredit}} MCs</div>
    <div
      style="color: rgb(104, 104, 104); margin-left: 22px; padding-top: 5px"
      class="depFac"
    >Semester 1 • Semester 2</div>
    <hr />
    <div style="margin-left: 20px; margin-right:20px;font-size:15px">
      {{Modules[0].description}}
      <br />
      <br />
      <b>Preclusion(s)</b>
      <br />
      {{Modules[0].preclusion}}
      <br />
      <br />
      <b>Prerequisite(s)</b>
      <br />
      {{Modules[0].prerequisite}}
    </div>
    <hr />
    <div id="statistics">
      <span style="color:orangered; margin-left: 20px; margin-top:20px; font-size: 25px">Statistics</span>
      <div id="container">
        <div class="row">
          <div class="col-4 well" style = "margin-left: 20px;">
            <div class="small">
              <pie-chart :chart-data="datacollection" :options="chartOptions"></pie-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div style="color:orangered; margin-left: 20px; margin-top:20px; font-size: 25px">
      Reviews
      <a
        class="btn btn-primary btn-lg mr-4"
        style="color: white; font-size: 15px; float:right"
        href="/#/review"
        id="addReview"
      >New Review</a>
    </div>
    <br />
    <div class="well ml-4 mr-4" style="padding-bottom:0">
        <div class="row">
          <div class="col-lg-4 col-sm-7" style="color: #309ad8">
            <p>
              <b>Faculty:</b>
            </p>
          </div>
          <div class="col-lg-8 col-sm-5" style="float:right">
            <p>School of Computing</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-7" style="color: #309ad8">
            <p>
              <b>How manageable is the module?</b>
            </p>
          </div>
          <div class="col-lg-8 col-sm-5" style="float:right">
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
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-7" style="color: #309ad8">
            <p>
              <b>How easy is the module?</b>
            </p>
          </div>
          <div class="col-lg-8 col-sm-5" style="float:right">
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
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-7" style="color: #309ad8">
            <p>
              <b>How likely will you recommend the module?</b>
            </p>
          </div>
          <div class="col-lg-8 col-sm-5" style="float:right">
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
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-sm-7" style="color: #309ad8">
            <p>
              <b>Other Comments:</b>
            </p>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="card-body">This module is very interesting and the prof is pretty cool.</div>
        </div>
        <h5 style = "text-align: right">Posted on 2019-10-02</h5>
      </div>
  </div>
</template>

<script>
import DataObject from "../Database.js";
import PieChart from "../PieChart.js";

export default {
  components: {
    PieChart
  },
  data: () => ({
    Modules: DataObject.Modules,
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
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
          label: "Data One",
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)"
          ],
          data: [10, 5, 3]
        }
      ]
    }
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
.small {
  text-align: center;
  margin: 0 auto 0 auto;
}
</style>