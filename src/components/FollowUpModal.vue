<template>
  <div id="FollowUpModal">
    <md-button class="md-primary md-raised" @click="showModal = true">Add new module</md-button>
    <md-dialog :md-active.sync="showModal">
      <md-dialog-title>Add another module</md-dialog-title>
      <ModuleForm/>
    </md-dialog>
  </div>
</template>

<script>
import ModuleForm from './ModuleForm.vue'
export default {
  name: "FollowUpModal",
  props: {
    msg: String
  },
  data:() =>( {
      showModal: false
  })
  ,
  components: {
      ModuleForm
  }

  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
.md-dialog-title {
  overflow: scroll;
  margin: 8px;
  display: block;
  align-self: auto;
  padding: 4px;
  /* min-height: 180px; */
}
</style>