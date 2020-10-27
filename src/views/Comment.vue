<template>
  <div class="comment">
    <UserHeader title="精彩跟帖" />
    <van-list class="comment_list">
      <NewsArticleComment :articleComments="comments" />
    </van-list>
    <div class="comment_bottom">我也是有底线的</div>
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import NewsArticleComment from '@/components/NewsArticleComment'
export default {
  name: 'Comment',
  components: {
    UserHeader,
    NewsArticleComment
  },
  data () {
    return {
      comments: []
    }
  },
  async mounted () {
    const [err, res] = await this.$api.getComments(this.$route.params.id)

    console.log(res)
    if (err) {
      return this.$toast.fail('获取评论数据出错')
    } else if (res.data.statusCode) {
      return
    }

    this.comments = res.data.data
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.comment {
  &_bottom {
    margin-top: common.baseSize(22);
    padding-bottom: common.baseSize(36);
    text-align: center;
    font-size: common.baseSize(14);
    color: #707070;
  }
}
</style>
