<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <img
        :src="'/images/shop/msg_' + type + '.png'"
        class="status-img"
      >
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">{{ title }}</h2>
      <p class="weui-msg__desc">
        <slot name="message"></slot>
      </p>
    </div>
    <div class="action-group">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'success', //success|fail|
      type: String
    },
    title: {
      type: String,
      default: '操作成功'
    }
  },
  data() {
    return {
      successImg: ''
    }
  }
}
</script>

<style lang="scss" scoped>
img.status-img {
  width: 35%;
  margin-top: 2rem;
}
.weui-msg {
  background-color: white;
  padding-bottom: 30px;
  .action-group {
    width: 100%;
    padding: 0.5rem 0;
    margin-top: 1.25rem;
    div {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }
}
</style>
