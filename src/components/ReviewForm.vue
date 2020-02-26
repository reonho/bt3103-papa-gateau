/* eslint eqeqeq: "off", curly: "error" */
<template>
  <form @submit.prevent='submitForm'>
    <md-steppers md-alternative md-linear :md-active-step.sync:="active">
      <md-step id="first" md-label="Basic Details" :md-done.sync="first">
        <md-card>
          <md-card-content>
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
              <span
                class="md-error"
                v-if="!$v.detailsForm.selectedStaff.required"
              >This field is required</span>
            </md-field>

            <md-field :class="getValidationClass('detailsForm', 'selectedGrade')">
              <label>Grade obtained</label>
              <md-select v-model="detailsForm.selectedGrade">
                <md-option v-for="g in grades" v-bind:key="g.id" v-bind:value="g.title">{{g.title}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.detailsForm.selectedGrade.required">This field is required</span>
            </md-field>

            <md-card-actions class="md-layout md-alignment-center">
              <md-button class="md-accent md-raised" href = '/#/module'>Cancel</md-button>
              <md-button class="md-primary md-raised" type="submit" v-on:click.prevent="goNext('detailsForm', 'first', 'second')">Next</md-button>
            </md-card-actions>
          </md-card-content>
        </md-card>
      </md-step>

      <md-step id="second" md-label="Lectures" :md-done.sync="second">
        <md-card>
          <md-card-content>
            <label class="md-subheading">
              <b>The lecture material was well-organised and useful for understanding the module content.</b>
            </label>
            <br />
            <div>
              <md-radio v-model.lazy="lectureForm.lectureMaterial" class="md-primary" value="sd">Strongly Disagree</md-radio>
              <md-radio v-model.lazy="lectureForm.lectureMaterial" class="md-primary" value="disagree">Disagree</md-radio>
              <md-radio v-model.lazy="lectureForm.lectureMaterial" class="md-primary" value="agree">Agree</md-radio>
              <md-radio v-model.lazy="lectureForm.lectureMaterial" class="md-primary" value="sa">Strongly Agree</md-radio>
            </div>
          </md-card-content>
          <md-card-actions class="md-layout md-alignment-center-center">
            <md-button
              class="md-primary md-raised"
              v-on:click.prevent="goNext('lectureForm','second','third')"
            >Next</md-button>
          </md-card-actions>
        </md-card>
      </md-step>

      <md-step id="third" md-label="Tutorials" :md-done.sync="third">
        <md-card>
          <md-card-content>
            <label class="md-subheading">
              <b>The tutorial material was well-organised and useful for understanding the module content.</b>
            </label>
            <br />
            <div>
              <md-radio v-model.lazy="tutorialForm.tutorialMaterial" class="md-primary" value="sd">Strongly Disagree</md-radio>
              <md-radio v-model.lazy="tutorialForm.tutorialMaterial" class="md-primary" value="disagree">Disagree</md-radio>
              <md-radio v-model.lazy="tutorialForm.tutorialMaterial" class="md-primary" value="agree">Agree</md-radio>
              <md-radio v-model.lazy="tutorialForm.tutorialMaterial" class="md-primary" value="sa">Strongly Agree</md-radio>
            </div>
          </md-card-content>
        <md-card-actions class="md-layout md-alignment-center-center">
          <md-button class="md-primary md-raised" v-on:click.prevent="goNext('tutorialForm', 'third','fourth')">Next</md-button>
        </md-card-actions>
        </md-card>
      </md-step>

      <md-step id="fourth" md-label="Comments" :md-done.sync="fourth">
        <md-card>
          <md-card-content>
            <md-field :class="getValidationClass('commentForm', 'comments')">
              <label>Comments</label>
              <md-textarea v-model="commentForm.comments"></md-textarea>
              <span class="md-error" v-if="!$v.commentForm.comments.required">This field is required</span>
            </md-field>
          </md-card-content>
          <md-card-actions class="md-layout md-alignment-center-center">
          <md-button class="md-primary md-raised" type = 'submit'>Submit</md-button>
        </md-card-actions>
        </md-card>
      </md-step>
      
    </md-steppers>
  </form>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "ReviewForm",
  props: {
    msg: String
  },
  mixins: [validationMixin],
  validations: {
    detailsForm: {
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
    },

    lectureForm: {
      lectureMaterial: {
        required
      }
    },
    tutorialForm: {
      tutorialMaterial: {
        required
      }
    },
    commentForm: {
      comments: {
        required
      }
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = "OK";
        // this.setDone("first", "second");
        console.log("form submitted!");
      } else {
        this.submitStatus = "INVALID";
        console.log("form invalid");
      }
    },
    goNext(formName, currStep, nextStep) {
      this.$v[formName].$touch();
      if (!this.$v[formName].$invalid) {
        this.setDone(currStep, nextStep);
      }
    },
    getValidationClass(formName, fieldName) {
      const field = this.$v[formName][fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    setDone(id, index) {
      this[id] = true;

      //this.secondStepError = null;

      if (index) {
        this.active = index;
      }
    }
  },
  data: () => ({
    detailsForm: {
      selectedSemester: null,
      selectedStaff: null,
      selectedGrade: null,
      selectedFaculty: null
    },
    lectureForm: {
      lectureMaterial: 'agree'
    },
    tutorialForm: {
      tutorialMaterial: 'agree'
    },
    commentForm: {
      comments: null
    },

    submitStatus: null,
    errors: false,
    formTouched: false,
    active: "first",
    first: false,
    second: false,
    third: false,
    fourth: false,

    faculties: [
      {
        id: 1,
        title: "Arts & Social Sciences"
      },
      {
        id: 2,
        title: "Business"
      },
      {
        id: 3,
        title: "Computing"
      },
      {
        id: 4,
        title: "Continuing and Lifelong Education"
      },
      {
        id: 5,
        title: "Dentistry"
      },
      {
        id: 6,
        title: "Design & Environment"
      },
      {
        id: 7,
        title: "Engineering"
      },
      {
        id: 8,
        title: "Interactive Sciences & Engineering"
      },
      {
        id: 9,
        title: "Law"
      },
      {
        id: 10,
        title: "Medicine"
      },
      {
        id: 11,
        title: "Music"
      },
      {
        id: 12,
        title: "Public Health"
      },
      {
        id: 13,
        title: "Public Policy"
      },
      {
        id: 14,
        title: "Science"
      }
    ],

    semesters: [
      {
        id: 1,
        title: "AY1819 Semester 2"
      },
      {
        id: 2,
        title: "AY1819 Semester 1"
      }
    ],
    staff: [
      {
        id: 1,
        name: "Leong Wai Kay"
      },
      {
        id: 2,
        name: "Ben Leong"
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
    ]
  })
};
</script>

