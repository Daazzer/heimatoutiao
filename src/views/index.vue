<template>
  <div class="header">
      <div class="logo">
          <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
          <van-icon name="search" />
          <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({path:`/personal/${id}`})">
          <van-icon name="manager-o" />
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.index {
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
  }
  .search{
    flex: 1;
    height: 30px;
    background-color: rgba(255,255,255,0.4);
    border-radius: 15px;
    text-align: center;
    line-height: 30px;
    .van-icon{
      font-size: 16px;
    }
  }
  .van-icon{
    font-size: 24px;
    padding: 0 10px;
  }
  .iconfont{
    font-size: 50px;
    padding: 0 10px;
  }
}
</style>
