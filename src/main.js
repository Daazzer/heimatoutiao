import Vue from 'vue'
import { Toast, Image, Icon, Button } from 'vant'
import App from './App.vue'
import router from './router'
import mixins from './utils/mixins'

Vue.config.productionTip = false

Vue
  .use(Toast)
  .use(Image)
  .use(Icon)
  .use(Button)

Vue.mixin(mixins)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
