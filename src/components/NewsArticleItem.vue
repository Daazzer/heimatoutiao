<template>
  <!--
  如果数据中的type为1，说明是文章，2说明是视频
  当type值为1的时候，如果cover的数量<=2,那么就是左右结构，如果cover的数量>=3，
  那么就是上下结构
  -->
  <article
    v-if="news.type === 1 && news.cover.length <= 2"
    class="news-acticle-item sm"
  >
    <div class="news">
      <h3 class="news_title">{{ news.title }}</h3>
      <p class="news_info">
        <span class="news_publisher">{{ news.user.nickname }}</span>
        <span class="news_comment">{{ news.comment_length }}跟帖</span>
      </p>
    </div>
    <van-image :src="news.cover[0].url" alt="新闻图片" />
  </article>
  <article
    v-else-if="news.type === 1 && news.cover.length >= 3"
    class="news-acticle-item md"
  >
    <div class="news">
      <div>
        <h3 class="news_title">{{ news.title }}</h3>
        <div class="news_img-group">
          <van-image
            class="image"
            v-for="(cover, index) in news.cover"
            :key="index"
            :src="cover.url"
            alt="新闻图片"
          />
        </div>
      </div>
      <p class="news_info">
        <span class="news_publisher">{{ news.user.nickname }}</span>
        <span class="news_comment">{{ news.comment_length }}跟帖</span>
      </p>
    </div>
  </article>
  <article v-else-if="news.type === 2" class="news-acticle-item lg">
    <div class="news">
      <div>
        <h3 class="news_title">{{ news.title }}</h3>
        <div class="playarea">
          <van-image :src="news.cover[0].url" alt="新闻图片" />
          <div class="playicon">
            <van-icon name="play" />
          </div>
        </div>
      </div>
      <p class="news_info">
        <span class="news_publisher">{{ news.user.nickname }}</span>
        <span class="news_comment">{{ news.comment_length }}跟帖</span>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'NewsArticleItem',
  props: ['news']
}
</script>

<style lang='scss' scoped>
@use "@/styles/common.scss";

.news-acticle-item {
  padding: common.baseSize(14) common.baseSize(10);
  border-bottom: 1px solid #e4e4e4;

  .news {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &_info {
      color: #868686;
      font-size: common.baseSize(14);
      margin-top: common.baseSize(10);
    }

    &_publisher {
      margin-right: common.baseSize(12);
    }
  }

  &.sm {
    display: flex;
    justify-content: space-between;
    min-height: common.baseSize(104);

    .news {
      margin-right: common.baseSize(10);
      &_title {
        margin-bottom: common.baseSize(10);
      }

    }
    ::v-deep .van-image__img {
      width: common.baseSize(120);
      height: common.baseSize(75);
    }
  }

  &.md {
    .news {
      &_title {
        margin-bottom: common.baseSize(5);
      }

      &_img-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        ::v-deep .van-image {
          width: calc((100% - 4px) / 3);
          height: common.baseSize(74);
        }
      }
    }
  }

  &.lg {
    min-height: common.baseSize(250);

    .news {
      &_title {
        margin-bottom: common.baseSize(8);
      }

      .playarea {
        position: relative;
        ::v-deep .van-image {
          width: 100%;
        }
        .playicon {
          $size: common.baseSize(55);
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 50%;
          top: 50%;
          width: $size;
          height: $size;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          font-size: common.baseSize(25);
          color: #fff;
          background-color: rgba(61, 61, 61, 0.4);
        }
      }
    }
  }
}
</style>
