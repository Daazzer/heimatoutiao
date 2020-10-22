<template>
  <b-link class="personal-option" @click="$emit('click', $event)">
    <h3>{{ title }}</h3>
    <div>
      <span class="personal-option_desc" v-if="desc !== ''">{{ type === 'password' ? '******' : desc }}</span>
      <span class="iconfont iconjiantou1 arrow-r"></span>
    </div>
  </b-link>
</template>

<script>
export default {
  name: 'PersonalOption',
  props: {
    title: {
      required: true,
      type: String
    },
    desc: {
      type: String,
      default: ''
    },
    type: String
  }
}
</script>

<style lang='scss' scoped>
@use "@/styles/common.scss";

.personal-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: common.baseSize(50);
  padding: 0 common.baseSize(15) 0 common.baseSize(20);
  border-bottom: 1px solid #e4e4e4;
  font-size: common.baseSize(14);
  h3 {
    font-size: common.baseSize(16);
    color: #202020;
  }
  &_desc {
    margin-right: 0.277778rem;
    color: #a0a0a0;
  }
  .arrow-r {
    font-size: 0.388889rem;
    color: #b6b6b6;
  }
}
</style>
