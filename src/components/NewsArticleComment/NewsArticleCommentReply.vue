<template>
  <div class="comment-reply">
    <div class="comment-reply_wrapper">
      <div class="comment-reply_user">
        <div class="comment-reply_user-info">
          <h3>{{ parent.user.nickname }}</h3>
          <span class="comment-reply_time">{{ parent.create_date | timeDiff }}</span>
        </div>
        <span class="comment-reply_reply-btn" @click="replycomment">回复</span>
      </div>
      <!-- 插入评论回复 -->
      <NewsArticleCommentReply
        v-if="parent.parent"
        :parent="parent.parent"
        @replycomment="handleReplyComment"
      />
      <p class="comment-reply_text">{{ parent.content }}</p>
    </div>
  </div>
</template>

<script>
import { timeDiff } from '@/utils/filters'

export default {
  name: 'NewsArticleCommentReply',
  props: ['parent'],
  filters: {
    timeDiff
  },
  methods: {
    replycomment (e) {
      // const userName = this.parent.user.nickname
      const replyUser = this.parent
      this.$emit('replycomment', replyUser, e)
    },
    handleReplyComment (replyUser, e) {
      this.$emit('replycomment', replyUser, e)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.comment-reply {
  border: 1px solid #d7d7d7;
  &_wrapper {
    padding: common.baseSize(10) common.baseSize(14);
  }
  &_user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: common.baseSize(8);
    h3 {
      font-size: common.baseSize(14);
    }
    .van-image {
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
  }
  &_text {
    padding: common.baseSize(12) 0 common.baseSize(10);
    font-size: common.baseSize(14);
  }
}
</style>
