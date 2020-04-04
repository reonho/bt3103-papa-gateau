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
import database from '../firebase.js';
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
    database.firebase_data.collection('reviews').onSnapshot((querySnapShot)=> {
      this.reviewData = []
      querySnapShot.forEach(doc => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        this.reviewData.push(item)
        // console.log(doc.id)
      })
      // console.log(this.reviewData)
      
    

  })
  }
}
</script>


<style scoped>
</style>

