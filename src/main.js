
import Vue from 'vue'
import app from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(app),
  el: '#app',
}).$mount('#app')