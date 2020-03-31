import Vue from 'vue'
import Router from 'vue-router'
import LandPage from './Pages/LandPage.vue'
import LandPage2 from './Pages/LandPage2.vue'
import loginPage from './Pages/loginPage.vue'
import ModuleList from './Pages/ModuleList.vue'
import modulePage from './Pages/modulePage.vue'
import ReviewForm from './components/ReviewForm'
import Registration from './Pages/Registration'
// import EditForm from './components/EditForm'
import database from './firebase.js'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/ModuleList',
      name: 'ModuleList',
      component: ModuleList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Registration',
      name: 'Registration',
      component: Registration,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'LandPage',
      component: LandPage,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/L2',
      name: 'LandPage2',
      component: LandPage2,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    // comment this block to test components
   
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage,
      meta: {
        requiresGuest: false
      }
    },
    {
      path: '/:code',
      name: 'modulePage',
      props: true,
      component: modulePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/review',
      name: 'ReviewForm',
      component: ReviewForm,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  database.getUser().then(function(user){
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Check if NO logged user
      if (!user) {
        // Go to login
        next({
          path: '/loginPage',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      // Check if NO logged user
      if (user) {
        // Go to login
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next();
      }
    } else {
      // Proceed to route
      next();
    }
  })
  
});

export default router;