<template>
  <div class="comment" @click="isInputting = false">
    <UserHeader title="精彩跟帖" />
    <van-pull-refresh
      v-model="commentList.refreshing"
      @refresh="refreshPage"
      success-text="刷新成功"
    >
      <van-list
        :class="{ comment_list: true, inputting: isInputting }"
        v-model="commentList.loading"
        :finished="commentList.finished"
        finished-text="我也是有底线的"
        :error.sync="commentList.error"
        error-text="加载评论失败，点击重新加载"
        @load="loadComment"
      >
        <NewsArticleComment
          :articleComments="commentList.comments"
          @replycomment="handleReplyComment"
        />
      </van-list>
    </van-pull-refresh>
    <CommentInputBar
      :article="article"
      :expand="isInputting"
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
      commentList: {
        refreshing: false,
        loading: false,
        finished: false,
        error: false,
        pageIndex: 1,
        pageSize: 6,
        comments: []
      },
      article: {},
      replyUser: null,
      isInputting: false
    }
  },
  mounted () {
    this.initArticle()
  },
  methods: {
    async initArticle () {
      // 拿文章数据目的为了记录评论输入框的状态
      const [getArticleDetialErr, getArticleDetialRes] = await this.$api.getArticleDetialById(this.$route.params.id)

      if (getArticleDetialErr) {
        return this.$toast.fail('获取文章数据错误')
      }

      this.article = getArticleDetialRes.data.data
    },
    async loadComment (reset) {
      if (this.commentList.comments.length === 0 || reset) {
        this.commentList.pageIndex = 1
      } else {
        this.commentList.pageIndex++
      }

      const [getCommentsErr, getCommentsRes] = await this.$api.getComments(this.$route.params.id, {
        pageIndex: this.commentList.pageIndex,
        pageSize: this.commentList.pageSize
      })

      if (getCommentsErr) {
        this.commentList.loading = false
        this.commentList.error = true
        return
      }

      const resComments = getCommentsRes.data.data.map(v => {
        const baseURL = axios.defaults.baseURL
        const defaultImg = baseURL + '/uploads/image/default.jpeg'
        const userHeadImg = v.user.head_img
        v.user.head_img = userHeadImg === '' ? defaultImg : baseURL + userHeadImg
        return v
      })

      if (reset) {
        this.commentList.comments = resComments
      } else {
        this.commentList.comments.push(...resComments)
      }

      if (resComments.length < this.commentList.pageSize) {
        this.commentList.finished = true
      }

      this.commentList.loading = false
    },
    refreshPage () {
      // 刷新时，此时页面数据还没满一屏，设置 finished 为 false 会先立马触发 load 事件
      this.commentList.finished = false  // 触发了 load 事件
      this.commentList.error = false
      this.initArticle()
        .then(() => this.loadComment(true))
        .then(() => this.commentList.refreshing = false)
    },
    handleSendComment () {
      this.isInputting = false
      this.replyUser = null
      this.refreshPage()
      window.scrollTo(0, 0)
    },
    handleReplyComment (e, replyUser) {
      e.stopPropagation()
      this.isInputting = true
      this.replyUser = replyUser
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";
.comment {
  &_list {
    padding-bottom: common.baseSize(52);
    &.inputting {
      padding-bottom: common.baseSize(120);
    }
  }
}
</style>
