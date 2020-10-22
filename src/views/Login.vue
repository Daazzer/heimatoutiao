<template>
  <div class="login">
    <LogoHeader />
    <form class="login-form">
      <UserInput
        placeholder="用户名/手机号码"
        type="text"
        v-model="user.username"
        :rules="validateUsername"
        maxlength="11"
        tipsMsg="请输入用户名或合法的11位手机号码"
        name="username"
        id="userName"
      />
      <UserInput
        placeholder="密码"
        type="password"
        v-model="user.password"
        :rules="validatePassword"
        maxlength="16"
        tipsMsg="请输入3-16位密码"
        name="password"
        id="passWord"
      />
      <p class="tips">
        没有账号？
        <b-link to="/register">去注册</b-link>
      </p>
      <UserButton @click.prevent="login">登录</UserButton>
    </form>
  </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'
import UserInput from '@/components/UserInput.vue'
import UserButton from '@/components/UserButton.vue'

export default {
  name: 'Login',
  components: {
    UserInput,
    LogoHeader,
    UserButton
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      validateUsername: /(?:^\w{4,5}$|^1[35789]\d{9}$)/,
      validatePassword: /^\w{3,16}$/
    }
  },
  methods: {
    async login () {
      const { username, password } = this.user
      const userName = username
      const userPassword = password
      const token = window.localStorage.getItem('heimatoutiao_token')

      if (userName === '' || userPassword === '') {
        return this.$alertMsgBox('danger', '输入框不能为空')
      } else if (!this.validateUsername.test(userName) || !this.validatePassword.test(userPassword)) {
        return this.$alertMsgBox('danger', '用户名或密码错误')
      } else if (token) {
        return this.$alertMsgBox('warning', '你已登录，请不要重复登录')
      }

      // 同步获取响应或错误
      const [err, res] = await this.$api.login(this.user)

      if (err) {
        this.$alertMsgBox('danger', '登录失败，发生错误')
      } else if (res.data.statusCode) {
        this.$alertMsgBox('danger', '登录失败，' + res.data.message)
      } else {
        window.localStorage.setItem('heimatoutiao_token', res.data.data.token)
        const { id } = res.data.data.user
        this.$route.params.id = id
        this.$router.push({ path: `/personal/${id}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

$page: login;
.#{$page} {
  padding: common.baseSize(20);
}

.#{$page}-form {
  .tips {
    text-align: right;
    margin-bottom: common.baseSize(36);
  }
}
</style>
