<template>
  <div class="goods" v-if="order">
    <router-link :to="{name: 'orders.view', params: {'id': order.id}}">
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
          <!-- +'?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_180/quality,q_90' -->
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
    <div
      class="b"
      v-if="showBtn"
    >
      <span
        v-if="!order.closed"
        class="status"
      >{{order.status_label}}</span>
      <span
        v-else
        class="status"
      >订单已关闭</span>
      <router-link
        class="btn-white"
        :to="{name: 'orders.view', params: {'id': order.id}}"
      >查看</router-link>
      <button
        @click="destroy(order.id)"
        v-show="order.status==0"
        class="btn-black"
      >删除</button>
      <button
        @click="confirm(order.id)"
        v-show="order.status==2"
        class="btn-black"
      >确认收货</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    },
    showBtn: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    destroy(id) {
      let message = "您确定要[删除]该订单吗？";
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
          this.$toast.loading({mask: true})
          this.$http.delete('api/v1/order/' + id).then(({ message }) => {
            this.$toast(message);
            this.$emit('delete', id)
          })
        });
    },
    confirm(id) {
      let message = "您确定要[确认收货]该订单吗？";
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
          this.$toast.loading({mask: true})
          this.$http.post('api/v1/order/confirm/' + id, {}, { loading: true }).then(({ message }) => {
            this.$toast(message);
            this.$emit('confirm')
          })
        });
    },
    repayment(id) {
      let url = "/api/v1/repayment?id=" + id;
      location.replace(url)
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
    // height: 2.5rem;
    // line-height: 2.5rem;
    padding: 0.4rem 15px;
    position: relative;
    font-weight: bold;
    border-bottom: solid 1px #eaeaea;
    span {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
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
    display: flex;
    align-items: center;
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
      line-height: 1.8;
      font-size: 15px;
    }
  }
  .b {
    clear: both;
    display: block;
    line-height: 50px;
    text-align: right;
    .status {
      float: left;
      padding-left: 10px;
      font-size: 13px;
      font-weight: bold;
    }
    a,
    button {
      display: inline-block;
      font-size: 12px;
      line-height: 180%;
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
