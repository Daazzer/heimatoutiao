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
.user-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.333333rem;
  font-size: 0.5rem;
  border: none;
  background-color: #cc3300;
  color: #fff;
}
</style>
