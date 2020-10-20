<template>
  <b-container class="personal" fluid>
    <b-link class="personal_link" to="/edit_profile">
      <div class="profile">
        <img
          src="http://img1.imgtn.bdimg.com/it/u=3757784226,1202878475&fm=26&gp=0.jpg"
          alt="用户头像"
        />
        <div class="profile_center">
          <h2 class="name">
            <span class="iconfont iconxingbienan gender-icon"></span>我就是我
          </h2>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1 arrow-r"></span>
      </div>
    </b-link>
    <div class="personal_option-group">
      <PersonalOption title="我的关注" desc="关注的用户" />
      <PersonalOption title="我的跟帖" desc="跟帖/回复" />
      <PersonalOption title="我的收藏" desc="文章/视频" />
      <PersonalOption title="设置" />
    </div>
    <b-container fluid>
      <UserButton @click="logout">退出</UserButton>
    </b-container>
  </b-container>
</template>

<script>
import PersonalOption from '@/components/PersonalOption.vue'
import UserButton from '@/components/UserButton.vue'

export default {
  name: 'Personal',
  components: {
    PersonalOption,
    UserButton
  },
  methods: {
    logout () {
      window.localStorage.removeItem('heimatoutiao_token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang='scss' scoped>
.personal {
  padding: 0;
  &_link {
    display: block;
  }
  &_option-group {
    margin-bottom: 1rem;
  }
}

.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.416667rem 0 0.638889rem;
  height: 3.722222rem;
  border-bottom: 0.138889rem #e4e4e4 solid;
  color: #333;

  img {
    $size: 1.944444rem;
    width: $size;
    height: $size;
    border-radius: 50%;
  }

  &_center {
    flex: 1;
    padding: 0 0.277778rem;
  }

  .name {
    margin-bottom: 0.277778rem;
    font-size: 0.388889rem;
    .gender-icon {
      margin-right: 0.166667rem;
      font-size: 0.388889rem;
      color: #75b9eb;
    }
  }

  .time {
    color: #a0a0a0;
    font-size: 0.277778rem;
  }

  .arrow-r {
    font-size: 0.388889rem;
    color: #b6b6b6;
  }
}
</style>
