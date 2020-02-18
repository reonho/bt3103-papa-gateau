<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- <LandPage msg="Welcome to Your Vue.js App"/> -->
    <!-- <Test/> -->
    <ReviewForm/>
  </div>
</template>

<script>
// import LandPage from './components/LandPage.vue'
import ReviewForm from './components/ReviewForm.vue'



export default {
  name: 'App',
  components: {
    // LandPage
    ReviewForm
  }
}
</script>

<style>

</style>
