<template>
  <div class="page-box">
    <x-header title="收银台"></x-header>

    <x-group title="请选择支付方式">
      <radio-cell :cells="radios" v-model="paytype"></radio-cell>
    </x-group>

    <div class="pay-bar">
      <span class="total">¥ {{order.total_amount|formatMoney}}</span>
      <a @click="next()" :class="{disabled: !canPay}">去支付</a>
    </div>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import XGroup from '$components/XGroup'
import RadioCell from '$components/RadioCell'
import user from '$api/user'
import order from '$api/order'
export default {
  components: {XHeader, XGroup, RadioCell},
  data () {
    return {
      orderId: '',
      paytype: {index: 0, value: 'bank'},
      order: {
        total_amount: '...'
      },
      canPay: false,
      payment: {}
    }
  },
  computed: {
    radios () {
      if (this.payment.types != undefined){
        let types = Object.values(this.payment.types)
        let limit = this.payment.payment
        console.log(limit['alipay'])
        let r = [
          {
            title:'银行卡',
            value: 'bank',
            icon:'/images/shop/bank.png',
            checked: true,
            show: _.indexOf(types, 'bank') != -1 && (limit['bank'].norm == 0 ? true : limit['bank'].norm > this.order.total_amount),
          },
          // {
          //   title:'分期付款',
          //   value: 'juhe',
          //   icon:'/images/shop/juhefq.png',
          //   checked: true
          // },
          {
            title:'支付宝',
            value: 'alipay',
            icon:'/images/shop/alipay.png',
            checked: false,
            show: _.indexOf(types, 'alipay') != -1 && (limit['alipay'].norm == 0 ? true : limit['alipay'].norm > this.order.total_amount) && !this.isWechat(),
          },
          {
            title:'微信',
            value: 'wechat',
            icon:'/images/shop/weixin.png',
            checked: true,
            show: _.indexOf(types, 'wechat') != -1 && (limit['wechat'].norm == 0 ? true : limit['wechat'].norm > this.order.total_amount) && this.isWechat(),
          }
        ]
        return r
      }

      return []
    }
  },
  created () {
    // 先验证是否设置了支付密码
    user.getUserInfo(true).then(({data}) => {
      if (!data.user.is_set_paypasswd) {
        // window.location.replace('/shop/set_pay_pwd.html?redirect='+ encodeURIComponent(location.href));
        this.$alert('您还没有设置支付密码，点击【是】前往设置', {
          title: "温馨提示",
          btn: {
            text: '去设置',
            style: { overflow: "inherit" },
          }
        }).then(() => {
          let redirect = encodeURIComponent(window.location.href);
          this.$router.push({ name: 'me.set-pay-pwd', query: {redirect: redirect} })
        });
      }
    }).catch(error => {
      this.$router.back()
    });
    this.orderId = this.$route.params.order
    this.getOrderInfo()
    this.getPayment()
  },
  mounted () {
    this.totalHtml = " ¥ " + this.formatMoney(this.total) + " 元";
  },
  methods: {
    next(){
      if (!this.canPay){
        return
      }
      if (this.paytype.value == 'bank'){
        this.$router.push({name: 'pay.bank', params: {'order': this.orderId}})
      }else if (this.paytype.value == 'juhe'){
        let url = window.API_ROOT + "/api/v1/pay/juhefq?id=" + this.orderId + "&paytype=" + this.paytype.value;
        location.replace(url)
      }else if(this.paytype.value == 'alipay'){
        let url = window.API_ROOT + "/api/v2/alipay/"+ this.orderId +
                  "?callback=" + encodeURIComponent(location.origin + '/' + window.STORE_ID + '/result/0?id=' + this.orderId);
        location.replace(url)
      }else if(this.paytype.value == 'wechat'){
        let url = window.API_ROOT + "/api/v2/pay/wechat/" + this.orderId +
                        "?callback=" + encodeURIComponent(location.origin + '/' + window.STORE_ID + '/result/0?id=' + this.orderId);
        location.replace(url);
      }
    },
    async getOrderInfo(){
      this.$toast.loading({mask: true})
      await order.view(this.orderId).then(({data})=>{
        this.$toast.clear()
        this.order = data.order
        this.canPay = true
      })
    },
    async getPayment(){
      await this.$http.get('api/v2/payment/channel').then(data => {
        this.payment = data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}

.pay-bar{
  height: 50px;
    background-color: white;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 16px;

    span{
      padding-left: 20px;
      font-size: 18px;
    }
    a{
      position:absolute;
      right:0;
      height: 50px;
      padding:0px 2rem;
      background-color:#000;
      color:#fff;
      &.disabled{
        opacity: 0.7;
      }
    }
}
</style>
