<template>
  <div class="goods">
    <router-link :to="{name: 'seller/orders/view', params: {'order': order.id}}">
      <div class="t">
        <span>{{order.goods_title}}</span>
        <img
          alt="已完成"
          src="/images/shop/store_ywc.png"
          v-if="order.status == 3"
        />
      </div>
      <div class="c">
        <div class="img">
          <img :src="order.goods_logo" />
        </div>
        <div class="desc">
          订单号：{{order.id}}<br>
          订单价格：{{order.total_amount}}元<br>
          下单时间：{{order.created_at}}
        </div>
        <div class="clear"></div>
      </div>
    </router-link>
    <div class="b">
      <span class="status">{{order.status_label}}</span>
      <router-link
        class="btn-white"
        :to="{name: 'seller/orders/view', params: {'order': order.id}}"
      >查看</router-link>
      <button
        @click="shipping(order.id)"
        v-show="order.status==1"
        class="btn-black"
      >确认发货</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-item',
  props: {
    order: {
      type: Object
    }
  },
  methods: {
    shipping(id) {
      let message = "您确定要[确认发货]该订单吗？";
      this.$confirm({
        title: "温馨提示",
        content: message,
        yesText: "否", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "是", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
        console.log('“cancel”');
      })
        .catch(() => {
          axios.post('api/v1/order/shipping/' + id, {}, { loading: true }).then(({ data }) => {
            this.$toast(data.message);
            setTimeout(() => {
              window.location.reload()
            }, 500)
          })
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  background-color: #fff;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  margin-bottom: 10px;
  a {
    color: #000;
  }
  .t {
    display: block;
    position: relative;
    font-weight: bold;
    padding: 10px 15px;
    border-bottom: solid 1px #eaeaea;
    span{
      color: #333;
      font-size: .75rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient: vertical;
    }
    img {
      position: absolute;
      right: 0;
      top: 0;
      width: 80px;
      height: 80px;
      margin-top: -12px;
    }
  }
  .c {
    display: block;
    padding: 10px 12px;
    border-bottom: solid 1px #eaeaea;
    .img {
      position: absolute;
      img {
        width: 80px;
        height: 80px;
        border: none;
      }
    }
    .desc {
      float: left;
      margin-left: 90px;
      overflow: hidden;
      padding: 0px 10px;
      line-height: 180%;
      font-size: 0.75rem;
    }
  }
  .b {
    clear: both;
    display: block;
    line-height: 2rem;
    text-align: right;
    .status {
      float: left;
      padding-left: 10px;
      font-size: 0.72rem;
      font-weight: 400;
    }
    a,
    button {
      display: inline-block;
      font-size: 0.65rem;
      line-height: 1.5;
      padding: 0px 20px;
      margin-right: 8px;
      border-radius: 5px;
    }
    .btn-white {
      color: #000;
      background-color: #fff;
      border: solid 1px #000;
    }
    .btn-black {
      color: #fff;
      background-color: #000;
      border: solid 1px #000;
      &:hover {
        color: #000;
        background-color: #fff;
      }
    }
  }
  .clear {
    clear: both;
  }
}
</style>
