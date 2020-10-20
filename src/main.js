import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.mixin({
  created () {
    this.$api = api
    this.$alertMsgBox = (variant, message) => {
      this.$bvToast.toast(message, {
        variant,
        autoHideDelay: 2000,
        toaster: 'b-toaster-top-center',
        noCloseButton: true,
        bodyClass: 'alert-text_body'
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
