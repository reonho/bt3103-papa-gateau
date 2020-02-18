import Vue from 'vue'
import Router from 'vue-router'
import LandPage from './Pages/LandPage.vue'
import loginPage from './Pages/loginPage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/LandPage',
      name: 'LandPage',
      component: LandPage
    },
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
  ]
})