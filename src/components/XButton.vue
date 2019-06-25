<template>
  <a
    class="btn"
    :class="['btn-' + type]"
  >{{ text }}</a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    text: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  display: inline-block;
  height: 44px;
  border: 1px solid #020202;
  border-radius: 4px;
  line-height: 44px;
  box-sizing: border-box;
  color: #020202;
  font-size: 15px;
  padding: 0 14px;
  text-align: center;
  &.btn-primary {
    background-color: #020202;
    color: white;
    border: none;
  }
}
</style>
