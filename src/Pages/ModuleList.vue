<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-5"></div>
    <div class="md-layout-item md-size-20">
      <md-content class="md-scrollbar">
        <table>
          <tr>
            <td style="width:60%; font-size:130%">Filter By :</td>
            <td style="color:red">Clear Filters</td>
          </tr>
        </table>
        <br />
        <span class="minihead">Offered in</span>

        <v-checkbox class="minicheck" label="Semester 1"></v-checkbox>
        <v-checkbox class="minicheck" label="Semester 2"></v-checkbox>
        <v-checkbox class="minicheck" label="Special Term 1"></v-checkbox>
        <v-checkbox class="minicheck" label="Special Term 2"></v-checkbox>
        <br />
        <span class="minihead">Exams</span>
        <v-checkbox class="minicheck" label="No Exam"></v-checkbox>
        <br />
        <span class="minihead">Level</span>
        <v-layout class="levelcheck" row wrap>
          <v-flex v-for="(category,index) in levels" :key="levels[index].text" xs6>
            <v-checkbox class="minicheck" light :label="category.text" v-model="category.selected"></v-checkbox>
          </v-flex>
        </v-layout>
        <br />
        <span class="minihead">MCs</span>
        <v-flex
          class="mccheck"
          v-for="(category,index) in mclevels"
          :key="mclevels[index].text"
          xs6
        >
          <v-checkbox class="minicheck" light :label="category.text" v-model="category.selected"></v-checkbox>
        </v-flex>
        <br />
        <br />
        <span class="minihead">Faculty</span>
        <md-autocomplete
          v-model="model"
          :md-options="faculties"
          md-dense
          multiple
        >
          <label>Add Faculties...</label>
        </md-autocomplete>
      </md-content>
    </div>
    <div class="md-layout-item"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levels: [
        { text: "1000", value: "1000", selected: false },
        { text: "2000", value: "2000", selected: false },
        { text: "3000", value: "3000", selected: false },
        { text: "4000", value: "4000", selected: false },
        { text: "5000", value: "5000", selected: false },
        { text: "6000", value: "6000", selected: false },
        { text: "8000", value: "8000", selected: false }
      ],
      mclevels: [
        { text: "0-3 MC", value: "0-3 MC", selected: false },
        { text: "4 MC", value: "4 MC", selected: false },
        { text: "5-8 MC", value: "5-8 MC", selected: false },
        { text: "More than 8 MC", value: "More than 8 MC", selected: false }
      ],
      model: null,
      faculties: [
        "Computing",
        "Arts & Social Science",
        "Dentistry",
        "Engineering",
        "Law",
        "NUS Buiness School"
      ],
      items: ["foo", "bar", "fizz", "buzz"]
    };
  }
};
</script>


<style lang="scss" scoped>
@import "~vue-material/src/theme/engine";

.md-layout-item {
  height: 1000px;

  &:nth-child(2) {
    background: md-get-palette-color(grey, 50);
  }
}
.md-content {
  max-width: 400px;
  max-height: 700px;
  overflow: auto;
  padding: 20px;
  font-family: Helvetica;
}
</style>
<style>
.minihead {
  font-size: 80%;
  font-weight: bold;
}
.minicheck {
  margin-top: -1px;
  height: 30px;
}
.levelcheck {
  padding: 11px;
  padding-top: 0px;
}
.flex.xs6 {
  max-width: 150% !important;
}
label.v-label.theme--light {
  margin-bottom: 0;
}
div.v-input--selection-controls__input {
  padding-right: 20px;
  padding-left: 10px;
}
</style>
