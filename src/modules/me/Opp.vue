<template>
  <div>
    <x-header
      title="操作流程"
      url="me.me"
    ></x-header>
    <div class="img">
      <img
        src="/images/shop/opp-1.png"
        alt=""
      >
    </div>
    <div class="img">
      <img
        src="/images/shop/opp-2.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
export default {
  components: {
    XHeader
  }
}
</script>

<style lang="scss" scoped>
div.img {
  background-color: white;
  text-align: center;
  padding: 1rem 0 2rem;
  margin-bottom: 0.75rem;
  img {
    width: 80%;
    height: auto;
  }
}
</style>
