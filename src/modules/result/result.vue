<template>
  <div class="page-box">
    <x-header title="温馨提示"></x-header>
    <msg
      :type="getInfo('msgType')"
      :title="getInfo('title')"
    >
      <div slot="message">{{getInfo('message')}}</div>
      <div slot="action">
        <x-button
          v-if="id==0"
          text="查看订单"
          style="width:120px;"
          @click.native="$router.push({name: 'orders.view', params: {'id': order.id}})"
        ></x-button>
        <x-button
          v-if="id==1"
          text="重新支付"
          style="width:120px;"
          @click.native="$router.push({name: 'pay.type', params: {'order': order.id}})"
        ></x-button>
        <x-button
          v-if="id==0||id==1"
          @click.native="connectSaler(order.goods_id, order.goods_user_id)"
          text="联系卖家"
          style="width:120px;"
          type="primary"
        ></x-button>
        <x-button
          v-if="id==2"
          text="查看已发布商品"
          style="width:80%"
          type="primary"
          @click.native="redirect('/shop/store.html')"
        ></x-button>
        <x-button
          v-if="id==3"
          text="返回首页"
          style="width:120px;"
          type="primary"
          @click.native="redirect('/shop/index.html')"
        ></x-button>
        <x-button
          v-if="id==3"
          text="商品管理"
          style="width:120px;"
          @click.native="redirect('/shop/store.html')"
        ></x-button>
      </div>
    </msg>
    <recommend></recommend>
    <!-- <download v-if="id==0"></download> -->
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import Msg from './components/Msg'
import Recommend from '$components/Recommend'
import XButton from '$components/XButton'
// import Download from '$components/Download';
import user from '$api/user'

export default {
  components: {
    XHeader, Msg, XButton, Recommend
  },
  data() {
    return {
      id: '',
      order: [],
      msg: [
        {
          title: '支付成功',
          msgType: 'success',
          message: '您已支付成功，请耐心等待卖家发货或联系卖家'
        },
        {
          title: '支付失败',
          msgType: 'fail',
          message: '支付失败了，请重新支付'
        },
        {
          title: '提交成功',
          msgType: 'success',
          message: '您的商品已提交审核，请注意查收消息或通知'
        },
        {
          title: '完成认证',
          msgType: 'success',
          message: '您的认证信息已提交审核'
        }
      ]
    }
  },
  created() {
    this.id = this.$route.params.status
    let id = this.$route.query['MCHNTORDERID']
    if (id != undefined) {
      this.getFuiouH5(id)
    } else {
      this.getDetail();
    }
  },
  mounted() {
    if (this.id == 2) {
      user.getAuthStatus().then(({ data }) => {
        if (data.data.auth_status.is_auth == 0 || data.data.auth_status.is_auth == 4) {
          this.$alert({ 'title': '提示', content: "您还没有认证，请前往认证" }).then(() => {
            window.soogua.postMessage(JSON.stringify({
              "action": "route",
              "params": JSON.stringify({ "url": "cardOCR" })
            }))
          })
        }
      }).catch(error => {
        this.$alert({ 'title': '提示', content: "您还没有认证，请前往认证" }).then(() => {
          window.soogua.postMessage(JSON.stringify({
            "action": "route",
            "params": JSON.stringify({ "url": "cardOCR" })
          }))
        })
      })
    }
  },
  methods: {
    getInfo(val) {
      return this.msg[this.id][val];
    },
    async getFuiouH5(orderId) {
      this.$http.get('api/v1/order/fuiou-h5', {
        params: {
          id: orderId,
        }, loading: true
      }).then(({ data }) => {
        this.order = data.order;
      })
    },
    async getDetail() {
      let orderId = this.$route.params.id
      this.$http.get('/api/v1/order/' + orderId, {
        params: {
          include: 'goods',
          'fields[goods]': 'id,title,server_name,game_name,amount,images'
        }, loading: true
      }).then(({ data }) => {
        this.order = data.order;
      })
    },
    connectSaler(goodsId, user_id) {
      // 联系卖家
      this.downloadApp();
      if (this.$cookies.get('connect:goods:' + goodsId)) {
        window.soogua.postMessage(JSON.stringify({
          "action": "route",
          "params": JSON.stringify({ "url": "message/" + user_id + "/6" })
        }))
      } else {
        window.soogua.postMessage(JSON.stringify({
          "action": "route",
          "params": JSON.stringify({ "url": "message/" + user_id + "/6/" + this.goodsId })
        }));
        this.$cookies.set('connect:goods:' + goodsId, true)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}
</style>
