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
    <hr/>
    <div style="color:orangered; margin-left: 20px; margin-top:20px; font-size: 25px">Reviews<a class="btn btn-primary btn-lg mr-4" style="color: white; font-size: 15px; float:right" href="/#/review" id="addReview">New Review</a></div>
    <br>
    <div class = "panel panel-default ml-4 mr-4">
      <div class = "card-body">
        <p><span style = "color: #309ad8"><b>Faculty:</b></span> School of Computing</p>
        <p><span style = "color: #309ad8"><b>How manageable is the module?:</b></span> <span style = 'color: gold;' class = 'star'><i class = "fa fa-star"></i><i class = "fa fa-star"></i><i class = "fa fa-star"></i></span><span style = 'color: lightgrey;' class = 'star'><i class = "fa fa-star"></i><i class = "fa fa-star"></i></span></p>
        <p><span style = "color: #309ad8"><b>How easy is the module?:</b></span> <span style = 'color: gold;' class = 'star'><i class = "fa fa-star"></i><i class = "fa fa-star"></i><i class = "fa fa-star"></i><i class = "fa fa-star"></i></span><span style = 'color: lightgrey;' class = 'star'><i class = "fa fa-star"></i></span></p>
        <p><span style = "color: #309ad8"><b>How likely will you recommend the module?:</b></span> <span style = 'color: gold;' class = 'star'><i class = "fa fa-star"></i><i class = "fa fa-star"></i><i class = "fa fa-star"></i><i class = "fa fa-star"></i></span><span style = 'color: lightgrey;' class = 'star'><i class = "fa fa-star"></i></span></p>
        <p><span style = "color: #309ad8"><b>Comments:</b></span></p>
        <div class = "panel panel-default">
          <div class = "card-body">
            This module is very interesting and the prof is pretty cool.
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataObject from "../Database.js";
export default {
  data: () => ({
    Modules: DataObject.Modules
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
  margin: 5px;
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
</style>