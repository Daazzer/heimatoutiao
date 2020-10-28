<template>
  <div v-if="articleComments && articleComments.length > 0" class="comment">
    <div
      v-for="(articleComment, index) in articleComments.filter((v, i) => maxShow ? i < maxShow : true)"
      :key="articleComment.id"
      class="comment_wrapper"
    >
      <div class="comment_user">
        <van-image :src="articleComment.user.head_img" alt="用户头像" />
        <div class="comment_user-info">
          <h3>{{ articleComment.user.nickname }}</h3>
          <span class="comment_time">{{ articleComment.create_date | timeDiff }}</span>
        </div>
        <span
          class="comment_reply-btn"
          @click="replycomment($event, index)"
        >回复</span>
      </div>
      <!-- 插入评论回复 -->
      <NewsArticleCommentReply
        v-if="articleComment.parent"
        :parent="articleComment.parent"
        @replycomment="handleReplyComment"
      />
      <p class="comment_text">{{ articleComment.content }}</p>
    </div>
  </div>

  <div v-else class="no-comment">
    <p>暂无跟帖，抢占沙发</p>
  </div>
</template>

<script>
import { timeDiff } from '@/utils/filters'
import NewsArticleCommentReply from './NewsArticleCommentReply.vue'

export default {
  name: 'NewsArticleComment',
  props: ['articleComments', 'maxShow'],
  components: {
    NewsArticleCommentReply
  },
  methods: {
    replycomment (e, index) {
      // const userName = this.articleComments[index].user.nickname
      const replyUser = this.articleComments[index]
      this.$emit('replycomment', replyUser, e)
    },
    handleReplyComment (replyUser, e) {
      this.$emit('replycomment', replyUser, e)
    }
  },
  filters: {
    timeDiff
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

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
    margin-bottom: common.baseSize(10);
    h3 {
      font-size: common.baseSize(14);
    }
    ::v-deep {
      .van-image {
        $size: common.baseSize(50);
        width: $size;
        height: $size;
      }
      .van-image__img,
      .van-image__error {
        @extend .van-image;
        border-radius: 50%;
      }
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
    padding: common.baseSize(15) 0 common.baseSize(10);
    font-size: common.baseSize(14);
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
</style>
