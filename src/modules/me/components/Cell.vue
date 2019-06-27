<template>
  <router-link
    class="weui-cell weui-cell_access"
    :to="{name: url}"
  >
    <div class="weui-cell__hd">
      <img :src="img">
    </div>
    <div class="weui-cell__bd">
      <p>{{title}}</p>
    </div>
    <div class="weui-cell__ft"></div>
  </router-link>
</template>

<script>
export default {
  name: 'cell',
  props: ['title', 'img', 'url']
}
</script>

<style lang="scss" scoped>
.weui-cell {
  padding: 0.512rem 15px;
  img {
    width: 1.28rem;
    margin-right: 0.426667rem;
    vertical-align: middle;
  }
  .weui-cell__bd {
    p {
      font-size: 0.682667rem;
      font-weight: 500;
    }
  }
}
</style>
