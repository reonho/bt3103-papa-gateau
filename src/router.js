import Vue from 'vue'
import Router from 'vue-router'
import LandPage from './Pages/LandPage.vue'
import loginPage from './Pages/loginPage.vue'
import modulePage from './Pages/modulePage.vue'
import ReviewForm from './components/ReviewForm'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/LandPage',
      name: 'LandPage',
      component: LandPage
    },
    //comment this block to test components
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/module',
      name: 'modulePage',
      component: modulePage
    },
    {
      path:'/review',
      name: 'reviewForm',
      component: ReviewForm
    }
  ]
})