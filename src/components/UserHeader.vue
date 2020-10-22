<template>
  <header>
    <b-link class="back" :to="goback">
      <span class="iconfont iconjiantou2"></span>
    </b-link>
    <h1>{{ title }}</h1>
    <b-link to="/">
      <BIconHouseDoor class="home-icon" />
    </b-link>
  </header>
</template>

<script>
import { BIconHouseDoor } from 'bootstrap-vue'
export default {
  name: 'UserHeader',
  components: {
    BIconHouseDoor
  },
  props: {
    title: {
      required: true,
      type: String
    },
    goback: {
      required: true,
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
