<template>
  <div class="artical-detail" @click="isInputting = false">
    <van-nav-bar fixed placeholder class="header" @click-left="$router.back()" left-arrow>
      <template #left>
        <van-icon class="icon-back" name="arrow-left back" />
        <span class="icon-logo iconfont iconnew new"></span>
      </template>
      <template #right>
        <van-button
          :class="{ header_btn: true, active: article.has_follow }"
          round
          size="mini"
          @click="followThisUser"
        >{{ article.has_follow ? '已关注' : '关注' }}</van-button>
      </template>
    </van-nav-bar>
    <main class="detail">
      <h1 class="title">{{ article.title }}</h1>
      <div class="desc">
        <span class="publisher">{{ article.user.nickname }}</span>
        <span class="date">{{ article.user.create_date | dateFormat }}</span>
      </div>
      <div class="content">
        <article v-if="article.type === 1" v-html="article.content"></article>
        <video
          v-if="article.type === 2 && article.cover"
          :poster="article.cover[0].url"
          :src="article.content"
          controls
        ></video>
      </div>
      <div class="opt">
        <van-button
          round
          size="mini"
          class="like"
          @click="likeThisArticle"
        >
          <van-icon
            :name="`good-job${ article.has_like ? '' : '-o'}`"
            :class="{ active: article.has_like, opt_icon: true }"
          /><span class="like_num">{{ article.like_length }}</span>
        </van-button>
        <van-button round size="mini" class="chat">
          <van-icon name="chat" class="opt_icon weixin" />微信
        </van-button>
      </div>
    </main>
    <div :class="{ keeps: true, inputting: isInputting }">
      <h2>精彩跟帖</h2>
      <!-- 只渲染前两条 -->
      <NewsArticleComment
        :articleComments="article.comments"
        :maxShow="2"
        @replycomment="handleReplyComment"
      />
      <van-button
        v-if="article.comments && article.comments.length > 2"
        round
        class="comment_more"
        @click="$router.push(`/comment/${article.id}`)"
      >更多跟帖</van-button>
    </div>
    <CommentInputBar
      :article="article"
      :expand="isInputting"
      :replyUser="replyUser"
      @click.stop
      @click-comment="$router.push(`/comment/${article.id}`)"
      @inputting="isInputting = true"
      @stararticle="article.has_star = !article.has_star"
      @sendcomment="handleSendComment"
      @cancelreply="replyUser = null"
    />
  </div>
</template>

<script>
import { Tag as VanTag } from 'vant'
import NewsArticleComment from '@/components/NewsArticleComment'
import CommentInputBar from '@/components/CommentInputBar.vue'
import { dateFormat } from '@/utils/filters'
import axios from '@/utils/axios_http-config'

