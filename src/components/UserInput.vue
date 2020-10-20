<template>
  <div class="user-input-group">
    <input
      :class="{
        'user-input': status === 0 || true,
        'user-input-success': status === 1,
        'user-input-danger': status === 2
      }"
      v-bind="$attrs"
      :value="value"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <p class="user-input-tips" v-if="tipsMsg !== ''" v-show="isShowTips">{{ tipsMsg }}</p>
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
    tipsMsg: String
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

      const inputText = e.target.value.trim()
      const rules = this.rules
      const isValidated = rules.test(inputText)
      if (isValidated) {
        this.status = 1
      } else if (inputText === '') {
        this.status = 0
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
.user-input-group {
  margin-bottom: 0.555556rem;
}
.user-input {
  width: 100%;
  padding: 0.416667rem 0;
  margin-bottom: 0.277778rem;
  border-bottom: 2px solid #757575;
  background-color: #f2f2f2;
  font-size: 0.5rem;

  &-success {
    border-bottom-color: #0dbc79;
  }
  &-danger {
    border-bottom-color: #ff4d4d;
  }
}
.user-input-tips {
  color: #949494;
}
</style>
