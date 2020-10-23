<template>
  <div class="personal">
    <router-link class="personal_link" :to="`/edit_profile/${id}`">
      <div class="profile">
        <img :src="userInfo.headImg" alt="用户头像" />
        <div class="profile_center">
          <h2 class="name">
            <span
              :class="['iconfont', `iconxingbie${getGender}`, 'gender-icon']"
            ></span
            >{{ userInfo.nickName }}
          </h2>
          <div class="time">{{ userInfo.createDate | time }}</div>
        </div>
        <span class="iconfont iconjiantou1 arrow-r"></span>
      </div>
    </router-link>
    <div class="personal_option-group">
      <PersonalOption title="我的关注" desc="关注的用户" />
      <PersonalOption title="我的跟帖" desc="跟帖/回复" />
      <PersonalOption title="我的收藏" desc="文章/视频" />
      <PersonalOption title="设置" />
    </div>
    <div class="personal_btn-wrapper">
      <UserButton @click="logout">退出</UserButton>
    </div>
  </div>
</template>

<script>
import PersonalOption from '@/components/PersonalOption.vue'
import UserButton from '@/components/UserButton.vue'
import axios from '@/utils/axios_http-config'

export default {
  name: 'Personal',
  components: {
    PersonalOption,
    UserButton
  },
  data () {
    return {
      id: -1,
      userInfo: {
        headImg: '',
        gender: 1,
        nickName: '未知用户',
        createDate: 'xxxx-xx-xx'
      }
    }
  },
  async mounted () {
    const { id } = this.$route.params

    const [err, res] = await this.$api.getUser(id)

    if (err) {
      this.$toast.fail('获取用户数据失败')
    } else {
      const { create_date, gender, head_img, nickname } = res.data.data
      this.id = id
      this.userInfo.headImg = head_img === '' ? axios.defaults.baseURL + '/uploads/image/default.jpeg' : axios.defaults.baseURL +  head_img
      this.userInfo.gender = gender
      this.userInfo.nickName = nickname
      this.userInfo.createDate = create_date
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('heimatoutiao_userInfo')
      this.$router.push({ name: 'Login' })
    },
  },
  computed: {
    getGender () {
      const gender = this.userInfo.gender
      switch (gender) {
        case 1:
          return 'nan'
        case 0:
          return 'nv'
      }
    }
  },
  filters: {
    time (createDate) {
      const date = new Date(createDate)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDay()

      const dateArr = [year, month, day]

      const notDate = dateArr.some(v => isNaN(v))

      if (notDate) {
        return createDate
      } else {
        return dateArr.join('-')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@use "@/styles/common.scss";

.personal {
  padding: 0;
  &_link {
    display: block;
  }
  &_option-group {
    margin-bottom: common.baseSize(36);
  }
  &_btn-wrapper {
    padding: 0 common.baseSize(20);
  }
}

.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 common.baseSize(15) 0 common.baseSize(24);
  height: common.baseSize(130);
  border-bottom: common.baseSize(5) #e4e4e4 solid;
  color: #333;

  img {
    $size: common.baseSize(70);
    width: $size;
    height: $size;
    border-radius: 50%;
  }

  &_center {
    flex: 1;
    padding: 0 common.baseSize(14);
  }

  .name {
    $fontSize: common.baseSize(16);
    margin-bottom: common.baseSize(10);
    font-size: $fontSize;
    .gender-icon {
      margin-right: common.baseSize(5);
      font-size: $fontSize;
      color: #75b9eb;
    }
  }

  .time {
    color: #a0a0a0;
    font-size: common.baseSize(14);
  }

  .arrow-r {
    font-size: common.baseSize(15);
    color: #b6b6b6;
  }
}
</style>
