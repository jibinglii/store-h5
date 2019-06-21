<template>
  <div class="home-goods">
    <div class="img">
      <img
        :src="goods.logo"
        alt=""
      >
    </div>
    <div class="info">
      <h4 class="title">{{ goods.title }}</h4>
      <p class="price">{{ goods.amount|formatMoney }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goods-item',
  props: {
    goods: Object
  }
}
</script>

<style lang="scss">
.home-goods {
  width: 9.0625rem;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  margin-bottom: .625rem;
  &:nth-child(odd) {
    left: 0;
  }
  &:nth-child(even) {
    left: .625rem;
  }
  .img {
    height: 6.25rem;
    overflow: hidden;
    background-color: white;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .info{
    background-color: white;
    padding: .3125rem;
    .title{
      height: 2.5rem;
      color: #333;
      font-size: .8125rem;
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient: vertical;
    }
    .price{
      color: #f00;
      font-size: 1.125rem;
      padding: .25rem 0;
      &::before{
        content: '￥';
        font-size: .75rem;
      }
    }
  }
}
</style>


