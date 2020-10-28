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
    <!-- <div :class="{ comment_bottom: true, inputting: isInputting }">我也是有底线的</div> -->
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
      commentList: {
        refreshing: false,
        loading: false,
        finished: false,
        error: false,
        pageIndex: 1,
        pageSize: 6,
        comments: []
      },
      replyUser: null,
      isInputting: false
    }
  },
  mounted () {
    this.refreshPage()
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
    async loadComment (isReset = false) {
      if (this.commentList.comments.length === 0 || isReset) {
        this.commentList.pageIndex = 1
      } else {
        this.commentList.pageIndex++
      }

      const [getCommentsErr, getCommentsRes] = await this.$api.getComments(this.$route.params.id, {
        pageIndex: this.commentList.pageIndex,
        pageSize: this.commentList.pageSize
      })

      if (getCommentsErr || getCommentsRes.data.statusCode) {
        this.commentList.comments = isReset ? [] : this.commentList.comments
      }

      if (getCommentsErr) {
        this.commentList.error = true
        return
      } else if (getCommentsRes.data.statusCode) {
        this.commentList.loading = false
        return
      }

      const comments = isReset ? [] : this.commentList.comments

      const resComments = getCommentsRes.data.data.map(v => {
        const baseURL = axios.defaults.baseURL
        const defaultImg = baseURL + '/uploads/image/default.jpeg'
        const userHeadImg = v.user.head_img
        v.user.head_img = userHeadImg === '' ? defaultImg : baseURL + userHeadImg
        return v
      })

      comments.push(...resComments)

      if (resComments.length < this.commentList.pageSize) {
        this.commentList.finished = true
      }

      // 响应式数据，用于动态刷新页面
      this.commentList = {
        ...this.commentList,
        comments
      }

      this.commentList.loading = false
    },
    refreshPage () {
      this.commentList.finished = false
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
    handleReplyComment (replyUser, e) {
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
  // &_bottom {
  //   margin-top: common.baseSize(22);
  //   padding-bottom: common.baseSize(52);
  //   text-align: center;
  //   font-size: common.baseSize(14);
  //   color: #707070;
  //   &.inputting {
  //     padding-bottom: common.baseSize(120);
  //   }
  // }
}
</style>
