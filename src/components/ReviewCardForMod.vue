<template>
  <div id="ReviewCard">
    <md-card style='margin-left:auto;margin-right:auto; background-color:rgb(226, 235, 240)'>
      <md-card-header class = 'md-gutter'>
        <!-- <md-button class = 'headerButton' v-on:click='showDetail = !showDetail'> -->
        {{review.sem_taken}}
          <!-- <md-icon class = 'dropdown'>{{swapIcon()}}</md-icon> -->
        <!-- </md-button> -->
      </md-card-header>
      
      <md-card-content>
        <div>
        <!-- <b>Semester taken: {{review.sem_taken}}</b> -->
        </div>
        <!-- <br/> -->
        <div class = 'para'>
          <!-- <div class = 'md-subheading'>Lectures</div> -->
          <b>Lectures</b><p class = 'comments'>{{review.lecture_comments}}</p>
        </div>

        <div class = 'para'>
          <!-- <div class = 'md-subheading'>Tutorials</div> -->
          <b>Tutorials</b>
          <p class = 'comments'>{{review.tutorial_comments}}</p>
        </div>

        <div class ='para'>
          <!-- <div class = 'md-subheading'>Comments</div> -->
          <b>Comments</b>
          <p class = 'comments'>{{review.comments}}</p>
        </div>

        <div class = 'grade'>
         <b>Grade obtained: {{review.grade_obtained}}</b>
        </div>

        <div class = 'date'>
          Written on: {{review.date}}
        </div>



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
  display: flex;
  
}
.comments {
  text-overflow:ellipsis;
  overflow: hidden;
}

.para {
  margin-bottom: 4px;
}

.md-button .md-ripple {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.headerButton {
  overflow: auto;
}

.date {
  align-self: flex-end;
  float: right;
}

</style>

