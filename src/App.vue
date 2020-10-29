<template>
  <router-view />
</template>

<script>
import router from './router'

export default {
  name: 'App',
  mounted () {
    // 全局路由守卫
    router.beforeEach((to, from, next) => {
      const userInfo = JSON.parse(localStorage.getItem('heimatoutiao_userInfo'))
      const { name: toRouteName } = to
      const { name: fromRouteName, params } = from

      switch (toRouteName) {
        case 'Personal':
          if (!userInfo) {
            next({ name: 'Login' })
            return
          }
          next()
          break
        case 'Login':
          if (!userInfo && fromRouteName === 'Personal') {
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
// @import "../node_modules/vant/lib/index.css";
@import "./styles/reset.css";
@import "./fonts/iconfont.css";
@import "./styles/common.scss";
</style>
