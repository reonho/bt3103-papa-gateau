import Vue from 'vue'
import Router from 'vue-router'
import LandPage from './Pages/LandPage.vue'
import loginPage from './Pages/loginPage.vue'
import ModuleList from './Pages/ModuleList.vue'
import modulePage from './Pages/modulePage.vue'
import ReviewForm from './components/ReviewForm'
import EditForm from './components/EditForm'
import database from './firebase.js'
import Registration from './Pages/Registration'

Vue.use(Router)

let router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
        requiresGuest: true
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
    // comment this block to test components
   
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage,
      meta: {
        requiresGuest: true
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
      path:'/review/:mod',
      name: 'ReviewForm',
      component: ReviewForm,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/edit/:review.id',
      name: 'EditForm',
      component: EditForm,
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