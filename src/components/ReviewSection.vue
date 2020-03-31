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
// import database from '../firebase.js';
export default {
  name: "ReviewSection",
  props: {
    userid: String,
    mod: String,
    reviewData: Array,
  }, 
  // {
  //   reviewData: Array //should be an array of reviews from the backend
  // },
  data: () => ({
    // reviewData: DataObject.reviewData
    // reviewData: [],
    //userid: 'e0123451'
  }),

  components: {
    ReviewCard,
  },

  created() {
    // if (this.userid != null){
    //   database.getUserReview(this.userid).then(reviews=>{
    //     this.reviewData = reviews
    //     console.log(this.userid)
    //     console.log(this.reviewData)
    //   })
    // } else if (this.mod != null){
    //   database.getModuleReviewID(this.mod).then(reviews =>{
    //     this.reviewData = reviews
    //     console.log(this.mod)
    //     console.log(this.reviewData[0])
    //   })
    // }
    //query all reviews written by user
     // console.log(this.reviewData)
      
    

  }
};
</script>


<style scoped>
</style>

