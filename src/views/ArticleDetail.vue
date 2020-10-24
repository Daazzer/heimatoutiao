<template>
  <div class="artical-detail">
    <VanNavBar class="header" left-arrow>
      <template #left>
        <van-icon class="icon-back" name="arrow-left back" @click="$router.back()" />
        <span class="icon-logo iconfont iconnew new"></span>
      </template>
      <template #right>
        <van-button class="header_btn" round color="#f00" size="mini">关注</van-button>
      </template>
    </VanNavBar>
    <main class="detail">
      <h1 class="title">标题</h1>
      <div class="desc">
        <span class="publisher">火星人</span>
        <span class="date">2019-9-9</span>
      </div>
      <div class="content">
        文章的内容：
      </div>
      <div class="opt">
        <span class="like">
          <van-icon name="good-job-o" class="opt_icon" /><span class="like_num">122</span>
        </span>
        <span class="chat">
          <van-icon name="chat" class="opt_icon weixin" />微信
        </span>
      </div>
    </main>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="comment">
        <div class="comment_head">
          <img src="http://localhost:3000/uploads/image/default.jpeg" alt="用户头像" />
          <div class="comment_user-info">
            <h3>火星网友</h3>
            <span class="comment_time">2小时前</span>
          </div>
          <span class="comment_reply">回复</span>
        </div>
        <p class="comment_text">文章说得很有道理</p>
      </div>
      <van-button round class="more">更多跟帖</van-button>
    </div>
    <div class="leave-message">
      <input type="text" placeholder="写跟帖">
      <div class="btn-group">
        <button class="iconfont iconpinglun"></button>
        <button class="iconfont iconshoucang"></button>
        <button class="iconfont iconfenxiang"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar as VanNavBar } from 'vant'

export default {
  name: 'ArticleDetail',
  components: {
    VanNavBar
  },
  mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
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
    .publisher {
      margin-right: common.baseSize(10);
    }
  }
  .content {
    width: 100%;
    padding-bottom: common.baseSize(30);
    line-height: common.baseSize(24);
    font-size: common.baseSize(15);
    text-indent: 2em;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    $height: common.baseSize(25);
    display: flex;
    justify-content: center;
    align-items: center;
    height: common.baseSize(25);
    padding: 0 common.baseSize(15);
    font-size: common.baseSize(12);
    border: 1px solid #ccc;
    border-radius: $height / 2;
  }
  &_icon {
    font-size: common.baseSize(18);
    margin-right: common.baseSize(8);
  }
  .weixin {
    color: #04c904;
  }
}
.keeps {
  border-top: 5px solid #e4e4e4;
  padding-bottom: common.baseSize(30);
  h2 {
    line-height: common.baseSize(50);
    font-size: common.baseSize(20);
    text-align: center;
  }
  .comment {
    padding: common.baseSize(10) common.baseSize(14);
    border-bottom: 1px solid #ccc;
    &_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    }
  }
  .more {
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
.leave-message {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
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
    }
  }
}
</style>
