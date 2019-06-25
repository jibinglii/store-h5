<template>
  <div>
    <div class="weui-cells__title" v-if="title">{{ title }}</div>
    <div class="weui-cells">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cell-group',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>



