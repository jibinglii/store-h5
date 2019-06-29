<template>
  <div :name="item.id" @click="click" class="settle-item">
    <van-image :src="item.order.goods_logo" fit="cover"/>
    <div class="content">
      <p class="order_id">
        订单号：
        <span>{{ item.order_id }}</span>
      </p>
      <p slot="price">
        成交价格：
        <span>{{item.order.total_amount|formatMoney}}</span>
      </p>
      <p slot="desc">
        结算时间：
        <span>{{item.created_at}}</span>
      </p>
      <p slot="num">
        结算金额：
        <span>{{ item.settle_amount|formatMoney }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Image from "vant/lib/image";
import "vant/lib/image/style";
export default {
  name: "distributorItem",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  components: {
    [Image.name]: Image
  },
  methods: {
    click() {
      // this.$router.push("./distributionStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.settle-item {
  display: flex;
  padding: 5px 10px;
  height: 100px;
  background-color: white;
  align-items: center;
  .van-image {
    height: 90px;
    width: 90px;
    padding-right: 0.426667rem;
  }
  .content {
    padding-left: 5px;
    font-size: 14px;
    line-height: 1.7;
    p{
      span{
        color: #999;
        padding-left: .128rem;
      }
    }
  }
}
</style>
