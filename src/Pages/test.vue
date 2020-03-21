<template>
  <div id="app">
    <md-list v-for="post in modulesData" v-bind:key="post.moduleCode">
      <div>
        <p>{{post.moduleCode}}</p>
      </div>
    </md-list>
  </div>
</template>

<script>
import database from "../firebase_wx.js";
export default {
  name: "app",
  data() {
    return {
      modulesData: [],
      newArticle: {
        title: "",
        author: "",
        url: ""
      }
    };
  },
  firebase: function () {
    return {
      modulesData: database.ref("papa-gateau-7f9ac")
    }
  },
  methods: {},
  created() {
    this.modulesData = database.ref("papa-gateau-7f9ac");
    console.log(this.modulesData);
  }
};
</script>