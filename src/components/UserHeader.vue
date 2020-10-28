<template>
  <header>
    <van-nav-bar
      class="user-header"
      @click-left="$router.back()"
      fixed
      placeholder
    >
      <template #left>
        <button class="back">
          <span class="iconfont iconjiantou2"></span>
        </button>
      </template>
      <template #title>
        <h1>{{ title }}</h1>
      </template>
      <template #right>
        <router-link to="/">
          <van-icon name="wap-home-o" class="home-icon" />
        </router-link>
      </template>
    </van-nav-bar>
  </header>
</template>

<script>
export default {
  name: 'UserHeader',
  props: {
    title: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.user-header {
  $backgroundColor: #f2f2f2;
  $headerFontSize: common.baseSize(16);
  $height: common.baseSize(50);
  height: $height !important;
  ::v-deep .van-nav-bar {
    background-color: $backgroundColor;
    height: $height;
  }
  .back {
    color: #464646;
    background-color: $backgroundColor;
    border: none;
  }
  .iconjiantou2 {
    font-size: common.baseSize(18);
  }
  h1 {
    font-size: common.baseSize(16);
    font-weight: bold;
  }
  .home-icon {
    font-size: common.baseSize(18);
    color: #ff4f5d;
    display: block;
  }
}
</style>
