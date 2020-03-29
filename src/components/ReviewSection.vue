<template>
  <div id="ReviewSection">
    <div v-for="r in reviewData" v-bind:key="r.id">
        <ReviewCard :review='r'></ReviewCard>
    </div>
  </div>
</template>


<script>
import DataObject from "../Database.js";
import ReviewCard from "./ReviewCard";
export default {
  name: "ReviewSection",
  props: {
    msg: String,
  },
  data: () => ({
    reviewData: DataObject.reviewData
  }),

  components: {
    ReviewCard
  }
};
</script>


<style scoped>
</style>

