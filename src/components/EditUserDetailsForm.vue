<template>
  <div id="EditUserDetailsForm">
   
  </div>
  
</template>


<script>

export default {
  name: "EditUserDetailsForm",
  props: {
    msg: String
  },
  data: () => ({
    showModal: false,
  }),

  mounted() {
    this.$root.$on("closeModal", this.closeThis);
    this.$root.$on("YES", this.showNewForm);
    this.$root.$on("NO", this.closeFollowUp);
  },
  methods: {
    closeThis() {
      this.showModal = false;
      this.showFollowUp = true;
    },
    showNewForm() {
      console.log("hi");
      this.showModal = true;
      this.showFollowUp = false;
    },
    closeFollowUp() {
      this.showFollowUp = false;
      this.showModal = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


@import "./style.css";
</style>
