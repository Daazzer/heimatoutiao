import Vue from 'vue'
import {
  Toast,
  Image,
  Icon,
  Button,
  List,
  PullRefresh,
  NavBar
} from 'vant'
import App from './App.vue'
import router from './router'
import api from './api'

Vue.config.productionTip = false

Vue
  .use(Toast)
  .use(Image)
  .use(Icon)
  .use(Button)
  .use(List)
  .use(PullRefresh)
  .use(NavBar)

Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
