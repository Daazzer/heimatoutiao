<template>
  <div>
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
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
.close {
  .iconicon-test {
    font-size: 0.75rem;
    color: #3d3d3d;
  }
}

.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: 3.5rem;
    color: #d81e06;
  }
}
</style>
