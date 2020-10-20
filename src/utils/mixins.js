import api from '@/api'
import router from '@/router'

export default {
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
  },
  mounted () {
    // 全局路由守卫
    router.beforeEach((to, from, next) => {
      const token = window.localStorage.getItem('heimatoutiao_token')
      if (!token || to.name === 'personal') {
        this.$alertMsgBox('danger', '请先登录')
        next({ name: 'Login' })
      }
      next()
    })
  }
}
