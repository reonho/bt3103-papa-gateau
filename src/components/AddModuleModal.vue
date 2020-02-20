<template>
  <div id="AddModuleModal">
    <md-button class="md-primary md-raised" @click="showModal = true">Add new module</md-button>
    <md-dialog :md-active.sync="showModal">
      <md-dialog-title>Add New Module</md-dialog-title>
      <ModuleForm/>
    </md-dialog>
  </div>
</template>


<script>
import ModuleForm from './ModuleForm.vue'
export default {
  name: "AddModuleModal",
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
</style>
