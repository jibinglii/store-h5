<template>
  <div
    :name="item.id"
    @click="click"
    class="settle-item"
  >
    <van-image
      :src="item.order.goods_logo"
      fit="cover"
    />
    <div class="content">
      <p>订单号: {{ item.order_id }}</p>
      <p slot="price">成交价格: {{item.order.total_amount|formatMoney}}</p>
      <p slot="desc">结算时间: {{item.created_at}}</p>
      <p slot="num">结算金额: {{ item.settle_amount|formatMoney }}</p>
    </div>
  </div>
</template>

<script>
import Image from 'vant/lib/image'
import 'vant/lib/image/style'
export default {
  name: "distributorItem",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      result: ["1", "2"]
    };
  },
  components: {
    [Image.name]: Image
  },
  methods: {
    click() {
      this.$router.push("./distributionStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.settle-item{
  display: flex;
  padding: 5px 10px;
  height: 100px;
  background-color: white;
  align-items: center;
  .van-image{
    height: 90px;
    width: 90px;
  }
  .content{
    padding-left: 5px;
    font-size: 14px;

  }
}
</style>
