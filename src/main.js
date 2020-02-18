
import Vue from 'vue'
import app from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { MdButton, MdContent, MdToolbar, MdTabs} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import vuetify from './plugins/vuetify';

Vue.use(VueMaterial);
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdTabs)

Vue.config.productionTip = false

new Vue({
  vuetify
  render: h => h(app),
  el: '#app',
}).$mount('#app')
