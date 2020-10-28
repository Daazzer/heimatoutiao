<template>
  <div class="comment" @click="isInputting = false">
    <UserHeader title="精彩跟帖" />
    <van-list class="comment_list">
      <NewsArticleComment
        :articleComments="comments"
        @replycomment="handleReplyComment"
      />
    </van-list>
    <div :class="{ comment_bottom: true, inputting: isInputting }">我也是有底线的</div>
    <CommentInputBar
      :article="article"
      :isInputting="isInputting"
      :replyUser="replyUser"
      @click.stop
      @inputting="isInputting = true"
      @stararticle="article.has_star = !article.has_star"
      @sendcomment="handleSendComment"
      @cancelreply="replyUser = null"
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
      replyUser: null,
      isInputting: false
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    async initPage () {
      // 根据id获取文章的详情，实现文章详情的动态渲染
      const id = this.$route.params.id

      const [getArticleDetialErr, getArticleDetialRes] = await this.$api.getArticleDetialById(id)

      if (getArticleDetialErr) {
        return this.$toast.fail('获取文章数据错误')
      }

      this.article = getArticleDetialRes.data.data

      const [getCommentsErr, getCommentsRes] = await this.$api.getComments(this.$route.params.id, { pageIndex: 1, pageSize: 40 })

      // console.log(getCommentsRes)

      if (getCommentsErr) {
        return this.$toast.fail('获取评论数据出错')
      } else if (getCommentsRes.data.statusCode) {
        return
      }

      this.comments = getCommentsRes.data.data.map(v => {
        const baseURL = axios.defaults.baseURL
        const defaultImg = baseURL + '/uploads/image/default.jpeg'
        const userHeadImg = v.user.head_img
        v.user.head_img = userHeadImg === '' ? defaultImg : baseURL + userHeadImg
        return v
      })
    },
    handleSendComment () {
      this.isInputting = false
      this.replyUser = null
      this.initPage()
      window.scrollTo(0, 0)
    },
    handleReplyComment (replyUser, e) {
      e.stopPropagation()
      this.isInputting = true
      this.replyUser = replyUser
    }
  }
}
</script>

<style lang="scss">
body {
  height: 100vh;
}
</style>

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
