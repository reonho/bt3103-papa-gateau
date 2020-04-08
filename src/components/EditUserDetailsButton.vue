<template>
  <div id="EditUserDetailsButton">
    <md-button
      class="md-primary md-raised"
      style="background:teal; font-weight:600;color:white; border-radius: 4px;border: none;
    width:20vh;font-size: 1.6vh; margin:0"
      @click="showModal = true"
    >EDIT DETAILS</md-button>
  </div>
</template>


<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  display: block;
  border-radius: 4px;
  border: none;
  text-align: center;
  margin: 0;
  background: teal !important;
  font-weight: 600;
  color: white !important;
  width: 20vh !important;
  font-size: 1.6vh;
}
.md-dialog {
  overflow: auto;
  display: block;
}
@import "./style.css";
</style>
