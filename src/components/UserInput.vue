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
    <BTooltip
      custom-class="user-input-tips"
      v-if="tipsMsg !== ''"
      :target="id"
      placement="bottomleft"
    >{{ tipsMsg }}</BTooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  inheritAttrs: false,
  name: 'UserInput',
  components: {
    BTooltip
  },
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
  font-size: .2rem;
  ::v-deep .tooltip-inner {
    max-width: none;
    padding: .2rem;
  }
  ::v-deep .arrow {
    left: 0 !important;
  }
  ::v-deep .arrow::before {
    position: absolute;
    bottom: 0;
    border-width: 0 .25rem .25rem;
  }
}
</style>
