<template>
  <div class="login">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <form class="login-form">
      <input placeholder="用户名" maxlength="11" />
      <input placeholder="密码" type="password" />
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <button class="login-btn" type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
$page: login;

.#{$page} {
  padding: 20px;
}

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

.#{$page}-form {
  input {
    display: block;
    width: 100%;
    margin-bottom: 0.555556rem;
    padding: 0.416667rem 0;
    border-bottom: 2px solid #757575;
    background-color: #f2f2f2;
    font-size: 0.5rem;
  }

  .tips {
    text-align: right;
    margin-bottom: 0.555556rem;
  }

  .#{$page}-btn {
    $loginBtnHeight: 1.333333rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: $loginBtnHeight;
    font-size: 0.5rem;
    background-color: #cc3300;
    color: #fff;
    border-radius: $loginBtnHeight / 2;
  }
}
</style>
