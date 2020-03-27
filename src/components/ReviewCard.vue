<template>
  <div id="ReviewCard">
    <md-card>
      <md-card-header class="md-gutter">
        <!-- <md-button class = 'headerButton' v-on:click='showDetail = !showDetail'> -->
        <!-- <b>{{review.module_code}} {{review.module_name}} ({{review.detailsForm.selectedSemester}})</b> -->
        <b>{{review.module_code}} {{review.module_name}} ({{review.detailsForm.selectedYear}} {{review.detailsForm.selectedSemester}})</b>
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

        <!-- <div class="date">Written on: {{review.date}}</div> -->

        <div v-show="showDetail">
          <p>Additional Details to be rendered</p>
        </div>
      </md-card-content>
      <hr />
      <!-- <md-divider/> -->
      <div class="footer">
        <!-- To add a v-if for footerLeft to check if the review was written by user -->
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
import database from "../firebase";
export default {
  name: "ReviewCard",
  props: {
    review: Object //renders the review object passed from ReviewSection
  },
  data: () => ({
    liked: null, //to find from backend
    disliked: null, //to find from backend
    showDialog: false,
    showDetail: false, //toggle visibility of hidden content,
    userid: null
  }),

  created() {
    database.getUser().then(user => {
      this.userid = user;
      var ul = Object.values(this.review.users_liked);
      var ud = Object.values(this.review.users_disliked);
      console.log(this.userid);
      //if user has liked the review
      if (ul.indexOf(this.userid) != -1) {
        this.liked = true;
        this.disliked = false;
      } else {
        this.liked = false;
      }
      // if user has disliked the review
      if (ud.indexOf(this.userid) != -1) {
        this.disliked = true;
        this.liked = false;
      } else {
        this.disliked = false;
      }
    });
  },
  methods: {
    remove(array, item) {
      const index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
    },

    like() {
      let db = database.firebase_data;
      //if user has neither liked nor disliked yet
      if (this.liked === false && this.disliked === false) {
        this.review.users_liked.push(this.userid);
        this.liked = true;
        db.collection("reviews")
          .doc(this.review.id)
          .update({
            likes: this.review.users_liked.length,
            users_liked: this.review.users_liked
          });
      }
      //replace this.liked with some variable that stores whether the user has liked/disliked the post already. Probably a backend call to the list of likers/dislikers
      //possibly can add the user to the list of likers for a review too, all depends on how we store this
      else if (this.liked === true) {
        //if post already liked, unlike it
        this.liked = false;

        //remove user from users_liked
        this.remove(this.review.users_liked, this.userid);
        db.collection("reviews")
          .doc(this.review.id)
          .update({
            users_liked: this.review.users_liked,
            likes: this.review.users_liked.length
          });
      } else {
        //else like the post
        this.liked = true;
        //add user to users_liked
        this.review.users_liked.push(this.userid);
        db.collection("reviews")
          .doc(this.review.id)
          .update({
            likes: this.review.users_liked.length,
            users_liked: this.review.users_liked
          });

        if (this.disliked === true) {
          //if user previously disliked, remove the dislike
          this.disliked = false;

          //remove user from users_disliked
          this.remove(this.review.users_disliked, this.userid);
          db.collection("reviews")
            .doc(this.review.id)
            .update({
              users_disliked: this.review.users_disliked,
              dislikes: this.review.users_disliked.length
            });
        }
        //update count in db
      }
    },

    dislike() {
      let db = database.firebase_data;
      //if user has yet to like/dislike the review
      if (this.liked === false && this.disliked === false) {
        this.review.users_disliked.push(this.userid);
        db.collection("reviews")
          .doc(this.review.id)
          .update({
            users_disliked: this.review.users_disliked,
            dislikes: this.review.users_disliked.length
          });

        this.disliked = true;
      } else if (this.disliked === true) {
        //if post already disliked, clear it
        this.disliked = false;
        //update count in db
        this.remove(this.review.users_disliked, this.userid);
        db.collection("reviews")
          .doc(this.review.id)
          .update({
            users_disliked: this.review.users_disliked,
            dislikes: this.review.users_disliked.length
          });
      } else {
        //else dislike the post
        this.disliked = true;
        this.review.users_disliked.push(this.userid);
        db.collection("reviews")
          .doc(this.review.id)
          .update({
            users_disliked: this.review.users_disliked,
            dislikes: this.review.users_disliked.length
          });

        if (this.liked === true) {
          //if user previously liked the review, remove the like
          this.remove(this.review.users_liked, this.userid);
          this.liked = false;
          db.collection("reviews")
            .doc(this.review.id)
            .update({
              users_liked: this.review.users_liked,
              likes: this.review.users_liked.length
            });
        }
      }
    },

    edit() {
      //find review id in collection
      //navigate to review form, while passing the fields from the review
      //allow to edit from the review form
    },

    deleteReview() {
      // let self = this
      // console.log(this.review.commentForm.comments)
      database.firebase_data
        .collection("reviews")
        .doc(this.review.id)
        .delete();
      //find review id in collection
      // database.collection('reviews').doc(reviewid).delete();
      //delete
      // update list of reviews (to be done in reviewsection)
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

