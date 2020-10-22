<template>
  <button
    class="user-btn shadow-none"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UserButton'
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.user-btn {
  $height: common.baseSize(48);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: $height;
  font-size: common.baseSize(20);
  border: none;
  border-radius: $height / 2;
  background-color: #cc3300;
  color: #fff;

  &:active {
    background-color: #942500;
  }
}
</style>
