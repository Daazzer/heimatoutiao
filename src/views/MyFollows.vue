<template>
  <div class="my-follows">
    <UserHeader title="我的关注" />
    <van-list class="my-follows-list" v-for="(followUser, index) in followUsers" :key="followUser.id">
      <div class="my-follows-list_item">
        <van-image round :src="followUser.head_img" alt="用户头像" />
        <div class="user-info">
          <p class="user-info_name">{{ followUser.nickname }}</p>
          <span class="user-info_date">{{ followUser.create_date | dateFormat }}</span>
        </div>
        <van-button class="btn" size="mini" round @click="unfollowUser(followUser.id, index)">取消关注</van-button>
      </div>
    </van-list>
    <p class="nofollows" v-if="followUsers.length <= 0">没有关注</p>
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import { dateFormat } from '@/utils/filters'
import axios from '@/utils/axios_http-config'

export default {
  name: 'MyFollows',
  components: {
    UserHeader
  },
  data () {
    return {
      followUsers: []
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getUserFollows()

    if (err) {
      return this.$toast.fail('获取关注列表失败，发生错误')
    }

    this.followUsers = res.data.data.map(v => ({
      ...v,
      // 覆盖原来的数据
      head_img: axios.defaults.baseURL + v.head_img
    }))
  },
  methods: {
    async unfollowUser (id, index) {
      const [err, res] = await this.$api.unfollowUser(id)

      if (err) {
        return this.$toast.fail('取消关注失败，发生错误')
      }

      this.$toast.success(res.data.message)

      this.followUsers.splice(index, 1)
    }
  },
  filters: {
    dateFormat
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.my-follows-list {
  &_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: common.baseSize(80);
    padding: common.baseSize(20);
    border-bottom: 1px solid #ccc;
    ::v-deep .van-image__img {
      $size: common.baseSize(50);
      display: block;
      width: $size;
      height: $size;
      margin-right: common.baseSize(16);
    }
    .user-info {
      flex: 1;
      &_name {
        margin-bottom: common.baseSize(5);
        font-size: common.baseSize(14);
      }
      &_date {
        font-size: common.baseSize(12);
        color: #707070;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: common.baseSize(9) common.baseSize(12);
      min-height: common.baseSize(30);
      font-size: common.baseSize(12);
      color: #363636;
      background-color: #e1e1e1;
    }
  }
}
.nofollows {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: common.baseSize(300);
  color: #707070;
}
</style>
