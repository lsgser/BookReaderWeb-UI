import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const offlineAuth = (to,from,next) => {
  if(store.getters.getIsLogged)
  {
    next(`/home`)
  }
  else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home 
  },
  {
    path: '/home',
    name: 'Main',
    component: Main
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
