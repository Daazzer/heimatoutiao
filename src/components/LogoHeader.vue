<template>
  <div>
    <button @click="$router.back()" class="close-btn">
      <span class="iconfont iconicon-test"></span>
    </button>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoHeader'
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.close-btn {
  background-color: transparent;
  border: none;
  .iconicon-test {
    font-size: common.baseSize(21);
    font-weight: 700;
    color: #3d3d3d;
  }
}
.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: common.baseSize(126);
    color: #d81e06;
  }
}
</style>
