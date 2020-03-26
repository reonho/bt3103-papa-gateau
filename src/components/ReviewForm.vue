/* eslint-disable */
<template>
  <div class="pageBody">
    <NavBar />
    <md-dialog-confirm
      :md-active.sync="exitDialog"
      md-title="Exit review page?"
      md-content="Your review will not be saved."
      md-confirm-text="Exit"
      md-cancel-text="Cancel"
      @md-confirm = 'goback'
    />
    <div class="page">
      <div class="pageHeader">
        <md-button class="md-icon-button closeButton" v-on:click="exitDialog = true">
          <md-icon>cancel</md-icon>
        </md-button>
      </div>
      <div class="pageContent">
        <form @submit.prevent="submitForm">
          <md-steppers md-linear md-alternative :md-active-step.sync:="active">
            <md-step
              id="first"
              md-label="Basic Details"
              :md-done.sync="first"
              v-on:click.prevent="active = 'first'"
            >
              <!-- <md-card> -->
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
                    <md-option
                      v-for="g in grades"
                      v-bind:key="g.id"
                      v-bind:value="g.title"
                    >{{g.title}}</md-option>
                  </md-select>
                  <span
                    class="md-error"
                    v-if="!$v.detailsForm.selectedGrade.required"
                  >This field is required</span>
                </md-field>

                <md-card-actions class="md-layout md-alignment-center">
                  <!-- <router-link class="nav-link" to="/module">
                <md-button class="md-raised cancelbtn">Cancel</md-button>
                  </router-link>-->
                  <md-button
                    class="md-raised okaybtn"
                    type="submit"
                    v-on:click.prevent="goNext('detailsForm', 'first', 'second')"
                  >Next</md-button>
                </md-card-actions>
              </md-card-content>
              <!-- </md-card> -->
            </md-step>

            <md-step
              id="second"
              md-label="Lectures"
              :md-done.sync="second"
              v-on:click.prevent="active = 'second'"
              :md-error="lectureForm.error"
            >
              <!-- <md-card> -->
              <md-card-header
                class="md-title"
              >For the questions below, rate your experience with lectures for the module.</md-card-header>
              <md-card-content>
                <label class="md-subheading">
                  <b>The lecture material was well-organised and useful for understanding the module content.</b>
                </label>
                <br />
                <div>
                  <md-radio
                    v-model="lectureForm.lectureMaterial"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio
                    v-model="lectureForm.lectureMaterial"
                    class="md-primary"
                    value="2"
                  >Disagree</md-radio>
                  <md-radio
                    v-model="lectureForm.lectureMaterial"
                    class="md-primary"
                    value="3"
                  >Neutral</md-radio>
                  <md-radio v-model="lectureForm.lectureMaterial" class="md-primary" value="4">Agree</md-radio>
                  <md-radio
                    v-model="lectureForm.lectureMaterial"
                    class="md-primary"
                    value="5"
                  >Strongly Agree</md-radio>
                </div>
                <hr />
                <br />
                <label class="md-subheading">
                  <b>The lecturer was able to explain concepts clearly and effectively.</b>
                </label>

                <div>
                  <md-radio
                    v-model="lectureForm.clarity"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio v-model="lectureForm.clarity" class="md-primary" value="2">Disagree</md-radio>
                  <md-radio v-model="lectureForm.clarity" class="md-primary" value="3">Neutral</md-radio>
                  <md-radio v-model="lectureForm.clarity" class="md-primary" value="4">Agree</md-radio>
                  <md-radio
                    v-model="lectureForm.clarity"
                    class="md-primary"
                    value="5"
                  >Strongly Agree</md-radio>
                </div>
                <hr />
                <br />

                <md-field :class="getValidationClass('lectureForm', 'comments')">
                  <label
                    class
                  >Please write a few sentences to explain your choices for the above questions. You are encouraged to provide more details to support your claims.</label>
                  <md-textarea v-model="lectureForm.comments"></md-textarea>
                  <span
                    class="md-error"
                    v-if="!$v.lectureForm.comments.required"
                  >This field is required</span>
                </md-field>
              </md-card-content>
              <md-card-actions class="md-layout md-alignment-center-center">
                <md-button
                  class="md-raised okaybtn"
                  v-on:click.prevent="goNext('lectureForm','second','third')"
                >Next</md-button>
              </md-card-actions>
            </md-step>

            <md-step
              id="third"
              md-label="Tutorials & Assessments"
              :md-done.sync="third"
              :md-error="tutorialForm.error"
            >
              <md-card-header
                class="md-title"
              >For the questions below, rate your experience with tutorials, assignments and examinations for the module.</md-card-header>
              <md-card-content>
                <label class="md-subheading">
                  <b>The tutorial material was well-organised and useful for understanding the module content.</b>
                </label>
                <br />
                <div>
                  <md-radio
                    v-model="tutorialForm.tutorialMaterial"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio
                    v-model="tutorialForm.tutorialMaterial"
                    class="md-primary"
                    value="2"
                  >Disagree</md-radio>
                  <md-radio
                    v-model="tutorialForm.tutorialMaterial"
                    class="md-primary"
                    value="3"
                  >Neutral</md-radio>
                  <md-radio
                    v-model="tutorialForm.tutorialMaterial"
                    class="md-primary"
                    value="4"
                  >Agree</md-radio>
                  <md-radio
                    v-model="tutorialForm.tutorialMaterial"
                    class="md-primary"
                    value="5"
                  >Strongly Agree</md-radio>
                </div>
                <md-field :class="getValidationClass('tutorialForm', 'comments')">
                  <label
                    class
                  >Please write a few sentences to describe the tutorial content and how it was conducted. You are encouraged to provide more details to support your claims.</label>
                  <md-textarea v-model="tutorialForm.comments"></md-textarea>
                  <span
                    class="md-error"
                    v-if="!$v.tutorialForm.comments.required"
                  >This field is required</span>
                </md-field>
                <hr/>
                <br/>
                <label class="md-subheading">
                  <b>As a whole, the assignments and projects were manageable.</b>
                </label>
                <div>
                  <md-radio
                    v-model="tutorialForm.ap"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio v-model="tutorialForm.ap" class="md-primary" value="2">Disagree</md-radio>
                  <md-radio v-model="tutorialForm.ap" class="md-primary" value="3">Neutral</md-radio>
                  <md-radio v-model="tutorialForm.ap" class="md-primary" value="4">Agree</md-radio>
                  <md-radio v-model="tutorialForm.ap" class="md-primary" value="5">Strongly Agree</md-radio>
                </div>
                <md-field :class="getValidationClass('tutorialForm', 'apcomments')">
                  <label
                    class
                  >Please write a few sentences to describe the assignments and projects that were administered in the module. You are encouraged to provide more details to support your claims.</label>
                  <md-textarea v-model="tutorialForm.apcomments"></md-textarea>
                  <span
                    class="md-error"
                    v-if="!$v.tutorialForm.apcomments.required"
                  >This field is required</span>
                </md-field>
                <hr/>
                <br/>

                <label class="md-subheading">
                  <b>The module's examinations were manageable.</b>
                </label>
                <div>
                  <md-radio
                    v-model="tutorialForm.exams"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio v-model="tutorialForm.exam" class="md-primary" value="2">Disagree</md-radio>
                  <md-radio v-model="tutorialForm.exam" class="md-primary" value="3">Neutral</md-radio>
                  <md-radio v-model="tutorialForm.exam" class="md-primary" value="4">Agree</md-radio>
                  <md-radio v-model="tutorialForm.exam" class="md-primary" value="5">Strongly Agree</md-radio>
                </div>
                <md-field :class="getValidationClass('tutorialForm', 'examcomments')">
                  <label
                    class
                  >Please write a few sentences to describe the mode of examination and explain the reason for your above answer. You are encouraged to provide more details to support your claims.</label>
                  <md-textarea v-model="tutorialForm.examcomments"></md-textarea>
                  <span
                    class="md-error"
                    v-if="!$v.tutorialForm.examcomments.required"
                  >This field is required</span>
                </md-field>
                <hr/>
                <br/>
              </md-card-content>
              <md-card-actions class="md-layout md-alignment-center-center">
                <md-button
                  class="md-raised okaybtn"
                  v-on:click.prevent="goNext('tutorialForm', 'third','fourth')"
                >Next</md-button>
              </md-card-actions>
              <!-- </md-card> -->
            </md-step>

            <md-step
              id="fourth"
              md-label="Comments"
              :md-done.sync="fourth"
              v-on:click.prevent="active = 'fourth'"
              :md-error="commentForm.error"
            >
              <!-- <md-card> -->
              <md-card-header
                class="md-title"
              >For the questions below, rate your overall experience for the module.</md-card-header>
              <md-card-content>
                <label class="md-subheading">
                  <b>Overall, I felt that the module was easy.</b>
                </label>
                <br />
                <div>
                  <md-radio
                    v-model="commentForm.difficulty"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio v-model="commentForm.difficulty" class="md-primary" value="2">Disagree</md-radio>
                  <md-radio v-model="commentForm.difficulty" class="md-primary" value="3">Neutral</md-radio>
                  <md-radio v-model="commentForm.difficulty" class="md-primary" value="4">Agree</md-radio>
                  <md-radio
                    v-model="commentForm.difficulty"
                    class="md-primary"
                    value="5"
                  >Strongly Agree</md-radio>
                </div>
                <hr />
                <br />
                <label class="md-subheading">
                  <b>The workload of the module was manageable.</b>
                </label>
                <br />
                <div>
                  <md-radio
                    v-model="commentForm.workload"
                    class="md-primary"
                    value="1"
                  >Strongly Disagree</md-radio>
                  <md-radio v-model="commentForm.workload" class="md-primary" value="2">Disagree</md-radio>
                  <md-radio v-model="commentForm.workload" class="md-primary" value="3">Neutral</md-radio>
                  <md-radio v-model="commentForm.workload" class="md-primary" value="4">Agree</md-radio>
                  <md-radio
                    v-model="commentForm.workload"
                    class="md-primary"
                    value="5"
                  >Strongly Agree</md-radio>
                </div>
                <hr />
                <br />
                <label class="md-subheading">
                  <b>As a whole, how would you rate this module?</b>
                </label>
                <Ratings v-model="commentForm.rating" />
                <hr />
                <br />
                <md-field>
                  <label>Please write down any other comments you have about the module.</label>
                  <md-textarea v-model="commentForm.comments"></md-textarea>
                </md-field>
              </md-card-content>
              <md-card-actions class="md-layout md-alignment-center-center">
                <md-button class="md-raised okaybtn" type="submit">Submit</md-button>
              </md-card-actions>
              <!-- <md-snackbar md-active = true md-position='center'></md-snackbar> -->
              <!-- </md-card> -->
            </md-step>
          </md-steppers>
          <md-dialog-confirm
          :md-active.sync='showSubmitMessage'
          md-title='Review Submitted!'
          md-content='Thanks for submitting a review!'
          @md-confirm='goback'
          md-cancel-text=''
          md-confirm-text='Okay'
            />

        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Ratings from "./Ratings";
