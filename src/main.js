import Vue from 'vue'
import { ButtonPlugin, LayoutPlugin, ToastPlugin, LinkPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import mixins from './utils/mixins'

Vue.config.productionTip = false

Vue
  .use(ButtonPlugin)
  .use(LayoutPlugin)
  .use(ToastPlugin)
  .use(LinkPlugin)

Vue.mixin(mixins)

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
