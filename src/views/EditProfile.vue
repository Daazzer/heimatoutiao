<template>
  <div class="editprofile">
    <header>
      <span class="iconfont iconjiantou2"></span>
      <h1>编辑用户资料</h1>
      <b-link to="/">
        <BIconHouseDoor class="home-icon" />
      </b-link>
    </header>
    <div class="avatar">
      <b-img rounded="circle" :src="headImg" alt="用户头像" />
      <b-form-file class="avatar_uploader" plain name="file" />
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
      centered
      hide-backdrop
      id="editModal"
      title="BootstrapVue"
      modal-class="edit-modal"
      ok-variant="danger"
    >
      <p class="my-2">
        We've added the utility dasdadsadsdsa <code>'shadow'</code>
        to the modal content for added effect.
      </p>
    </b-modal>
  </div>
</template>

<script>
import { BIconHouseDoor } from 'bootstrap-vue'
import PersonalOption from '@/components/PersonalOption.vue'
import axios from '@/utils/axios_http-config'

export default {
  name: 'EditProfile',
  components: {
    PersonalOption,
    BIconHouseDoor
  },
  data () {
    return {
      headImg: '',
      gender: 1,
      nickName: '未知用户',
      passWord: ''
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const [err, res] = await this.$api.getUser(id)

    if (err) {
      this.$alertMsgBox('danger', '获取用户数据失败')
    } else {
      const { password, gender, head_img, nickname } = res.data.data
      this.headImg = head_img === '' ? axios.defaults.baseURL + '/uploads/image/IMG1568705287936.jpeg' : head_img
      this.gender = gender
      this.nickName = nickname
      this.passWord = password
    }
  },
  methods: {
    editNickname (e) {
      this.$bvModal.show('editModal')
    },
    editPassword (e) {
      console.log('pwd')
    },
    editGender (e) {
      console.log('gender')
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
