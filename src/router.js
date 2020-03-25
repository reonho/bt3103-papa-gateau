import Vue from 'vue'
import Router from 'vue-router'
import LandPage from './Pages/LandPage.vue'
import loginPage from './Pages/loginPage.vue'
import ModuleList from './Pages/ModuleList.vue'
import modulePage from './Pages/modulePage.vue'
import ReviewForm from './components/ReviewForm'
import EditForm from './components/EditForm'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/LandPage',
      name: 'LandPage',
      component: LandPage,
      props: true
    },
    // comment this block to test components
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
    {
      path: '/module',
      name: 'modulePage',
      component: modulePage
    },
    {
      path:'/review',
      name: 'reviewForm',
      component: ReviewForm
    },
    {
      path:'/edit',
      name: 'EditForm',
      component: EditForm
    }
  ]
})