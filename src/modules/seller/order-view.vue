<template>
  <div class="page-box">
    <x-header title="商家订单详情"></x-header>
    <div class="status">
      <div class="info">
        {{order_status[order.status].status_desc_1}}<br />
        <span>{{order_status[order.status].status_desc_2}}</span>
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
      <info-cell title="商品总价">{{order.goods_price}}</info-cell>
      <info-cell title="担保无忧">{{order.insure_name}}</info-cell>
      <info-cell title="担保费">{{order.insure_fee}}</info-cell>
    </x-cell-group>

    <x-cell-group>
      <we-info-cell
        title="实付款"
        :desc="order.total_amount"
      ></we-info-cell>
    </x-cell-group>

    <x-cell-group>
      <we-info-cell title="订单信息"></we-info-cell>
      <info-cell title="订单编号">{{order.id}}</info-cell>
      <info-cell title="创建时间">{{order.created_at}}</info-cell>
      <info-cell title="付款时间" v-show="order.payment_time">{{order.payment_time}}</info-cell>
    </x-cell-group>

    <x-cell-group v-if="order.status>1">
      <we-info-cell title="发货信息"></we-info-cell>
      <info-cell title="发货时间">{{order.express_at}}</info-cell>
    </x-cell-group>

    <x-cell-group>
      <div class="btns">
        <div v-if="order.status==1">
          <x-button
            @click.native="shipping(order.id)"
            text="确认发货"
            type="primary"
          ></x-button>
        </div>
        <div v-if="order.status!=1">
          <x-button
            @click.native="$router.back()"
            text="返回"
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
          status_desc_2: "24小时未支付订单将自动取消",
          icon: '/images/shop/order-dfk.png'
        },
        1: {
          status_desc_1: "待发货",
          status_desc_2: "买家付款成功，等待商家发货",
          icon: '/images/shop/order-dsh.png'
        },
        2: {
          status_desc_1: "待收货",
          status_desc_2: "24小时买家未处理，将自动收货",
          icon: '/images/shop/order-dsh.png'
        },
        3: {
          status_desc_1: "已完成",
          status_desc_2: "交易已完成",
          icon: '/images/shop/order-dsh.png'
        },
        4: {
          status_desc_1: "退货中",
          status_desc_2: "协商处理中",
          icon: '/images/shop/order-thh.png'
        },
      },
      order: {
        status: -1
      }
    }
  },
  mounted() {
    this.id = this.$route.params.order
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.$toast.loading({mask: true})
      this.$http.get('/api/v1/seller-order/' + this.id)
        .then(({ data }) => {
          this.$toast.clear()
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
          this.goods = goods
        }).catch(({ response }) => {
          this.$router.back()
        });
    },
    redirect(url) {
      location.href = url;
    },
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
          this.$http.post('api/v1/order/shipping/' + id, {}, { loading: true }).then(({ data }) => {
            this.$toast(data.message);
            this.getDetail()
          })
        });
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
    font-size: .875rem;
    span {
      font-size: 0.7rem;
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
