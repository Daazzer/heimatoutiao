import Vue from 'vue'
import VueRouter from 'vue-router'
import { BvToastOptions } from 'bootstrap-vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "personal" */ '@/views/Personal.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
