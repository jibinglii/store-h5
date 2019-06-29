<template>
  <div class="home-goods" @click="onClick">
    <div class="img">
      <van-image :src="goods.logo" fit="cover"></van-image>
    </div>
    <div class="info">
      <h4 class="title">{{ goods.title }}</h4>
      <p class="price">{{ goods.amount|formatMoney }}</p>
    </div>
  </div>
</template>

<script>
  import Image from 'vant/lib/image'
  import 'vant/lib/image/style'
export default {
  name: 'goods-item',
  components: {
    [Image.name]: Image
  },
  props: {
    goods: Object
  },
  methods: {
    onClick () {
      this.$router.push({name: 'goods.view', params:{'goods': this.goods.uuid}})
    }
  }
}
</script>

<style lang="scss">
.home-goods {
  width: 8.5rem;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  margin-bottom: .625rem;
  &:nth-child(odd) {
    left: .6rem;
  }
  &:nth-child(even) {
    left: 1.2rem;
  }
  .img {
    height: 6.25rem;
    overflow: hidden;
    .van-image{
      height: 100%;
      width: 100%;
      .van-image__error{
        background-color: rgba(0,0,0,.25);
      }
    }
  }
  .info{
    background-color: white;
    padding: .3125rem;
    .title{
      height: 2.5rem;
      color: #333;
      font-size: .75rem;
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


