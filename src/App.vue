<template>
  <router-view />
</template>

<script>
import router from './router'

export default {
  mounted () {
    // 全局路由守卫
    router.beforeEach((to, from, next) => {
      const token = window.localStorage.getItem('heimatoutiao_token')
      const { name: toRouteName } = to
      const { name: fromRouteName, params } = from

      switch (toRouteName) {
        case 'Personal':
          if (!token) {
            this.$alertMsgBox('danger', '请先登录')
            next({ name: 'Login' })
            return
          // 验证是否真正点击登录
          } else if (token && fromRouteName === 'Login' && params.id) {
            this.$alertMsgBox('success', '登录成功')
          }
          next()
          break
        case 'Login':
          if (!token && fromRouteName === 'Personal') {
            this.$alertMsgBox('success', '退出成功')
          }
          next()
          break
        default:
          next()
      }
    })
  }
}
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css";
@import "./fonts/iconfont.css";
@import "./styles/common.scss";
</style>
