import Vue from 'vue'
import Router from 'vue-router'
import LandPage from './Pages/LandPage.vue'
import loginPage from './Pages/loginPage.vue'
import ModuleList from './Pages/ModuleList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/LandPage',
      name: 'LandPage',
      component: LandPage,
      props: true
    },
    //comment this block to test components
    {
      path: '/ModuleList',
      name: 'ModuleList',
      component: ModuleList
    },
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
    //CHANGE PATH HERE, ONLY FOR TESTING PURPOSES
    // {
    //   path:'/',
    //   name: 'reviewCard',
    //   component: ReviewCard
    // }
  ]
})