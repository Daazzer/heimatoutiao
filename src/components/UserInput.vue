<template>
  <div class="user-input-group">
    <input
      :class="{
        'user-input': status === 0 || true,
        'user-input-success': status === 1,
        'user-input-danger': status === 2,
      }"
      v-bind="$attrs"
      :value="value"
      :id="id"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div class="user-input-tips">
      <p>{{ isShowTips ? tipsMsg : '' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'UserInput',
  props: {
    value: {
      type: String
    },
    rules: {
      type: RegExp,
      required: true
    },
    tipsMsg: String,
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      status: 0,
      isShowTips: false
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)

      const inputText = e.target.value
      const isValidated = this.rules.test(inputText)
      if (inputText === '') {
        this.status = 0
      } else if (isValidated) {
        this.status = 1
      } else {
        this.status = 2
      }
    },
    handleFocus () {
      this.isShowTips = true
    },
    handleBlur () {
      this.isShowTips = false
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.user-input-group {
  margin-bottom: common.baseSize(15);
}
.user-input {
  width: 100%;
  padding: common.baseSize(15) 0;
  margin-bottom: common.baseSize(5);
  border: none;
  border-bottom: 2px solid #757575;
  background-color: #f2f2f2;
  font-size: common.baseSize(18);

  &-success {
    border-bottom-color: #0dbc79;
  }
  &-danger {
    border-bottom-color: #ff4d4d;
  }
}
.user-input-tips {
  font-size: common.baseSize(10);
  min-height: common.baseSize(14);
  color: #757575;
  ::v-deep .tooltip-inner {
    max-width: none;
    padding: common.baseSize(5) common.baseSize(10);
  }
}
</style>
