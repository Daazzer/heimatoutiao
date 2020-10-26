<template>
  <div class="artical-detail">
    <VanNavBar class="header" @click-left="$router.back()" left-arrow>
      <template #left>
        <van-icon class="icon-back" name="arrow-left back" />
        <span class="icon-logo iconfont iconnew new"></span>
      </template>
      <template #right>
        <van-button
          class="header_btn"
          round
          color="#f00"
          size="mini"
          @click="followThisUser"
        >{{ article.has_follow ? '取消关注' : '关注' }}</van-button>
      </template>
    </VanNavBar>
    <main class="detail">
      <h1 class="title">{{ article.title }}</h1>
      <div class="desc">
        <span class="publisher">{{ article.user.nickname }}</span>
        <span class="date">{{ article.user.create_date | dateFormat }}</span>
      </div>
      <div class="content">
        <article v-if="article.type === 1" v-html="article.content" />
        <video
          :poster="article.cover[0].url"
          :src="article.content"
          v-if="article.type === 2"
          controls
        ></video>
      </div>
      <div class="opt">
        <van-button round size="mini" class="like" @click="likeThisArticle">
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
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div v-if="article.comment_length > 0" class="comment">
        <div class="comment_wrapper">
          <div class="comment_user">
            <img src="http://localhost:3000/uploads/image/default.jpeg" alt="用户头像" />
            <div class="comment_user-info">
              <h3>火星网友</h3>
              <span class="comment_time">2小时前</span>
            </div>
            <span class="comment_reply">回复</span>
          </div>
          <div class="comment_reply-area">
            <div class="comment_wrapper">
              <div class="comment_user">
                <div class="comment_user-info">
                  <h3>火星网友</h3>
                  <span class="comment_time">2小时前</span>
                </div>
                <span class="comment_reply">回复</span>
              </div>
              <div class="comment_reply-area"></div>
              <p class="comment_text">文章说得很有道理</p>
            </div>
            <div class="comment_wrapper">
              <div class="comment_user">
                <div class="comment_user-info">
                  <h3>火星网友</h3>
                  <span class="comment_time">2小时前</span>
                </div>
                <span class="comment_reply">回复</span>
              </div>
              <div class="comment_reply-area"></div>
              <p class="comment_text">文章说得很有道理</p>
            </div>
          </div>
          <p class="comment_text">文章说得很有道理</p>
        </div>
        <van-button round class="comment_more">更多跟帖</van-button>
      </div>

      <div v-else class="no-comment">
        <p>暂无跟帖，抢占沙发</p>
      </div>
    </div>
    <div class="leave-message">
      <input type="text" placeholder="写跟帖">
      <div class="btn-group">
        <button>
          <van-icon class="iconfont iconpinglun" badge="99+" />
        </button>
        <button
          :class="['iconfont', 'iconshoucang', article.has_star ? 'active' : '']"
          @click="starArticle"
        ></button>
        <button class="iconfont iconfenxiang"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar as VanNavBar, Tag as VanTag } from 'vant'
import { dateFormat } from '@/utils/filters'

export default {
  name: 'ArticleDetail',
  components: {
    VanNavBar,
    VanTag
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
        like_length: 0
      }
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    const id = this.$route.params.id

    const [err, res] = await this.$api.getArticleDetialById(id)

    if (err) {
      return this.$toast.fail('获取文章数据失败')
    }

    this.article = res.data.data
  },
  methods: {
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
        return this.$toast.fail('关注失败，请先登录')
      }

      this.$toast.success(res.data.message)

      this.article.has_follow = !hasfollow
    },
    async likeThisArticle () {
      const [err, res] = await this.$api.likeArticle(this.article.id)
      if (err) {
        return this.$toast.fail(`${this.article.has_like ? '' : '取消'}点赞失败，发生错误`)
      } else if (res.data.statusCode) {
        return this.$toast.fail(res.data.message)
      }

      if (res.data.message === '点赞成功') {
        this.article.like_length++
      } else {
        this.article.like_length--
      }

      this.article.has_like = !this.article.has_like
      this.$toast.success(res.data.message)
    },
    async starArticle() {
      const [err, res] = await this.$api.starArticle(this.article.id)

      if (err) {
        return this.$toast.fail(`${this.article.has_star ? '' : '取消'}收藏失败，发生错误`)
      }

      this.$toast.success(res.data.message)

      this.article.has_star = !this.article.has_star
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
  height: common.baseSize(50);
  background-color: #f2f2f2;
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
    width: common.baseSize(62);
    height: common.baseSize(26);
    font-size: common.baseSize(12);
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

    ::v-deep a {
      display: inline-block;
    }
    ::v-deep img {
      width: 100%;
    }
    ::v-deep p {
      margin: .5em 0 .8em;
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
  h2 {
    line-height: common.baseSize(50);
    font-size: common.baseSize(20);
    text-align: center;
  }
  .comment {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &_wrapper {
      border-bottom: 1px solid #ccc;
      padding: common.baseSize(10) common.baseSize(14);
    }
    &_user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: common.baseSize(15);
      h3 {
        font-size: common.baseSize(14);
      }
      img {
        $size: common.baseSize(50);
        width: $size;
        height: $size;
        border-radius: 50%;
      }
      span {
        font-size: common.baseSize(12);
        color: #999;
        line-height: common.baseSize(25);
      }
    }
    &_user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: common.baseSize(10);
    }
    &_text {
      padding: common.baseSize(20) 0 common.baseSize(10) 0;
      font-size: common.baseSize(14);
    }
    &_more {
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
    &_reply-area {
      border: 1px solid #d7d7d7;

      .comment_wrapper:last-child {
        border-bottom: none;
      }
    }
  }
  .no-comment {
  @extend .comment_wrapper;
  display: flex;
  justify-content: center;
  align-items: center;
  height: common.baseSize(105);
    p {
      font-size: common.baseSize(14);
      color: #aeaeae;
    }
  }
}

.leave-message {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  height: common.baseSize(50);
  padding: common.baseSize(9) common.baseSize(16);
  background-color: #f2f2f2;

  input, button {
    border: none;
  }

  input {
    $height: common.baseSize(30);
    padding: common.baseSize(8) common.baseSize(20);
    height: $height;
    border-radius: $height / 2;
    font-size: common.baseSize(14);
    color: #333;
    background-color: #d7d7d7;
  }
  .btn-group {
    display: flex;
    button {
      padding: 0;
      margin-left: common.baseSize(18);
      font-size: common.baseSize(20);
      color: #7c7c7c;
      .van-icon {
        @extend button;
      }
      .van-info {
        font-size: common.baseSize(12);
        min-width: common.baseSize(14);
        padding: 0 common.baseSize(3);
      }
      &.active {
        color: #f00;
      }
    }
  }
}
</style>