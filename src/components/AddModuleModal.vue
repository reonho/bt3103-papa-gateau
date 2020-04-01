<template>
  <div id="AddModuleModal">
    <md-button class="md-primary md-raised" style="background-color:white;font-weight:bold;
    color:#17a2b8;" @click="showModal = true" >Add new module</md-button>
    <md-dialog :md-active.sync="showModal">
      <md-dialog-title>Add New Module</md-dialog-title>
      <ModuleForm/>
    </md-dialog>
    <md-dialog :md-active.sync="showFollowUp">
      <md-dialog-title>Add another Module?</md-dialog-title>
      <FollowUpModal/>
    </md-dialog>
  </div>
</template>


<script>
import ModuleForm from './ModuleForm.vue'
import FollowUpModal from './FollowUpModal'
export default {
  name: "AddModuleModal",
  props: {
    msg: String
  },
  data:() =>( {
      showModal: false,
      showFollowUp: false
  })
  ,
  components: {
      ModuleForm,
      FollowUpModal
  },
  mounted(){
    this.$root.$on("closeModal", this.closeThis);
    this.$root.$on("YES", this.showNewForm);
    this.$root.$on("NO", this.closeFollowUp);
  },
  methods: {
  closeThis(){
    this.showModal = false;
    this.showFollowUp = true;
  },
  showNewForm(){
    console.log("hi");
    this.showModal = true;
    this.showFollowUp = false;
  },
  closeFollowUp(){
    this.showFollowUp = false;
    this.showModal = false;
  }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog{
  overflow: auto;
  display: block;
}
@import "./style.css";

</style>