export default {
  name: 'ArticleDetail',
  components: {
    VanTag,
    NewsArticleComment,
    CommentInputBar
  },
  data () {
    return {
      article: {
        user: {},
        like_length: 0
      },
      isInputting: false,
      replyUser: null
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

      getArticleDetialRes.data.data.cover.forEach(c => {
        // 检测是否是 http 路径图片，如果不是则拼接本地地址
        if(!/^http/.test(c.url)) {
          c.url = axios.defaults.baseURL + c.url
        }
      })

      this.article = {
        ...getArticleDetialRes.data.data,
        ...this.article
      }

      const [getCommentsErr, getCommentsRes] = await this.$api.getComments(this.article.id)

      if (getCommentsErr) {
        return this.$toast.fail('获取评论数据错误')
      }

      const comments = getCommentsRes.data.data.map(v => {
        const baseURL = axios.defaults.baseURL
        const defaultImg = baseURL + '/uploads/image/default.jpeg'
        const userHeadImg = v.user.head_img
        v.user.head_img = userHeadImg === '' ? defaultImg : baseURL + userHeadImg
        return v
      })

      // 响应式更新 `data` 的深度成员，这里添加了一个 comments 成员
      this.$set(this.article, 'comments', comments)
    },
    async followThisUser () {
      const hasfollow = this.article.has_follow
      const id = this.article.user.id
      let err, res

      // 如果关注了则点击就是取关
      if (hasfollow) {
        [err, res] = await this.$api.unfollowUser(id)
      } else {
        [err, res] = await this.$api.followUser(id)
      }

      if (err) {
        return this.$toast.fail('关注失败，出现错误')
      } else if (res.data.statusCode) {
        return
      }

      this.article.has_follow = !hasfollow
      this.$toast.success(res.data.message)
    },
    async likeThisArticle () {
      const [err, res] = await this.$api.likeArticle(this.article.id)
      if (err) {
        return this.$toast.fail(`${this.article.has_like ? '' : '取消'}点赞失败，发生错误`)
      } else if (res.data.statusCode) {
        return
      }

      if (res.data.message === '点赞成功') {
        this.article.like_length++
      } else {
        this.article.like_length--
      }

      this.article.has_like = !this.article.has_like
      this.$toast.success(res.data.message)
    },
    handleSendComment () {
      this.isInputting = false
      this.replyUser = null
      this.initPage()
      window.scrollTo(0, 0)
    },
    handleReplyComment (e, replyUser) {
      e.stopPropagation()
      this.isInputting = true
      this.replyUser = replyUser
    }
  },
  filters: {
    dateFormat
  }
}
</script>

<style lang='scss' scoped>
@use "@/styles/common.scss";

::v-deep .header {
  height: common.baseSize(50) !important;

  &, .van-nav-bar {
    background-color: #f2f2f2;
    height: common.baseSize(50);
  }
  .icon {
    &-back {
      font-size: common.baseSize(15);
      color: #070707;
    }
    &-logo {
      font-size: common.baseSize(45);
    }
  }

  &_btn {
    height: common.baseSize(24);
    padding: common.baseSize(5) common.baseSize(10);
    font-size: common.baseSize(12);
    background-color: #f00;
    color: #fff;

    &.active {
      background-color: #c7c7c7;
      color: #363636;
    }
  }
}

.detail {
  padding: common.baseSize(15);
  .title {
    font-size: common.baseSize(20);
    font-weight: bold;
    padding: common.baseSize(10) 0;
  }
  .desc {
    line-height: common.baseSize(30);
    color: #999;
    font-size: common.baseSize(14);
    margin-bottom: common.baseSize(15);
    .publisher {
      margin-right: common.baseSize(10);
    }
  }
  .content {
    width: 100%;
    padding-bottom: common.baseSize(30);
    line-height: common.baseSize(24);
    font-size: common.baseSize(15);

    ::v-deep {
      a {
        display: inline-block;
      }
      img {
        width: 100%;
      }
      p {
        margin: .5em 0 .8em;
      }
    }
  }
}
video {
  width: 100%;
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    $height: common.baseSize(25);
    height: common.baseSize(25);
    padding: 0 common.baseSize(15);
    font-size: common.baseSize(12);
    border: 1px solid #797979;
    background-color: #f2f2f2;
    .van-button__text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &_icon {
    font-size: common.baseSize(18);
    margin-right: common.baseSize(8);
    .like &.active {
      color: #f00;
    }
  }
  .weixin {
    color: #04c904;
  }
}
.keeps {
  border-top: 5px solid #e4e4e4;
  padding: common.baseSize(25) 0 common.baseSize(52);
  &.inputting {
    padding: common.baseSize(25) 0 common.baseSize(120);
  }
  h2 {
    line-height: common.baseSize(50);
    font-size: common.baseSize(20);
    text-align: center;
  }
  .comment_more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: common.baseSize(120);
    height: common.baseSize(30);
    margin: common.baseSize(25) auto;
    border: 1px solid #797979;
    background-color: #f2f2f2;
    font-size: common.baseSize(14);
  }
}
</style>
