<template>
  <div class="login">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <form class="login-form">
      <UserInput
        placeholder="用户名/手机号"
        type="text"
        v-model="user.username"
        :rules="validateName"
        maxlength="11"
        tipsMsg="请输入首字母开头的用户名或11位手机号码"
      />
      <UserInput
        placeholder="密码"
        type="password"
        v-model="user.password"
        :rules="validatePassword"
        maxlength="16"
        tipsMsg="请输入3-16位大小写字母与数字混合的密码"
      />
      <p class="tips">
        没有账号？
        <a href="#/register">去注册</a>
      </p>
      <Button class="login-btn" native-type="submit" @click="login">登录</Button>
    </form>
  </div>
</template>

<script>
import UserInput from '@/components/UserInput.vue'
import Vue from 'vue'
import { Button, Toast } from 'vant'

Vue.use(Button).use(Toast)

export default {
  name: 'Login',
  components: {
    UserInput,
    Button
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      validateName: /(?:^\w{4,5}$|^1\d{10}$)/,
      validatePassword: /(?:^\w{3,16}$)/
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
      const { username, password } = this.user
      const userName = username.trim()
      const userPassword = password.trim()
      if (userName === '' || userPassword === '') {
        return Toast.fail('输入框不能为空')
      } else if (!this.validateName.test(userName) || !this.validatePassword.test(userPassword)) {
        return Toast.fail('用户名或密码错误')
      }

      this.$api.login(this.user).then(res => {
        console.log(res)
        if (!res.data.statusCode) {
          window.localStorage.setItem('token', res.data.data.token)
          Toast.success(res.data.message)
        } else {
          Toast.fail('登录失败，' + res.data.message)
        }
      })
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
