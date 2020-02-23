<template>
  <div id="ReviewCard">
    <md-card v-for="r in reviewData" v-bind:key="r.id">
      <md-card-header>
        <b>{{r.module_code}} {{r.module_name}}</b>
      </md-card-header>
      
      <md-card-content>
        <span>{{r.comments}}</span>
      </md-card-content>
      <md-divider/>
      <span class="footerDiv">
          <p class = 'iconLabel'>
            {{r.like_count}}
            <md-icon>favorite</md-icon>
            
            {{r.comment_count}}
          <md-icon>comment</md-icon>
          </p>
        <!-- </span> -->
      </span>
    </md-card>
  </div>
</template>


<script>
import DataObject from "../Database.js";
export default {
  name: "ReviewCard",
  props: {
    msg: String
  },
  data: () => ({
    // reviewData: Object //To be replaced with result of backend call for data
    reviewData: DataObject.reviewData
  }),
  components: {}
};
</script>


<style scoped>
.md-card {
  
  margin: 8px;
  display: block;
  align-self: center;
  padding: 4px;
  /* min-height: 180px; */
  overflow:auto;

  /* vertical-align: top; */
}
.md-icon {
  margin: 4px;
}

.footerDiv {
  display: flex;
  align-content: flex-end;
  float:right;
  vertical-align: center
  
}
.iconLabel {
  justify-self: center;
  margin: 0px;

}

</style>

