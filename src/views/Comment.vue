<template>
  <div class="comment" @click="isInputting = false">
    <UserHeader title="精彩跟帖" />
    <van-list class="comment_list">
      <NewsArticleComment :articleComments="comments" />
    </van-list>
    <div :class="{ comment_bottom: true, inputting: isInputting }">我也是有底线的</div>
    <CommentInputBar
      :article="article"
      :isInputting="isInputting"
      @click.stop
      @inputting="isInputting = true"
      @stararticle="article.has_star = !article.has_star"
      @sendcomment="isInputting = false"
    />
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import NewsArticleComment from '@/components/NewsArticleComment'
import CommentInputBar from '@/components/CommentInputBar.vue'
import axios from '@/utils/axios_http-config'

export default {
  name: 'Comment',
  components: {
    UserHeader,
    NewsArticleComment,
    CommentInputBar
  },
  data () {
    return {
      article: {
        title: '文章标题',
        content: '文章内容',
        comment_length: 0,
        user: {
          nickname: '作者',
          create_date: 'xxxx-xx-xx'
        },
        cover: [
          { url: '' }
        ],
        has_follow: false,
        has_like: false,
        has_star: false,
        type: 1,
        like_length: 0,
      },
      comments: [],
      isInputting: false
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    const id = this.$route.params.id

    const [getArticleDetialErr, getArticleDetialRes] = await this.$api.getArticleDetialById(id)

    if (getArticleDetialErr) {
      return this.$toast.fail('获取文章数据错误')
    }

    this.article = getArticleDetialRes.data.data

    const [err, res] = await this.$api.getComments(this.$route.params.id)

    // console.log(res)

    if (err) {
      return this.$toast.fail('获取评论数据出错')
    } else if (res.data.statusCode) {
      return
    }

    this.comments = res.data.data.map(v => {
      const baseURL = axios.defaults.baseURL
      const defaultImg = baseURL + '/uploads/image/default.jpeg'
      const userHeadImg = v.user.head_img
      v.user.head_img = userHeadImg === '' ? defaultImg : baseURL + userHeadImg
      return v
    })
  },
  methods: {
    async initPage () {

    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";
.comment {
  &_bottom {
    margin-top: common.baseSize(22);
    padding-bottom: common.baseSize(52);
    text-align: center;
    font-size: common.baseSize(14);
    color: #707070;
    &.inputting {
      padding-bottom: common.baseSize(120);
    }
  }
}
</style>
