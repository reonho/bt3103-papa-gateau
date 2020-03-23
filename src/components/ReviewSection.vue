<template>
  <div id="ReviewSection">
    <div v-for="r in reviewData" v-bind:key="'review'+r.id">
        <ReviewCard :review='r'></ReviewCard>
    </div>
  </div>
</template>


<script>
// import DataObject from "../Database.js";
import ReviewCard from "./ReviewCard";
// import database from '../firebase';
export default {
  name: "ReviewSection",
  props: {
    msg: String,
    reviewData: Array //should be an array of reviews from the backend
  },
  data: () => ({
    // reviewData: DataObject.reviewData
    // reviewData: [],
    userid: 'e0123451'
  }),

  components: {
    ReviewCard
  },

  created() {
    //query all reviews written by user
     // console.log(this.reviewData)
      
    

  }
};
</script>


<style scoped>
</style>

