<template>
  <div class="home-goods">
    <div class="img" :style="{backgroundImage: 'url('+goods.logo+')'}">
      <div></div>
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
    height: 5.333333rem;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .info{
    background-color: white;
    padding: .3125rem;
    .title{
      height: 1.706667rem;
      color: #333;
      font-size: .554667rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient: vertical;
      text-align: justify;
    }
    .price{
      color: #f00;
      font-size: .512rem;
      padding: .3rem 0 0;
      font-weight: bold;
      &::before{
        content: '￥';
        font-size: .512rem;
      }
    }
  }
}
</style>


