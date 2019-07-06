<template>
  <div class="page-box">
    <x-header title="订单详情"></x-header>
    <div class="status">
      <div
        class="info"
        v-if="!order.closed"
      >
        {{order_status[order.status].status_desc_1}}<br />
        <span>{{order_status[order.status].status_desc_2}}</span>
      </div>
      <div
        class="info"
        v-else
      >
        订单已关闭
      </div>
      <div class="icon">
        <img :src="order_status[order.status].icon" />
      </div>
    </div>

    <div class="goods">
      <goods-item-horizontal
        :goods="goods"
        :lazy="false"
      />
    </div>

    <x-cell-group>
      <info-cell title="数量">{{order.num}}</info-cell>
      <info-cell title="商品总价">¥ {{order.goods_price|formatMoney}}</info-cell>
      <info-cell
        title="担保无忧"
        v-if="order.insure_name != ''"
      >{{order.insure_name}}</info-cell>
      <info-cell
        title="担保费"
        v-if="order.insure_fee != ''"
      >¥ {{order.insure_fee|formatMoney}}</info-cell>
    </x-cell-group>

    <x-cell-group>
      <we-info-cell
        title="实付款"
        :desc="'¥ ' + this.formatMoney(order.total_amount)"
      ></we-info-cell>
    </x-cell-group>

    <x-cell-group>
      <we-info-cell title="订单信息"></we-info-cell>
      <info-cell title="订单编号">{{order.id}}</info-cell>
      <info-cell title="创建时间">{{order.created_at}}</info-cell>
      <info-cell
        title="付款时间"
        v-if="order.payment_time != ''"
      >{{order.payment_time}}</info-cell>
    </x-cell-group>

    <x-cell-group v-if="order.status>1">
      <we-info-cell title="发货信息"></we-info-cell>
      <info-cell title="发货时间">{{order.express_at}}</info-cell>
      <info-cell title="备注">{{order.express_remark}}</info-cell>
    </x-cell-group>

    <x-cell-group>
      <div class="btns">
        <div v-if="order.closed">
          <x-button text="订单已关闭"></x-button>
        </div>
        <div v-if="!order.closed">
          <x-button
            @click.native="connectSaler(order.goods_id, order.goods_user_id)"
            text="联系卖家"
          ></x-button>
        </div>
        <div v-if="!order.closed && order.status==2">
          <x-button
            @click.native="confirm(order.id)"
            text="确认收货"
            type="primary"
          ></x-button>
        </div>
        <div v-if="!order.closed && order.status==0">
          <x-button
            @click.native="destroy(order.id)"
            text="取消订单"
            type="primary"
          ></x-button>
        </div>
        <div v-if="!order.closed && order.status==0">
          <x-button
            @click.native="pay(order.id)"
            text="去付款"
            type="primary"
          ></x-button>
        </div>
      </div>
    </x-cell-group>

  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import GoodsItemHorizontal from '$components/GoodsItemHorizontal'
import XCellGroup from '$components/XCellGroup'
import InfoCell from '$components/InfoCell'
import XButton from '$components/XButton'
import WeInfoCell from '$components/WeInfoCell'

export default {
  components: {
    XHeader, GoodsItemHorizontal, XCellGroup, WeInfoCell, XButton, InfoCell
  },
  data() {
    return {
      id: '',
      goods: {
        logo: '/images/blank.png'
      },
      order_status: {
        '-1': {
          status_desc_1: "-",
          status_desc_2: "---",
          icon: '/images/blank.png'
        },
        0: {
          status_desc_1: "待支付",
          status_desc_2: "30分钟未支付订单将自动取消",
          icon: '/images/shop/order-dfk.png'
        },
        1: {
          status_desc_1: "待发货",
          status_desc_2: "你已付款成功，等待商家发货",
          icon: '/images/shop/order-dfh.png'
        },
        2: {
          status_desc_1: "待收货",
          status_desc_2: "24小时未处理订单将自动确认收货",
          icon: '/images/shop/order-dsh.png'
        },
        3: {
          status_desc_1: "已完成",
          status_desc_2: "交易已完成，如需售后请联系客服",
          icon: '/images/shop/order-ywc.png'
        },
        4: {
          status_desc_1: "退货中",
          status_desc_2: "协商处理中，请及时关注订单状态",
          icon: '/images/shop/order-thh.png'
        },
      },
      order: {
        status: -1
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.$toast.loading({mask: true})
      this.$http.get('/api/v1/order/' + this.id, { loading: true })
        .then(({ data }) => {
          this.order = data.order;
          let index = this.order.goods_title.indexOf(' ');
          let title = this.order.goods_title.substr(index+1)
          let game_name = this.order.goods_title.substr(0, index)
          let goods = {
            uuid: this.order.goods_uuid,
            logo: this.order.goods_logo,
            title: title,
            game_name: game_name,
            server_name: this.order.goods_server,
            amount: this.order.goods_price
          };
          this.goods = goods;
          this.$toast.clear()
        }).catch(({ response }) => {
          if (response.status == 404) {
            this.$router.back()
          }
        });
    },
    connectSaler(goodsId, user_id) {
      // 联系卖家
      this.downloadApp();
      if (this.$cookies.get('connect:goods:' + goodsId)) {
        window.soogua.postMessage(JSON.stringify({ "action": "route", "params": JSON.stringify({ "url": "message/" + user_id + "/6" }) }))
      } else {
        window.soogua.postMessage(JSON.stringify({ "action": "route", "params": JSON.stringify({ "url": "message/" + user_id + "/6/" + this.goodsId }) }));
        this.$cookies.set('connect:goods:' + goodsId, true)
      }
    },
    async destroy(id) {
      let message = "您确定要[取消]该订单吗？";
      await this.$confirm({
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
          this.$http.post('api/v1/order/' + id + '/close', {}, { loading: true }).then(({ message }) => {
            this.$toast(message);
            this.$router.back()
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
            setTimeout(() => {
              window.location.reload()
            }, 500)
          })
        });
    },
    pay(id) {
      this.$router.push({name: 'pay.type', params: {'order': id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}
.status {
  margin: auto;
  display: flex;
  height: 110px;
  padding: 0 20px;
  background: #000 url(/images/shop/account-bg.png) no-repeat center bottom;
  background-size: 100% 100%;

  .info {
    flex: 7;
    color: #fff;
    line-height: 30px;
    text-align: left;
    padding-top: 25px;
    span {
      font-size: 0.6rem;
    }
  }
  .icon {
    flex: 3;
    text-align: right;
    img {
      width: 100px;
    }
  }
}
.goods {
  background-color: #fff;
}
.btns {
  display: flex;
  padding: 15px;

  div {
    flex: 1;
    padding: 0px 10px;
  }
}
</style>
