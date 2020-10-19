<template>
  <div>
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <input placeholder="请输入手机号" class="input" />
        <input
          placeholder="密码"
          class="input"
          type="password"
        />
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <div data-v-4bc01e24="" class="button">登录按钮</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 0.75rem;
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

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
