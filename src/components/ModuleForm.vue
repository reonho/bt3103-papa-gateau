<template>
  <div>
    <form>
    
      <md-field :class="getValidationClass('detailsForm', 'selectedModule')">
        <label>Your Module</label>
        <md-input v-model="detailsForm.selectedModule">
          
        </md-input>
        <span
          class="md-error"
          v-if="!$v.detailsForm.selectedModule.required"
        >This field is required</span>
      </md-field>

      <md-field :class="getValidationClass('detailsForm', 'selectedGrade')">
        <label>Grade obtained</label>
        <md-select v-model="detailsForm.selectedGrade">
          <md-option v-for="g in grades" v-bind:key="g.id" v-bind:value="g.title">{{g.title}}</md-option>
        </md-select>
        <span class="md-error" v-if="!$v.detailsForm.selectedGrade.required">This field is required</span>
      </md-field>

      <md-field :class="getValidationClass('detailsForm', 'selectedSU')">
        <label>Used SU Option</label>
        <md-select v-model="detailsForm.selectedSU">
          <md-option v-for="S in SU" v-bind:key="S.id" v-bind:value="S.title">{{S.title}}</md-option>
        </md-select>
        <span class="md-error" v-if="!$v.detailsForm.selectedSU.required">This field is required</span>
      </md-field>

      <md-card-actions class="md-layout md-alignment-center">
        <md-button
          class="md-primary md-raised"
          type="submit"
          v-on:click.prevent="submitForm"
          >Submit</md-button>
        
      </md-card-actions>
    
    </form>
  </div>
</template>

<script>
// import FollowUpModal from "./FollowUpModal.vue"
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import database from "../firebase.js"
export default {
  name: "ModuleForm",
  props: {
    //msg: String
    sem: String,
    year: String
  },
  components: {
    // FollowUpModal
  },
  data: function() {
    return {
      showModal: false,
      searchlist: [],
      Years: [{id:1, title: "AY1819"}, {id:1, title: "AY1920"}],
      modules: [
    {
     id: 1,
      Name: "CS2030",
      Faculty: "SOC",
      Prereq: ["CS1010S"],
      MCs: 4,
      Details: "This module is taught by proX"
    },
    {
      id: 2,
      Name: "MA1101R",
      Faculty: "FOS",
      Prereq: [],
      MCs: 4,
      Details: "This module is taught by proY"
    },
    {
      id: 3,
      Name: "BT2101",
      Faculty: "SOC",
      Prereq: ["MA1101R"],
      MCs: 4,
      Details: "This module is taught by proZ"
    }
  ],
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
      SU: [{id: 1,title: "Yes"},
            {id:2, title: "No"}],
      semesters: [
        {
          id: 1,
          title: "Semester 1",
          examDuration: 120
        },
        {
          id: 2,
          title:"Semester 2",
          examDate: "2020-05-05T09:00:00.000Z",
          examDuration: 120
        },
       
      ],
      submitStatus: null,
      detailsForm: {
        selectedModule: null,
        selectedSemester: this.sem,
        selectedGrade: null,
        selectedSU: null,
        selectedYear:  this.year,
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
      selectedSU:{
        required
      },
      
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
        database.addModuleResults(this.detailsForm).then(e=>{
          console.log(e)
          // create an alert saying you have already added this module
          this.$root.$emit('closeModal');

        })
       
        
      }
    }
  }
};
</script>

<style scoped>
@import "./style.css";
.md-card {
  /* overflow: scroll; */
  display:block;
  /* min-height: 180px; */
}
</style>