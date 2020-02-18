
import Vue from 'vue'
import app from './App.vue'
import router from './router.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)


new Vue({
  render: h => h(app),
  el: '#app',
  router
}).$mount('#app')
