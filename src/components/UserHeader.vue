<template>
  <header>
    <button class="back" @click="$router.back()">
      <span class="iconfont iconjiantou2"></span>
    </button>
    <h1>{{ title }}</h1>
    <router-link to="/">
      <van-icon name="wap-home-o" class="home-icon" />
    </router-link>
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

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: common.baseSize(21) common.baseSize(26);
  $headerFontSize: common.baseSize(20);
  .back {
    color: #464646;
    border: none;
  }
  .iconjiantou2 {
    font-size: $headerFontSize;
  }
  h1 {
    font-size: $headerFontSize;
    font-weight: 700;
  }
  .home-icon {
    font-size: $headerFontSize;
    color: #ff4f5d;
    display: block;
  }
}
</style>