import NavBar from "./NavBar";
import database from '../firebase'
export default {
  name: "ReviewForm",
  props: {
    msg: String,
    value: Number
  },
  components: {
    Ratings,
    NavBar
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
      },
      clarity: {
        required
      },
      comments: {
        required
      }
    },
    tutorialForm: {
      tutorialMaterial: {
        required
      },
      comments: {
        required
      },
      tutor: {
        required
      },
      apcomments: {
        required
      },
      examcomments: {
        required
      }
    },
    commentForm: {
      comments: {},
      recommend: {
        required
      },
      difficulty: {
        required
      },
      rating: {
        required
      }
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = "OK";
        this.showSubmitMessage = true;
        // this.goback()
        database.firebase_data.collection('reviews').add({
          'userid': 'e0123456', //change this to the user id
          'module_code': 'CS2030', //change this to the passed props from moduleinfo page
          'likes': 0,
          'dislikes': 0,
          'detailsForm': this.detailsForm,
          'lectureForm': this.lectureForm,
          'tutorialForm': this.tutorialForm,
          'commentForm': this.commentForm
        })
        // this.setDone("first", "second");

        console.log("form submitted!");
      } else {
        this.submitStatus = "INVALID";
        this.showErrorMessage = true;
        //This part is hard-coded for now, until I find a better way to do the error check for all the forms upon submit button press
        if (this.$v.lectureForm.$invalid) {
          this.lectureForm.error = "Error";
        } else {
          this.lectureForm.error = null;
        }
        if (this.$v.tutorialForm.$invalid) {
          this.tutorialForm.error = "Error";
        } else {
          this.tutorialForm.error = null;
        }

        if (this.$v.commentForm.$invalid) {
          this.commentForm.error = "Error";
        } else {
          this.commentForm.error = null;
        }

        console.log("form invalid");
      }
    },
    goNext(formName, currStep, nextStep) {
      this.$v[formName].$touch();
      if (!this.$v[formName].$invalid) {
        this[formName].error = null;
        this.setDone(currStep, nextStep);
      } else {
        this[formName].error = "Error!";
      }
      window.scrollTo(0, 0)
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
      if (index) {
        this.active = index;
      }
    },
    goback() {
      this.showSubmitMessage = false;
      window.location.href = "/#/module";
    }
  },

  created() {
    database.firebase_data.collection('faculties').get().then((querySnapShot) => {
      let item = {}
      querySnapShot.forEach(doc => {
        item = doc.data()
        this.faculties.push(item)
      })
    })
  },

  data: () => ({
    detailsForm: {
      selectedSemester: null,
      selectedStaff: null,
      selectedGrade: null,
      selectedFaculty: null
    },
    lectureForm: {
      lectureMaterial: "3",
      clarity: "3",
      error: null
    },
    tutorialForm: {
      tutorialMaterial: "3",
      error: null,
      tutor: "3",
      ap: '3',
      apcomments: null,
      comments: null,
      exam: '3',
      examcomments: null,
    },
    commentForm: {
      comments: null,
      recommend: "3",
      difficulty: "3",
      workload: "3",
      rating: null,
      
    },
    exitDialog: false,
    submitStatus: null,
    errors: false,
    formTouched: false,
    active: "first",
    first: false,
    second: false,
    third: false,
    fourth: false,
    questionOne: null,
    showSubmitMessage: false,
    showErrorMessage: false,
    lectureError: null,
    // there are 17 facculties and schools
    faculties: [
      {
        id: 1,
        title: "Arts and Social Sciences"
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
        title: "Dentistry"
      },
      {
        id: 5,
        title: "Design and Environment"
      },
      {
        id: 6,
        title: "Engineering"
      },
      {
        id: 7,
        title: "Law"
      },
      {
        id: 8,
        title: "Medicine"
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

<style scoped>
.pageHeader {
  /* display: flex; */
  top: 0;
  right: 0;
  /* justify-items: flex-end;
  justify-content: flex-end; */
}

.closeButton {
  float: right;
}

.page {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 4%;
  /* box-shadow: 0 0 0 10px blue inset; */
}

.md-button.okaybtn {
  background-color: #007bff !important;
  font-weight: bold;
  color: white !important;
}
.md-button.cancelbtn {
  background-color: orangered !important;
  font-weight: bold;
  color: white !important;
}

/* .html .body {
  height:100vh !important;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%) !important;
  padding:0px;
  margin:0px;


} */

/*
Tentative fix to css background
*/
.pageBody {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%) !important;
  height: 80vmax; 
  padding:0px;

}
</style>