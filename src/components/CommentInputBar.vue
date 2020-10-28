<template>
  <div @click="$emit('click', $event)" class="comment-input-bar">
    <div v-show="isInputting === false" class="comment-input-bar_wrapper">
      <input
        type="text"
        placeholder="写跟帖"
        @focus="$emit('inputting')"
      />
      <div class="btn-group">
        <button @click="gotoComment">
          <van-icon
            class="iconfont iconpinglun"
            :badge="getCommentNum"
          />
        </button>
        <button
          :class="[
            'iconfont',
            'iconshoucang',
            article.has_star ? 'active' : ''
          ]"
          @click="starArticle"
        ></button>
        <button class="iconfont iconfenxiang"></button>
      </div>
    </div>
    <div v-show="isInputting === true" class="comment-input-bar_wrapper input">
      <textarea
        ref="commentInputArea"
        cols="5"
        :placeholder="replyUserName === '' ? '写跟帖' : `回复@${replyUserName}`"
        v-model="inputCommentText"
      ></textarea>
      <div class="btn-opt">
        <van-button
          class="btn-cancel"
          type="danger"
          round
          size="mini"
          :disabled="replyUserName === ''"
          @click="$emit('cancelreply')"
        >取消回复</van-button>
        <van-button
          class="btn-send"
          type="danger"
          round
          size="mini"
          :disabled="inputCommentText === ''"
          @click="sendComment"
        >发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentInputBar',
  props: ['article', 'isInputting', 'replyUser'],
  data () {
    return {
      inputCommentText: ''
    }
  },
  methods: {
    async starArticle() {
      const [err, res] = await this.$api.starArticle(this.article.id)

      if (err) {
        return this.$toast.fail(`${this.article.has_star ? '' : '取消'}收藏失败，发生错误`)
      } else if (res.data.statusCode) {
        return
      }

      this.$toast.success(res.data.message)

      this.$emit('stararticle')
    },
    async sendComment (e) {
      const id = this.article.id
      const content = this.inputCommentText.trim()
      // console.log(this.replyUser === null)
      const parent_id = this.replyUser === null ? null : this.replyUser.id

      console.log(parent_id)

      if (content === '') {
        return this.$toast.fail('评论不能为空')
      }

      const [err, res] = await this.$api.postComment(id, {
        content,
        parent_id
      })

      if (err) {
        return this.$toast.fail('发送评论时出错')
      }

      const resMsg = res.data.message

      if (resMsg === '评论发布成功') {
        this.$toast.success(resMsg)

        // 清空输入框
        this.inputCommentText = ''

        this.$emit('sendcomment')
      }
    },
    gotoComment () {
      if (this.$route.name === 'Comment') {
        return
      }
      this.$router.push(`/comment/${this.article.id}`)
    }
  },
  computed: {
    getCommentNum () {
      const commentLen = this.article.comment_length
      if (commentLen <= 0) {
        return ''
      } else if (commentLen > 99) {
        return '99+'
      }
      return commentLen
    },
    replyUserName () {
      return this.replyUser === null ? '' : this.replyUser.user.nickname
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";
.comment-input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: common.baseSize(50);
  padding: common.baseSize(9) common.baseSize(16);
  background-color: #f2f2f2;

  &_wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    &.input {
      align-items: flex-end;
    }

    input, button, textarea {
      border: none;
    }

    %commentInput {
      font-size: common.baseSize(14);
      color: #333;
      background-color: #d7d7d7;
    }

    textarea {
      @extend %commentInput;
      padding: common.baseSize(12) common.baseSize(20);
      width: common.baseSize(260);
      height: common.baseSize(90);
      border-radius: common.baseSize(15);
      resize: none;
    }
    input {
      @extend %commentInput;
      padding: common.baseSize(8) common.baseSize(20);
      $height: common.baseSize(30);
      height: $height;
      border-radius: $height / 2;
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
    .btn-opt {
      display: flex;
      flex-direction: column;
      margin-left: common.baseSize(10);
    }
    .btn-send, .btn-cancel {
      margin: 0 0 common.baseSize(10);
      min-width: common.baseSize(80);
      padding: common.baseSize(8);
      font-size: common.baseSize(12);
    }
  }
}
</style>
