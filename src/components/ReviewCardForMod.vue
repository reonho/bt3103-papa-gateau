<template>
  <div id="ReviewCard">
    <!-- background-color:rgb(226, 235, 240) -->
    <md-card>
      <md-card-header class="md-gutter">
        <!-- <md-button class = 'headerButton' v-on:click='showDetail = !showDetail'> -->
        <b>{{review.module_code}} {{review.module_name}} ({{review.detailsForm.selectedSemester}})</b>
        <!-- <md-icon class = 'dropdown'>{{swapIcon()}}</md-icon> -->
        <!-- </md-button> -->
      </md-card-header>

      <md-card-content>
        <div>
          <!-- <b>Semester taken: {{review.sem_taken}}</b> -->
        </div>
        <!-- <br/> -->
        <div class="para">
          <!-- <div class = 'md-subheading'>Lectures</div> -->
          <b>Lectures</b>
          <p class="comments">{{review.lectureForm.comments}}</p>
        </div>

        <div class="para">
          <!-- <div class = 'md-subheading'>Tutorials</div> -->
          <b>Tutorials</b>
          <p class="comments">{{review.tutorialForm.comments}}</p>
        </div>

        <div class="para">
          <!-- <div class = 'md-subheading'>Tutorials</div> -->
          <b>Assignments & Projects</b>
          <p class="comments">{{review.tutorialForm.apcomments}}</p>
        </div>

        <div class="para">
          <!-- <div class = 'md-subheading'>Tutorials</div> -->
          <b>Examinations</b>
          <p class="comments">{{review.tutorialForm.examcomments}}</p>
        </div>

        <div v-if="review.commentForm.comments != null" div class="para">
          <!-- <div class = 'md-subheading'>Comments</div> -->
          <b>Comments</b>
          <p class="comments">{{review.commentForm.comments}}</p>
        </div>

        <div class="grade">
          <b>Grade obtained: {{review.detailsForm.selectedGrade}}</b>
        </div>

        <div v-show="showDetail">
          <p>Additional Details to be rendered</p>
        </div>
      </md-card-content>

      <hr />
      <div class="footer">
        <span class="footerLeft">
          <md-button class="md-icon-button">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button" v-on:click="showDialog = true">
            <md-icon>delete</md-icon>
          </md-button>
        </span>
        <span class="footerDiv">
          <md-button v-if="this.liked===false" class="md-icon-button" v-on:click="like">
            <md-icon>thumb_up</md-icon>
          </md-button>
          <md-button v-if="this.liked===true" class="md-icon-button md-primary" v-on:click="like">
            <md-icon>thumb_up</md-icon>
          </md-button>
          {{review.likes}}
          <md-button v-if="this.disliked===false" class="md-icon-button" v-on:click="dislike">
            <md-icon>thumb_down</md-icon>
          </md-button>
          <md-button
            v-if="this.disliked===true"
            class="md-icon-button md-primary"
            v-on:click="dislike"
          >
            <md-icon>thumb_down</md-icon>
          </md-button>
          {{review.dislikes}}
        </span>
      </div>
    </md-card>
    <md-dialog-confirm
      :md-active.sync="showDialog"
      md-title="Delete review?"
      md-content="This action cannot be undone."
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-confirm="deleteReview"
    />
  </div>
</template>


<script>
import database from '../firebase'
export default {
  name: "ReviewCard",
  props: {
    msg: String,
    review: Array //renders the review object passed from ReviewSection
  },
  data: () => ({
    showDetail: false, //toggle visibility of hidden content
    liked: false, //to find from backend
    disliked: false, //to find from backend
    like_count: 10, //sample variables to show that it works
    dislike_count: 10
  }),
  methods: {
    swapIcon() {
      if (this.showDetail) {
        return "arrow_drop_up";
      }
      return "arrow_drop_down";
    },

    like() {
      //replace this.liked with some variable that stores whether the user has liked/disliked the post already. Probably a backend call to the list of likers/dislikers
      //possibly can add the user to the list of likers for a review too, all depends on how we store this
      if (this.liked === true) {
        //if post already liked, unlike it
        this.liked = false;
        //update count in db
        database
          .collection("reviews")
          .doc(this.review.id)
          .update({
            likes: Math.max(this.review.likes - 1, 0)
          });
      } else {
        //else like the post
        this.liked = true;
        // this.like_count += 1;
        database
          .collection("reviews")
          .doc(this.review.id)
          .update({
            likes: this.review.likes + 1
          });
        if (this.disliked === true) {
          //if user previously disliked, remove the dislike
          this.disliked = false;
          this.dislike_count = Math.max(this.dislike_count - 1, 0);
          //decrement dislike count in db
          database
            .collection("reviews")
            .doc(this.review.id)
            .update({
              dislikes: Math.max(this.review.dislikes - 1, 0)
            });
        }
        //update count in db
      }
    },

    dislike() {
      if (this.disliked === true) {
        //if post already disliked, clear it
        this.disliked = false;
        // this.dislike_count = Math.max(this.dislike_count - 1, 0);
        //update count in db
        database
          .collection("reviews")
          .doc(this.review.id)
          .update({
            dislikes: Math.max(this.review.dislikes - 1, 0)
          });
      } else {
        //else dislike the post
        this.disliked = true;
        database
          .collection("reviews")
          .doc(this.review.id)
          .update({
            dislikes: this.review.dislikes + 1
          });
        // this.dislike_count += 1;

        //update dislike count
        if (this.liked === true) {
          //if user previously disliked, remove the like
          this.liked = false;
          database
            .collection("reviews")
            .doc(this.review.id)
            .update({
              likes: Math.max(this.review.likes - 1, 0)
            });
        }
      }
    }
  },
  components: {}
};
</script>


<style scoped>
.md-card {
  display: block;
  align-self: center;
  padding: 1%;
  margin-bottom: 2%;
  overflow: auto;

  /* vertical-align: top; */
}

.footerDiv {
  display: inline-flex;
  float: right;
  vertical-align: bottom;
  justify-items: bottom;
  align-items: center;
}
/* .dropdown {


} */
.md-card-header {
  vertical-align: text-bottom;
  overflow: auto;
  width: 100%;
  display: flex;
}
.comments {
  text-overflow: ellipsis;
  overflow: hidden;
}

.para {
  margin-bottom: 4px;
}

.md-button .md-ripple {
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerButton {
  overflow: auto;
}

.date {
  align-self: flex-end;
  float: right;
}

.footerLeft {
  float: left;
}
</style>

