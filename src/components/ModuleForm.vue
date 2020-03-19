<template>
  <md-card>
    <form>
    <md-card-content>
      <md-field>
      <label>Your Module</label>
      <md-autocomplete v-model="detailsForm.selectedModule" :md-options="searchlist" @md-changed="getModules" 
              @md-opened="getModules"></md-autocomplete>
        

        <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
        <span
          class="md-error"
          v-if="!$v.detailsForm.selectedModule.required"
        >This field is required</span>
      </md-field>


      <md-field :class="getValidationClass('detailsForm', 'selectedFaculty')">
        <label>Your faculty</label>
        <md-select v-model="detailsForm.selectedFaculty">
          <md-option
            v-for="fac in faculties"
            v-bind:key="fac.id"
            v-bind:value="fac.title"
          >{{fac.title}}</md-option>
        </md-select>
        <span
          class="md-error"
          v-if="!$v.detailsForm.selectedFaculty.required"
        >This field is required</span>
      </md-field>
      <md-field :class="getValidationClass('detailsForm', 'selectedSemester')">
        <label>Semester taken</label>
        <md-select v-model="detailsForm.selectedSemester">
          <md-option
            v-for="sem in semesters"
            v-bind:key="sem.id"
            v-bind:value="sem.title"
          >{{sem.title}}</md-option>
        </md-select>
        <span
          class="md-error"
          v-if="!$v.detailsForm.selectedSemester.required"
        >This field is required</span>
      </md-field>

      <md-field :class="getValidationClass('detailsForm', 'selectedStaff')">
        <label>Taught by</label>
        <md-select v-model="detailsForm.selectedStaff">
          <md-option v-for="s in staff" v-bind:key="s.id" v-bind:value="s.name">{{s.name}}</md-option>
        </md-select>
        <span class="md-error" v-if="!$v.detailsForm.selectedStaff.required">This field is required</span>
      </md-field>

      <md-field :class="getValidationClass('detailsForm', 'selectedGrade')">
        <label>Grade obtained</label>
        <md-select v-model="detailsForm.selectedGrade">
          <md-option v-for="g in grades" v-bind:key="g.id" v-bind:value="g.title">{{g.title}}</md-option>
        </md-select>
        <span class="md-error" v-if="!$v.detailsForm.selectedGrade.required">This field is required</span>
      </md-field>

      <md-card-actions class="md-layout md-alignment-center">
        <md-button
          class="md-primary md-raised"
          type="submit"
          v-on:click.prevent="submitForm"
          >Submit</md-button>
        <!-- <md-dialog :md-active.sync="showModal">
          <FollowUpModal/>
        </md-dialog> -->
        
      </md-card-actions>
    </md-card-content>
    </form>
  </md-card>
</template>

<script>
import DataObject from "../Database.js";
// import FollowUpModal from "./FollowUpModal.vue"
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "ModuleForm",
  props: {
    msg: String
  },
  components: {
    // FollowUpModal
  },
  data: function() {
    return {
      showModal: false,
      searchlist: [],
      modules: DataObject.Modules,
      faculties: DataObject.faculties,
      staff: DataObject.staff,
      grades: DataObject.grades,
      semesters: DataObject.semesters,
      submitStatus: null,
      detailsForm: {
        selectedModule: null,
        selectedSemester: null,
        selectedStaff: null,
        selectedGrade: null,
        selectedFaculty: null,
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    detailsForm: {
      selectedModule: {
        required
      },
      selectedSemester: {
        required
      },
      selectedStaff: {
        required
      },
      selectedGrade: {
        required
      },
      selectedFaculty: {
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
        this.$root.$emit('closeModal');

      }

      
      
    },
    getModules (searchTerm) {
        this.searchlist = new Promise(resolve => {
          window.setTimeout(() => {
            if (!searchTerm) {
              resolve(this.modules)
            } else {
              const term = searchTerm.toLowerCase()
              

              resolve(this.modules.filter(({ Name }) => Name.toLowerCase().includes(term)))
            }
          }, 500)
        })
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