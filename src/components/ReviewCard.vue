<template>
  <div id="ReviewCard">
    <md-card>
      <md-card-header>
        <md-button v-on:click='showDetail = !showDetail'>
        <b>{{review.module_code}} {{review.module_name}}</b>
          <md-icon class = 'dropdown'>{{swapIcon()}}</md-icon>
        </md-button>
      </md-card-header>
      
      <md-card-content>
        <div class = 'comments'>{{review.comments}}</div>
        <div v-show='showDetail'>
          <p>Additional Details to be rendered</p>
          </div>
      </md-card-content>

      <md-divider/>
      <span class="footerDiv">
          <p class = 'iconLabel'>
            {{review.like_count}}
            <md-icon>favorite</md-icon>
            
            {{review.comment_count}}
          <md-icon>comment</md-icon>
          </p>
        <!-- </span> -->
      </span>
    </md-card>
  </div>
</template>


<script>
export default {
  name: "ReviewCard",
  props: {
    msg: String,
    review: Object //renders the review object passed from ReviewSection
  },
  data: () => ({
    showDetail: false //toggle visibility of hidden content
  }),
  methods: {
    swapIcon() {
      if (this.showDetail) {
        return 'arrow_drop_up'
      }
      return 'arrow_drop_down'
    }

  },
  components: {}
};
</script>


<style scoped>
.md-card {
  width: 640px;
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
  float:right;
}
.iconLabel {
  justify-self: center;
  margin: 0px;

}
/* .dropdown {


} */
.md-card-header {
  vertical-align:text-bottom;
  overflow:auto;
  width: 100%;
}
.comments {
  text-overflow:ellipsis;
  overflow: hidden;
}

</style>

