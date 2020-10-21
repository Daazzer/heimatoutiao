<template>
  <div class="register">
    <LogoHeader />
    <form class="register-form">
      <UserInput
        placeholder="用户名/手机号"
        type="text"
        v-model="user.username"
        :rules="validateName"
        maxlength="11"
        tipsMsg="请输入用户名或合法的11位手机号码"
        id="userName"
        name="username"
      />
      <UserInput
        placeholder="昵称"
        type="text"
        v-model="user.nickname"
        :rules="validateName"
        maxlength="11"
        tipsMsg="请输入昵称"
        id="nickName"
        name="nickname"
      />
      <UserInput
        placeholder="密码"
        type="password"
        v-model="user.password"
        :rules="validatePassword"
        maxlength="16"
        tipsMsg="请输入3-16位大小写字母与数字混合的密码"
        id="passWord"
        name="password"
      />
      <b-button
        pill
        variant="danger"
        :pressed="false"
        class="register-btn shadow-none"
        type="submit"
        @click="login"
      >注册</b-button>
    </form>
  </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'
import UserInput from '@/components/UserInput.vue'

export default {
  name: 'Register',
  components: {
    UserInput,
    LogoHeader
  },
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      validateName: /(?:^\w{4,5}$|^1[35789]\d{9}$)/,
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
$page: register;

.#{$page} {
  padding: 20px;
}

.#{$page}-form {
  .#{$page}-btn {
    margin-top: 2rem;
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
