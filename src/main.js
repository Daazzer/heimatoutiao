import Vue from 'vue'
import { Toast, Image } from 'vant'
import App from './App.vue'
import router from './router'
// import store from './store'
import mixins from './utils/mixins'

Vue.config.productionTip = false

Vue
  .use(Toast)
  .use(Image)

Vue.mixin(mixins)

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
