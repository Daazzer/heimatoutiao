import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/personal/:id',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "personal" */ '@/views/Personal.vue')
  },
  {
    path: '/edit_profile/:id',
    name: 'EditProfile',
    component: () => import(/* webpackChunkName: "editProfile" */ '@/views/EditProfile.vue')
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
