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
        id="statebox"
        md-icon="post_add"
        md-label="No Reviews"
        md-description="There are no reviews yet. Write a review now!"
      />
    </div>
  </div>
</template>


<script>
import ReviewCard from "./ReviewCard";

export default {
  name: "ReviewSection",
  props: {
    userid: String,
    mod: String,
    reviewData: Array
  },
  methods: {
    setReviewStatus(value) {
    
      if (value.length > 0) {
        this.hasReviews = true;
      } else {
        this.hasReviews = false;
      }
    },

  },
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
     
      this.setReviewStatus(value);
      
    }
  }

};
</script>


<style scoped>

</style>