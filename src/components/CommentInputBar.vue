<template>
  <div @click.stop="$emit('click', $event)" class="comment-input-bar">
    <div v-show="isInputting === false" class="comment-input-bar_wrapper">
      <input
        type="text"
        placeholder="写跟帖"
        @focus="$emit('focus', $event)"
      />
      <div class="btn-group">
        <button @click="$router.push(`/comment/${article.id}`)">
          <van-icon class="iconfont iconpinglun" :badge="commentNum" />
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
        placeholder="写跟帖"
      ></textarea>
      <van-button class="btn-send" type="danger" round size="mini">发送</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentInputBar',
  props: ['commentNum', 'article', 'isInputting'],
  methods: {
    async starArticle(e) {
      const [err, res] = await this.$api.starArticle(this.article.id)

      if (err) {
        return this.$toast.fail(`${this.article.has_star ? '' : '取消'}收藏失败，发生错误`)
      } else if (res.data.statusCode) {
        return
      }

      this.$toast.success(res.data.message)

      this.article.has_star = !this.article.has_star
    },
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
      padding: common.baseSize(8) common.baseSize(20);
      font-size: common.baseSize(14);
      color: #333;
      background-color: #d7d7d7;
    }

    textarea {
      @extend %commentInput;
      width: common.baseSize(260);
      height: common.baseSize(90);
      border-radius: common.baseSize(15);
      resize: none;
    }

    input {
      @extend %commentInput;
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
    .btn-send {
      padding: common.baseSize(8) common.baseSize(15);
      font-size: common.baseSize(12);
    }
  }
}
</style>
