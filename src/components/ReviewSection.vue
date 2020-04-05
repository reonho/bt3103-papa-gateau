<template>
  <div>
    <div id="ReviewSection" v-if='hasReviews===true'>
      <div v-for="r in reviewData" v-bind:key="'review'+r.id" >
        <ReviewCard :review="r"></ReviewCard>
      </div>
    </div>
    <div class = 'empty-state' id = 'EmptyState' v-if='hasReviews===false'>
      <md-empty-state
        class ='md-accent'
        md-icon='post_add'
        md-label="No Reviews"
        md-description="There are no reviews yet. Write a review now!"
      />
    </div>
  </div>
</template>


<script>
// import DataObject from "../Database.js";
import ReviewCard from "./ReviewCard";
// import database from '../firebase.js';
export default {
  name: "ReviewSection",
  props: {
    userid: String,
    mod: String,
    reviewData: Array
  },
  // {
  //   reviewData: Array //should be an array of reviews from the backend
  // },
  data: () => ({
    hasReviews: true
    // reviewData: DataObject.reviewData
    // reviewData: [],
    //userid: 'e0123451'
  }),

  components: {
    ReviewCard
  },

  updated() {
    console.log("ReviewSection " + this.reviewData)
    if (this.reviewData.length > 0) {
      this.hasReviews = true;
    } else {
      this.hasReviews = false;
    }
  }
};
</script>


<style scoped>
.empty-state {
  /* color:  #17a2b8 */
}
</style>

