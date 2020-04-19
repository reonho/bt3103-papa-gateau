<template>
  <div>
    <div id="ReviewSection" v-show="hasReviews===true">
      <div v-for="r in reviewData" v-bind:key="'review'+r.id">
        <ReviewCard :review="r"></ReviewCard>
      </div>
    </div>
    <div class="empty-state" id="EmptyState" v-show="hasReviews===false">
      <md-empty-state
        style="color: #2e4053 !important;"
        md-icon="post_add"
        md-label="No Reviews"
        md-description="There are no reviews yet. Write a review now!"
      />
    </div>
  </div>
</template>


<script>
// import DataObject from "../Database.js";
import ReviewCard from "./ReviewCard";
// import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
// import database from '../firebase.js';
export default {
  name: "ReviewSection",
  props: {
    userid: String,
    mod: String,
    reviewData: Array
  },
  methods: {
    setReviewStatus(value) {
      console.log('value ' + value)
      if (value.length > 0) {
        this.hasReviews = true;
      } else {
        this.hasReviews = false;
      }

    },

  },
  // {
  //   reviewData: Array //should be an array of reviews from the backend
  // },
  data: () => ({
    hasReviews: false,
    dataLoaded: false

  }),
  components: {
    ReviewCard,
  },

  created() {
    this.setReviewStatus(this.reviewData);
  },
  watch: {
    reviewData(value) {
      console.log('watch')
      this.setReviewStatus(value);
      console.log(this.reviewData)
    }
  }
  // }
};
</script>


<style scoped>

</style>