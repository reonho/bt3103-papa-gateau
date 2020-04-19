
import Vue from 'vue'
import app from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMaterial from 'vue-material'
import { MdButton, MdContent, MdToolbar, MdTabs} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Scrollspy from "vue2-scrollspy";



Vue.use(VueMaterial);
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdTabs)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Scrollspy)


Vue.config.productionTip = false

new Vue({
  render: h => h(app),
  el: '#app',
}).$mount('#app')
