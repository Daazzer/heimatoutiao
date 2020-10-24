<template>
  <div class="articaldetail">
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
      <div class="title">标题</div>
      <div class="desc">
        <span>火星人</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content">
        文章的内容：
      </div>
      <div class="opt">
        <span class="like">
          <van-icon name="good-job-o" />点赞
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </main>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
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
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
