<template>
  <div id="FollowUpModal" class = 'md-layout md-alignment-center-center'>
    <head >Add another module?</head>
    <md-button class="md-primary md-raised" v-on:click ="submitYes">Yes</md-button>
    <md-button class="md-primary md-raised" v-on:click ="submitNo">No</md-button>
  </div>
</template>

<script>
export default {
  name: "FollowUpModal",
  props: {
    msg: String
  },
  data:() =>( {
  })
  ,
  components: {

  },
  mounted(){

  },
  methods:{
      submitYes(){
          this.$root.$emit('YES');
      },
      submitNo(){
          this.$root.$emit('NO');
      }

  },

  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
.md-dialog-title {
  /* overflow: scroll; */
  margin: 8px;
  display: block;
  align-self: auto;
  padding: 4px;
  /* min-height: 180px; */

}

</style>