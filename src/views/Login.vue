<template>
  <div class="login">
    <LogoHeader />
    <form class="login-form">
      <UserInput
        placeholder="用户名/手机号码"
        type="text"
        v-model="user.username"
        :rules="validateName"
        maxlength="11"
        tipsMsg="请输入用户名或合法的11位手机号码"
      />
      <UserInput
        placeholder="密码"
        type="password"
        v-model="user.password"
        :rules="validatePassword"
        maxlength="16"
        tipsMsg="请输入3-16位密码"
      />
      <p class="tips">
        没有账号？
        <b-link to="/register">去注册</b-link>
      </p>
      <b-button
        pill
        variant="danger"
        :pressed="false"
        class="login-btn shadow-none"
        type="submit"
        @click="login"
      >登录</b-button>
    </form>
  </div>
</template>

<script>
import UserInput from '@/components/UserInput.vue'
import LogoHeader from '@/components/LogoHeader.vue'

export default {
  name: 'Login',
  components: {
    UserInput,
    LogoHeader
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      validateName: /(?:^\w{4,5}$|^1[35789]\d{9}$)/,
      validatePassword: /^\w{3,16}$/
    }
  },
  methods: {
    async login (e) {
      e.preventDefault()
      const { username, password } = this.user
      const userName = username.trim()
      const userPassword = password.trim()
      if (userName === '' || userPassword === '') {
        return this.$alertMsgBox('danger', '输入框不能为空')
      } else if (!this.validateName.test(userName) || !this.validatePassword.test(userPassword)) {
        return this.$alertMsgBox('danger', '用户名或密码错误')
      }

      // 同步获取响应或错误
      const [err, res] = await this.$api.login(this.user)

      if (err) {
        this.$alertMsgBox('danger', '登录失败，' + err.message)
      } else if (!res.data.statusCode) {
        window.localStorage.setItem('heimatoutiao_token', res.data.data.token)
        this.$alertMsgBox('success', '登录成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$page: login;
.#{$page} {
  padding: 20px;
}

.#{$page}-form {
  .tips {
    text-align: right;
    margin-bottom: 1rem;
  }

  .#{$page}-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1.333333rem;
    font-size: 0.5rem;
    border: none;
    background-color: #cc3300;
    color: #fff;
  }
}
</style>
