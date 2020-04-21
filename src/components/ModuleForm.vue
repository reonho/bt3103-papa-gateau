<template>
  <div>
    <form>
      <md-autocomplete
        v-model="detailsForm.selectedModule"
        :md-options="modules"
        :class="getValidationClass('detailsForm', 'selectedModule')"
      >
        <label v-show="!detailsForm.selectedModule">Search for Module</label>
        <label v-show="detailsForm.selectedModule">Module</label>
        <template slot="md-autocomplete-item" slot-scope="{ item, term }">
          <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
        </template>

        <template
          slot="md-autocomplete-empty"
          slot-scope="{ term }"
        >No Modules with "{{ term }}" were found.</template>

        <span class="md-error" v-if="!$v.detailsForm.selectedModule.required">This field is required</span>
      </md-autocomplete>
      <div class="md-layout">
        <div class="md-layout-item md-size-50">
          <md-field :class="getValidationClass('detailsForm', 'selectedGrade')">
            <label>Grade obtained</label>
            <md-select v-model="detailsForm.selectedGrade">
              <md-option v-for="g in grades" v-bind:key="g.id" v-bind:value="g.title">{{g.title}}</md-option>
            </md-select>
            <span
              class="md-error"
              v-if="!$v.detailsForm.selectedGrade.required"
            >This field is required</span>
          </md-field>
        </div>
        <div class="md-layout-item md-size-10"></div>
        <div class="md-layout-item">
          <div style="margin-top:0.5vw">
            <md-radio
              v-model="detailsForm.selectedSU"
              class="md-primary"
              style="padding-left:1vw"
              value="Yes"
            >SU</md-radio>
            <md-radio
              v-model="detailsForm.selectedSU"
              class="md-primary"
              style="padding-left:1vw"
              value="No"
            >No SU</md-radio>
          </div>
        </div>
      </div>
      <br />
      <md-card-actions class="md-layout md-alignment-center">
        <md-button class="md-primary md-raised" type="submit" v-on:click.prevent="submitForm">Submit</md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
// import FollowUpModal from "./FollowUpModal.vue"
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import database from "../firebase.js";
export default {
  name: "ModuleForm",
  props: {
    //msg: String
    sem: String,
    year: String,
    grade: String,
    code: String,
    purpose: String
  },
  components: {
    // FollowUpModal
  },
  data: function() {
    return {
      showModal: false,
      searchlist: [],
      Years: [
        { id: 1, title: "AY1819" },
        { id: 1, title: "AY1920" }
      ],
      modules: [],
      grades: [
        {
          id: 1,
          title: "A+"
        },
        {
          id: 2,
          title: "A"
        },
        {
          id: 3,
          title: "A-"
        },
        {
          id: 4,
          title: "B+"
        },
        {
          id: 5,
          title: "B"
        },
        {
          id: 6,
          title: "B-"
        },
        {
          id: 7,
          title: "C+"
        },
        {
          id: 8,
          title: "C"
        },
        {
          id: 9,
          title: "D+"
        },
        {
          id: 10,
          title: "D"
        },
        {
          id: 11,
          title: "F"
        },
        {
          id: 12,
          title: "S"
        },
        {
          id: 13,
          title: "U"
        }
      ],
      SU: [
        { id: 1, title: "Yes" },
        { id: 2, title: "No" }
      ],
      semesters: [
        {
          id: 1,
          title: "Semester 1",
          examDuration: 120
        },
        {
          id: 2,
          title: "Semester 2",
          examDate: "2020-05-05T09:00:00.000Z",
          examDuration: 120
        }
      ],
      submitStatus: null,
      detailsForm: {
        selectedModule: this.code,
        selectedSemester: this.sem,
        selectedGrade: this.grade,
        selectedSU: "No",
        selectedYear: this.year
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    detailsForm: {
      selectedModule: {
        required
      },

      selectedGrade: {
        required
      },
      selectedSU: {
        required
      }
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
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("ok");
        if (this.purpose == "Add") {
          database
            .addModuleResults(this.detailsForm)
            .then(e => {
              console.log(e);
              // create an alert saying you have already added this module

              this.$root.$emit("closeModal1");
            })
            .catch(error => {
              if (error == "Not a valid module!") {
                alert("Invalid Module");
                this.$root.$emit("closeModal2");
              }
            });
        } else {
          database.updateModuleResults(this.detailsForm).catch(error => {
            if (error == "Not a valid module!") {
              alert("Invalid Module");
              this.$root.$emit("closeModal2");
            } else {
              this.$root.$emit("closeModal1");
              alert("Module Successfully Updated!");
            }
          });
        }

        // else if(error == "module already taken!"){
        //   alert("Module already taken!");
        //   this.$root.$emit("closeModal2");
        // }
      }
    }
  },
  created() {
    //Accumulating dropdown with modules in DB

    database.firebase_data
      .collection("modules")
      .get()
      .then(querySnapShot => {
        var slookup = {};
        //Loop through each item
        querySnapShot.forEach(doc => {
          var name = doc.data().info.moduleCode + " " + doc.data().info.title;
          if (!(name in slookup)) {
            slookup[name] = 1;
            this.modules.push(doc.data().info.moduleCode);
          }
        });
      });
    console.log(this.modules);
  }
};
</script>

<style scoped>
.md-card {
  /* overflow: scroll; */
  display: block;
  /* min-height: 180px; */
}
</style>
<style lang="scss">
.md-menu-content {
  z-index: 11 !important;
}
</style>