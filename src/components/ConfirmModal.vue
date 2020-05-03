<template>
  <div id="ConfirmModal">
    <md-card-actions class="md-layout md-alignment-center">
      <md-button class="md-primary md-raised" type="submit" v-on:click.prevent="deleteitem">Yes</md-button>
    </md-card-actions>
  </div>
</template>


<script>
import database from "../firebase.js";
export default {
  name: "ConfirmModal",

  data: () => ({}),
  props: {
    module: Object,
    purpose: String,
    sem: String,
    year: String
  },
  components: {},
  methods: {
    deleteitem() {
      console.log("ok");
      if (this.purpose == "deletemod") {
        database
          .deleteModuleResults(this.module.code)
          .then(e => {
            console.log(e);
            // create an alert saying you have already added this module
            this.$root.$emit("deleteitem");
          })
          .catch(() => {
            //alert("Fail");
            this.$root.$emit("closeModal2");
          });
      } else if (this.purpose == "deletesem") {
        database
          .deleteSemModules(this.year, this.sem)
          .then(e => {
            console.log(e);
            this.$root.$emit("deleteitem");
          })
          .catch(() => {
            //alert("Fail");
            this.$root.$emit("closeModal2");
          });
      }
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

