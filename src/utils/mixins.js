import api from '@/api'

function alertMsg (variant, message) {
  this.$bvToast.toast(message, {
    variant,
    autoHideDelay: 2000,
    toaster: 'b-toaster-top-center',
    noCloseButton: true,
    bodyClass: 'alert-text_body'
  })
}

export default {
  created () {
    // 全局混入 api 和 bootstrap 的 toast 弹出框组件
    this.$api = api
    this.$alertMsgBox = alertMsg.bind(this)
  }
}
