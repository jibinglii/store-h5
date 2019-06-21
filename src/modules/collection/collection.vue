<template>
  <div class="collection">
    <section class="top">
      <router-link
        tag="div"
        to="{name: 'collection.goods'}"
        exact
        class="goods"
        @click.prevent="tab=0"
      >收藏的商品</router-link>
      <router-link
        tag="div"
        :to="{name: 'collection.shop'}"
        class="shop"
        @click.prevent="tab=1"
      >收藏的店铺</router-link>
    </section>
    <router-view />
  </div>
</template>

<script>
import "./rem";
export default {
  data() {
    return {
      tab: 0 //0=>商品 1=>店铺
    };
  }
};
</script>

<style lang="scss" scoped>
.collection {
  background: #fff;
  width: 100%;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    .goods {
      display: block;
      background: #fff;
      border: 1px solid #000;
      border-right: 0;
      border-radius: 8px 0px 0px 8px;
      width: 126px;
      height: 26px;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #000;
      text-align: center;
      line-height: 26px;
    }
    .shop {
      display: block;
      background: #fff;
      border: 1px solid #000;
      border-left: 0;
      border-radius: 0px 8px 8px 0px;
      width: 126px;
      height: 26px;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #000;
      text-align: center;
      line-height: 26px;
    }
    .active{
      color: #fff;
      background: #000;
    }
  }
}
</style>
