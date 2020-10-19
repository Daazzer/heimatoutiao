<template>
  <div class="login">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <form class="login-form">
      <ToutiaoInput
        placeholder="用户名/手机号"
        type="text"
        v-model="user.name"
        :rules="/(?:^[A-Za-z]\w{4,5}$|^1\d{10}$)/"
        maxlength="11"
        tipsMsg="请输入首字母开头的用户名或11位手机号码"
      />
      <ToutiaoInput
        placeholder="密码"
        type="password"
        v-model="user.password"
        :rules="/(?:^\w{8,16}$)/"
        maxlength="16"
        tipsMsg="请输入8-16位大小写字母与数字混合的密码"
      />
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <Button class="login-btn" native-type="submit" @click="login">登录</Button>
    </form>
  </div>
</template>

<script>
import ToutiaoInput from '@/components/ToutiaoInput.vue'
import Vue from 'vue'
import { Button } from 'vant'

Vue.use(Button)

export default {
  name: 'Login',
  components: {
    ToutiaoInput,
    Button
  },
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
    }
  }
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
  .tips {
    text-align: right;
    margin-bottom: 1rem;
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
