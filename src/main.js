
import Vue from 'vue'
import app from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueApexCharts from 'vue-apexcharts'
Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)


new Vue({
  render: h => h(app),
  el: '#app',
}).$mount('#app')
