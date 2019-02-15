import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import create from './views/create.vue'
// @ts-ignore
import join from './views/join.vue'
// @ts-ignore
// import active from './views/active.vue'
// @ts-ignore
import about from './views/about.vue'
// @ts-ignore
import testBracket from './views/testBracket.vue'
// @ts-ignore
import bracket from './views/bracket.vue'
// @ts-ignore
import profile from './views/profile.vue'
import store from './store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/join/:tournamentId',
      props: true,
      name: 'join',
      component: join
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/tournament/:tId',
      props: true,
      name: 'bracket',
      component: bracket
    },
    {
      path: '/bracket/:tId',
      name: 'testBracket',
      component: testBracket
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },

    {
      path: "*",
      redirect: '/login'
    }

    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: function () { 
    //     return import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.path == '/login' || to.path == '/register') {
    next()
    // if it doesnt match a route, go to the dashboard '/'
  } else if (to.matched.length == 0) {
    next("/")
    // if there is no user, dont navigate to the new route
    // } else if (!store.state.user._id) {
    //   next(false)
    // if we passed all these statements, this is a valid route, proceed.
  } else {
    next()
  }
})

export default router
