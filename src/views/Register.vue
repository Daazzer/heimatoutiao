<template>
  <div class="register">
    <LogoHeader />
    <form class="register-form">
      <UserInput
        placeholder="用户名/手机号"
        type="text"
        v-model="user.username"
        :rules="validateUsername"
        maxlength="11"
        tipsMsg="请输入用户名或合法的11位手机号码"
        id="userName"
        name="username"
      />
      <UserInput
        placeholder="昵称"
        type="text"
        v-model="user.nickname"
        :rules="validateNickname"
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
        tipsMsg="请输入3-16位密码"
        id="passWord"
        name="password"
      />
      <UserButton class="register-form_btn" @click.prevent="register">注册</UserButton>
    </form>
  </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'
import UserInput from '@/components/UserInput.vue'
import UserButton from '@/components/UserButton.vue'

export default {
  name: 'Register',
  components: {
    UserInput,
    LogoHeader,
    UserButton
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      validateUsername: /(?:^\w{4,5}$|^1[35789]\d{9}$)/,
      validatePassword: /^\w{3,16}$/,
      validateNickname: /^\w+$/
    }
  },
  methods: {
    async register () {
      const { username, password, nickname } = this.user
      const userName = username
      const userPassword = password
      const userNickname = nickname

      if (userName === '' || userPassword === '' || userNickname === '') {
        return this.$alertMsgBox('danger', '输入框不能为空')
      } else if (!this.validateUsername.test(userName) || !this.validatePassword.test(userPassword) || !this.validateNickname.test(userNickname)) {
        return this.$alertMsgBox('danger', '无效的用户名或密码或昵称')
      }

      const [err, res] = await this.$api.register(this.user)

      if (err) {
        this.$alertMsgBox('danger', '注册失败，发生错误')
      } else if (res.data.statusCode) {
        this.$alertMsgBox('danger', '注册失败')
        console.log(res)
      } else {
        this.$alertMsgBox('success', res.data.message)
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";
$page: register;

.#{$page} {
  padding: common.baseSize(20);
  &-form_btn {
    margin-top: common.baseSize(30);
  }
}
</style>
