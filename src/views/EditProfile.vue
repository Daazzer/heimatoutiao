<template>
  <div class="editprofile">
    <UserHeader title="编辑用户资料" :goback="`/personal/${id}`" />
    <div class="avatar">
      <van-image round :src="userInfo.headImg" alt="用户头像" />
      <VanUploader
        class="avatar_uploader"
        :after-read="editHeadImg"
        name="head_img"
      />
    </div>
    <PersonalOption title="昵称" :desc="userInfo.nickName" @click="openEditor" />
    <PersonalOption
      title="密码"
      :desc="userInfo.passWord"
      type="password"
      @click="openEditor"
    />
    <PersonalOption title="性别" :desc="getGender" @click="openEditor" />
    <VanDialog
      :title="`修改${editorTitle}`"
      show-cancel-button
      v-model="editorShow"
      :before-close="preventEditorClose"
      @confirm="handleConfirm"
    >
      <VanRadioGroup
        class="gender-radio-group"
        v-if="editorTitle === '性别'"
        v-model="editorVal"
        direction="horizontal"
      >
        <VanRadio :name="1">男</VanRadio>
        <VanRadio :name="0">女</VanRadio>
      </VanRadioGroup>
      <VanField
        v-else-if="editorTitle === '昵称'"
        :label="`你的${editorTitle}`"
        :placeholder="`请输入${editorTitle}`"
        v-model="editorVal"
      />
      <VanCellGroup v-else-if="editorTitle === '密码'">
        <VanField
          v-model="originPassword"
          required
          type="password"
          label="原密码"
          placeholder="请输入原密码"
        />
        <VanField
          v-model="newPassword"
          type="password"
          required
          label="新密码"
          placeholder="请输入新密码"
        />
      </VanCellGroup>
    </VanDialog>
  </div>
</template>

<script>
import {
  Uploader as VanUploader,
  Dialog,
  Field as VanField,
  RadioGroup as VanRadioGroup,
  Radio as VanRadio,
  CellGroup as VanCellGroup
} from 'vant'
import UserHeader from '@/components/UserHeader.vue'
import PersonalOption from '@/components/PersonalOption.vue'
import axios from '@/utils/axios_http-config'

export default {
  name: 'EditProfile',
  components: {
    PersonalOption,
    UserHeader,
    VanUploader,
    VanDialog: Dialog.Component,
    VanField,
    VanRadioGroup,
    VanRadio,
    VanCellGroup
  },
  data () {
    return {
      id: 0,
      userInfo: {
        headImg: '',
        gender: 1,
        nickName: '未知用户',
        passWord: '',
      },
      editorShow: false,
      editorVal: '',
      editorTitle: '',
      originPassword: '',
      newPassword: ''
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const [err, res] = await this.$api.getUser(id)
    this.id = id

    if (err) {
      this.$toast.fail('获取用户数据失败')
    } else {
      const { password, gender, head_img, nickname } = res.data.data
      this.userInfo.headImg = head_img === '' ? axios.defaults.baseURL + '/uploads/image/default.jpeg' : axios.defaults.baseURL + head_img
      this.userInfo.gender = gender
      this.userInfo.nickName = nickname
      this.userInfo.passWord = password
    }
  },
  methods: {
    openEditor (e, title) {
      this.editorShow = true
      this.editorTitle = title
      switch (title) {
        case '昵称':
          this.editorVal = this.userInfo.nickName
          break
        case '性别':
          this.editorVal = this.userInfo.gender
          break
        case '密码':
          this.originPassword = ''
          this.newPassword = ''
      }
    },
    async editNickname () {
      if (this.editorVal === '') {
        return
      }
      const [err, res] = await this.$api.userUpdate(this.id, { nickname: this.editorVal })
      if (err) {
        this.$toast.fail('发生错误')
      } else if (res.data.statusCode) {
        this.$toast.fail('修改失败，' + res.data.message)
      } else {
        this.userInfo.nickName = res.data.data.nickname
        this.$toast.success(res.data.message)
      }
    },
    async editPassword () {
      if (this.originPassword === '' || this.newPassword === '') {
        return
      } else if (this.originPassword !== this.userInfo.passWord) {
        return
      } else if (this.originPassword ===  this.newPassword) {
        return
      }

      const [err, res] = await this.$api.userUpdate(this.id, { password: this.newPassword })

      if (err) {
        this.$toast.fail('发生错误')
      } else if (res.data.statusCode) {
        this.$toast.fail('修改失败，' + res.data.message)
        console.log(res)
      } else {
        this.userInfo.passWord = this.newPassword
        this.$toast.success(res.data.message)
      }
    },
    async editGender () {
      const [err, res] = await this.$api.userUpdate(this.id, { gender: this.editorVal })
      if (err) {
        this.$toast.fail('发生错误')
      } else if (res.data.statusCode) {
        this.$toast.fail('修改失败，' + res.data.message)
      } else {
        this.userInfo.gender = res.data.data.gender
        this.$toast.success(res.data.message)
      }
    },
    preventEditorClose (action, done) {
      if (action === 'confirm') {
        switch (this.editorTitle) {
          case '密码':
            if (this.originPassword === '' || this.newPassword === '') {
              this.$toast.fail('密码不能为空')
              done(false)
              return
            } else if (this.originPassword !== this.userInfo.passWord) {
              this.$toast.fail('原始密码不符')
              done(false)
              return
            } else if (this.originPassword ===  this.newPassword ) {
              this.$toast.fail('原始密码与新密码不能相同')
              done(false)
              return
            }
            break
          case '昵称':
            if (this.editorVal === '') {
              this.$toast.fail('输入框不能为空')
              done(false)
              return
            }
            break
        }
      }
      done()
    },
    async editHeadImg (f) {
      const fd = new FormData()
      const { file, content: imgSrc } = f

      this.userInfo.headImg = imgSrc

      fd.append('file', file)

      const [uploadErr, uploadRes] = await this.$api.fileUpload(fd)

      if (uploadErr) {
        return this.$toast.fail('图片上传错误')
      } else if (uploadRes.data.statusCode) {
        return this.$toast.fail(uploadRes.data.message)
      }

      const imgUrl = uploadRes.data.data.url

      const [updateInfoErr, updateInfoRes] = await this.$api.userUpdate(this.id, { head_img: imgUrl })

      if (updateInfoErr) {
        this.$toast.fail('头像修改错误')
      } else if (updateInfoRes.data.statusCode) {
        this.$toast.fail('头像修改失败')
      } else {
        this.$toast.success('头像修改成功')
      }
    },
    handleConfirm () {
      // this.validate()
      switch (this.editorTitle) {
        case '昵称':
          this.editNickname()
          break
        case '密码':
          this.editPassword()
          break
        case '性别':
          this.editGender()
          break
      }
    }
  },
  computed: {
    getGender () {
      switch (this.userInfo.gender) {
        case 0:
          return '女'
        case 1:
          return '男'
      }
    },
    showConfirmBtn () {
      if (this.editorVal === '') {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: common.baseSize(170);
  position: relative;

  $imgSize: common.baseSize(88);

  ::v-deep img {
    height: $imgSize;
    width: $imgSize;
  }

  ::v-deep &_uploader {
    @extend img;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
.gender-radio-group {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: common.baseSize(20) 0;
}
</style>
