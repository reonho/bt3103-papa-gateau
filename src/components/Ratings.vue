<template>
  <div id="Ratings" v-bind:value='value' v-on:input="$emit('input', $event.target.value)">
    <md-button class="md-icon-button" v-on:click="clickRating('one')">
      <md-icon style = 'color:#FFDF00'>{{toggleIcon('one')}}</md-icon>
    </md-button>
    <md-button class="md-icon-button" v-on:click="clickRating('two')">
      <md-icon style = 'color:#FFDF00'>{{toggleIcon('two')}}</md-icon>
    </md-button>
    <md-button class="md-icon-button" v-on:click="clickRating('three')">
      <md-icon style = 'color:#FFDF00'>{{toggleIcon('three')}}</md-icon>
    </md-button>
    <md-button class="md-icon-button" v-on:click="clickRating('four')">
      <md-icon style = 'color:#FFDF00'>{{toggleIcon('four')}}</md-icon>
    </md-button>
    <md-button class="md-icon-button" v-on:click="clickRating('five')">
      <md-icon style = 'color:#FFDF00'>{{toggleIcon('five')}}</md-icon>
    </md-button>
  </div>
</template>


<script>
export default {
  name: "Ratings",
  // props: ['value'],
  props: {
    initialValue: Number
  },
  data: () => ({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    rating: null,
    starColor: '#FFDF00'
    
  }),

  created() {
    //autofill the rating component
    switch (this.initialValue) {
      case 1:
        this.clickRating('one')
        break
      case 2:
        this.clickRating('two')
        break
      case 3:
        this.clickRating('three')
        break
      case 4:
        this.clickRating('four')
        break
      case 5:
        this.clickRating('five')
    }
  },

  components: {},
  methods: {
    toggleIcon(id) {
      if (this[id]) {
        return "star";
      }
      return "star_border";
    },
    clickRating(id) {
      switch (id) {
        case "one":
          this.rating = 1;
          this.one = true;
          this.two = false;
          this.three = false;
          this.four = false;
          this.five = false;
          break;
        case "two":
          this.rating = 2;
          this.one = true;
          this.two = true;
          this.three = false;
          this.four = false;
          this.five = false;
          break;
        case "three":
          this.rating = 3;
          this.one = true;
          this.two = true;
          this.three = true;
          this.four = false;
          this.five = false;

          break;
        case "four":
          this.rating = 4;
          this.one = true;
          this.two = true;
          this.three = true;
          this.four = true;
          this.five = false;
          break;
        case "five":
          this.rating = 5;
          this.one = true;
          this.two = true;
          this.three = true;
          this.four = true;
          this.five = true;
          break;
      }
      this.$emit('input', this.rating)

    },


  },

};
</script>


<style scoped>
.star {
    color: yellow
}
</style>

