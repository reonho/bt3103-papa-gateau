<template>
  <div>
    <div id="ReviewSection" v-show="hasReviews===true && dataLoaded">
      <div v-for="r in reviewData" v-bind:key="'review'+r.id">
        <ReviewCard :review="r"></ReviewCard>
      </div>
    </div>
    <div class="empty-state" id="EmptyState" v-show="hasReviews===false && dataLoaded">
      <md-empty-state
        style="color: #2e4053 !important;"
        md-icon="post_add"
        md-label="No Reviews"
        md-description="There are no reviews yet. Write a review now!"
      />
    </div>
    <!-- <div class="loading-state" id="LoadingState" v-show="loading">
      <md-empty-state
        style="max-width:0 !important; margin-top:-2vw; margin-bottom:5vw;color: #2e4053;"
        md-label="Loading..."
      />
      <ScaleLoader :loading="loading" :color="color" :size="size"></ScaleLoader>
    </div> -->
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
    setReviewStatus() {
      if (this.reviewData.length > 0) {
        this.hasReviews = true;
      } else {
        this.hasReviews = false;
      }
      // while (this.dataLoaded === false) {
      //   this.shortload(2000);
      //   console.log(this.reviewData);
      //   if (this.reviewData !== undefined && this.reviewData !== null) {
      //     this.dataLoaded = true;
      //   }
      // }
      // if (this.dataLoaded === true) {

      // }

      // this.$root.$emit("setReviewStatus");
    },
    shortload: function(n) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, n);
    }
    // showloading: function() {
    //   this.loading = true;
    //   this.$root.$on("setReviewStatus", function() {
    //     setTimeout(() => {
    //       this.loading = false;
    //     }, 800);
    //   });
    // }
  },
  // {
  //   reviewData: Array //should be an array of reviews from the backend
  // },
  data: () => ({
    loading: true,
    hasReviews: false,
    dataLoaded: false
    // reviewData: DataObject.reviewData
    // reviewData: [],
    //userid: 'e0123451'
  }),

  components: {
    ReviewCard,
    // ScaleLoader
  },
  // created() {
  //   console.log("ReviewSection " + this.reviewData)
  //   if (this.reviewData.length > 0) {
  //     this.hasReviews = true;
  //   } else {
  //     this.hasReviews = false;
  //   }
  // },
  created() {
    // this.setReviewStatus();
  },
  watch: {
    reviewData() {
      console.log('watch')
      this.setReviewStatus();
      this.dataLoaded = true
      this.loading = false
    }
  }

  // }
};
</script>


<style scoped>
.empty-state {
  color: #2e4053;
  /* color:  #17a2b8 */
}
</style>

