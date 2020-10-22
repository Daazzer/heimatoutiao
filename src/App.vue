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
            this.$toast.fail('请先登录')
            next({ name: 'Login' })
            return
          }
          next()
          break
        case 'Login':
          if (!token && fromRouteName === 'Personal') {
            this.$toast.success('退出成功')
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
// @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// @import "../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css";
@import "../node_modules/vant/lib/index.css";
@import "./styles/reset.css";
@import "./fonts/iconfont.css";
@import "./styles/common.scss";
</style>
