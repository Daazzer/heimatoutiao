<template>
  <div class="editprofile">
    <header>
      <b-link class="back" :to="`/personal/${id}`">
        <span class="iconfont iconjiantou2"></span>
      </b-link>
      <h1>编辑用户资料</h1>
      <b-link to="/">
        <BIconHouseDoor class="home-icon" />
      </b-link>
    </header>
    <div class="avatar">
      <b-img rounded="circle" :src="headImg" alt="用户头像" />
      <b-form-file
        class="avatar_uploader"
        @change="editHeadImg"
        plain
        :value="imgFile"
        name="head_img"
      />
    </div>
    <PersonalOption title="昵称" :desc="nickName" @click="editNickname" />
    <PersonalOption
      title="密码"
      :desc="passWord"
      type="password"
      @click="editPassword"
    />
    <PersonalOption title="性别" :desc="getGender" @click="editGender" />
    <b-modal
      id="editModal"
      ref="modal"
      :title="`编辑${editTitle}`"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-variant="danger"
      hide-header-close
      ok-title="确认"
      cancel-title="取消"
    >
      <form ref="editForm" @submit.stop.prevent="handleSubmit">
        <BFormGroup v-if="editTitle === '性别'">
          <b-container fluid>
            <b-col offset="2">
              <BFormRadio v-model="editVal" name="gender" :value="1"
                >男</BFormRadio
              >
              <BFormRadio v-model="editVal" name="gender" :value="0"
                >女</BFormRadio
              >
            </b-col>
          </b-container>
        </BFormGroup>
        <BFormGroup
          v-else
          :state="editState"
          :invalid-feedback="`${editTitle}不能为空`"
        >
          <BFormInput
            id="editInput"
            v-model="editVal"
            :state="editState"
            required
          ></BFormInput>
        </BFormGroup>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { BIconHouseDoor, BFormGroup, BFormInput, BFormRadio } from 'bootstrap-vue'
import PersonalOption from '@/components/PersonalOption.vue'
import axios from '@/utils/axios_http-config'

export default {
  name: 'EditProfile',
  components: {
    PersonalOption,
    BIconHouseDoor,
    BFormGroup,
    BFormInput,
    BFormRadio
  },
  data () {
    return {
      id: 0,
      headImg: '',
      gender: 1,
      nickName: '未知用户',
      passWord: '',
      editVal: '',
      editTitle: '',
      editState: null,
      imgFile: null
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const [err, res] = await this.$api.getUser(id)
    this.id = id

    if (err) {
      this.$alertMsgBox('danger', '获取用户数据失败')
    } else {
      const { password, gender, head_img, nickname } = res.data.data
      this.headImg = head_img === '' ? axios.defaults.baseURL + '/uploads/image/IMG1568705287936.jpeg' : axios.defaults.baseURL + head_img
      this.gender = gender
      this.nickName = nickname
      this.passWord = password
    }
  },
  methods: {
    editNickname (e, title) {
      this.$bvModal.show('editModal')
      this.editTitle = title
      this.editVal = this.nickName
    },
    editPassword (e, title) {
      this.$bvModal.show('editModal')
      this.editTitle = title
      this.editVal = this.passWord
    },
    editGender (e, title) {
      this.$bvModal.show('editModal')
      this.editTitle = title
      this.editVal = this.gender
    },
    checkFormValidity () {
      const valid = this.$refs.editForm.checkValidity()
      this.editState = valid ? null : valid
      return valid
    },
    resetModal () {
      this.editVal = ''
      this.editState = null
    },
    async editHeadImg (e) {
      const fd = new FormData();
      const uploadFile = e.target.files[0]
      const imgSrc = URL.createObjectURL(uploadFile)

      this.headImg = imgSrc

      fd.append('file', uploadFile)

      const [uploadErr, uploadRes] = await this.$api.fileUpload(fd)

      if (uploadErr) {
        return this.$alertMsgBox('danger', '图片上传错误')
      } else if (uploadRes.data.statusCode) {
        return this.$alertMsgBox('danger', uploadRes.data.message)
      }

      const imgUrl = uploadRes.data.data.url

      const [updateInfoErr, updateInfoRes] = await this.$api.userUpdate(this.id, { head_img: imgUrl })

      if (updateInfoErr) {
        this.$alertMsgBox('danger', '头像修改错误')
      } else if (updateInfoRes.data.statusCode) {
        this.$alertMsgBox('danger', '头像修改失败')
      } else {
        this.$alertMsgBox('success', '头像修改成功')
      }
    },
    async handleOk (bvModalEvt) {
      if (!this.checkFormValidity()) {
        bvModalEvt.preventDefault()
        return
      }
      let key = ''
      switch (this.editTitle) {
        case '昵称':
          key = 'nickname'
          break
        case '密码':
          key = 'password'
          break
        case '性别':
          key = 'gender'
          break
      }

      const [err, res] = await this.$api.userUpdate(this.id, { [key]: this.editVal })

      if (err) {
        this.$alertMsgBox('danger', '发生错误')
      } else if (res.data.statusCode) {
        this.$alertMsgBox('danger', '修改失败，' + res.data.message)
      } else {
        switch (this.editTitle) {
          case '昵称':
            this.nickName = res.data.data.nickname
            break
          case '密码':
            this.passWord = this.editVal
            break
          case '性别':
            this.gender = res.data.data.gender
            break
        }
        this.$alertMsgBox('success', res.data.message)
      }
    }
  },
  computed: {
    getGender () {
      const gender = this.gender
      switch (gender) {
        case 0:
          return '女'
        case 1:
          return '男'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: common.baseSize(21) common.baseSize(26);
  $headerFontSize: common.baseSize(20);
  .back {
    color: #464646;
  }
  .iconjiantou2 {
    font-size: $headerFontSize;
  }
  h1 {
    font-size: $headerFontSize;
    font-weight: 700;
  }

  .home-icon {
    font-size: $headerFontSize;
    color: #ff4f5d;
    display: block;
  }
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: common.baseSize(170);
  position: relative;

  $imgSize: common.baseSize(88);

  img {
    height: $imgSize;
    width: $imgSize;
  }

  &_uploader {
    @extend img;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
