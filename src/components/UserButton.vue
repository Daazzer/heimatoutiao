<template>
  <b-button
    pill
    variant="danger"
    class="user-btn shadow-none"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  name: 'UserButton'
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.user-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: common.baseSize(48);
  font-size: common.baseSize(20);
  border: none;
  background-color: #cc3300;
  color: #fff;
}
</style>
