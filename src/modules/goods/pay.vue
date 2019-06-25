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
      paytype: {index: 0, value: 'dc'},
      radios:[
        {
          title:'银行卡',
          value: 'dc',
          icon:'/images/shop/bank.png',
          checked: true
        },
        // {
        //   title:'分期付款',
        //   value: 'juhe',
        //   icon:'/images/shop/juhefq.png',
        //   checked: true
        // },
        // {
        //   title:'支付宝',
        //   value: 'alipay',
        //   icon:'/images/shop/alipay.png',
        //   checked: false
        // },
        // {
        //   title:'微信',
        //   value: 'wechat',
        //   icon:'/images/shop/weixin.png',
        //   checked: true
        // }
      ],
      order: {
        total_amount: '...'
      },
      canPay: false
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
  },
  mounted () {
    this.totalHtml = " ¥ " + this.formatMoney(this.total) + " 元";
  },
  methods: {
    next(){
      if (!this.canPay){
        return
      }
      if (this.paytype.value == 'dc'){
        this.$router.push({name: 'pay.bank', params: {'order': this.orderId}})
      }else if (this.paytype.value == 'juhe'){
        let url = "/api/v1/pay/juhefq?id=" + this.orderId + "&paytype=" + this.paytype.value;
        location.replace(url)
      }
    },
    getOrderInfo(){
      this.$toast.loading({mask: true})
      order.view(this.orderId).then(({data})=>{
        this.$toast.clear()
        this.order = data.order
        this.canPay = true
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
