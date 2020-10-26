<template>
  <div class="myStars">
    <UserHeader title="我的收藏" />
    <van-list>
      <NewsArticleItem
        v-for="newsArticleItem in newsArticleItems"
        :key="newsArticleItem.id"
        :news="newsArticleItem"
      />
    </van-list>
    <p v-if="newsArticleItems.length <= 0" class="nostars">收藏夹空空如也</p>
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import NewsArticleItem from '@/components/NewsArticleItem.vue'

export default {
  name: 'MyStars',
  components: {
    UserHeader,
    NewsArticleItem
  },
  data () {
    return {
      newsArticleItems: []
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getUserStars()

    if (err) {
      return this.$toast.fail('获取收藏文章失败，发生错误')
    }

    this.newsArticleItems = res.data.data.map(v => ({
      ...v,
      // 添加数据项
      comment_length: v.comments.length
    }))
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.nostars {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: common.baseSize(300);
  color: #707070;
}
</style>
