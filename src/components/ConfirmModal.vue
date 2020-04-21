<template>
  <div id="ConfirmModal">
    <md-card-actions class="md-layout md-alignment-center">
      <md-button class="md-primary md-raised" type="submit" v-on:click.prevent="deletemod">Yes</md-button>
    </md-card-actions>
  </div>
</template>


<script>
import database from "../firebase.js";
export default {
  name: "ConfirmModal",

  data: () => ({}),
  props: {
    code: String
  },
  components: {},
  methods: {
    deletemod() {
      console.log("ok");
      database
        .deleteModuleResults(this.code)
        .then(e => {
          console.log(e);
          // create an alert saying you have already added this module
          this.$root.$emit("deleteitem", { code: this.code});
        })
        .catch(() => {
          alert("Fail");
          this.$root.$emit("closeModal2");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog {
  overflow: auto;
  display: block;
}
</style>

