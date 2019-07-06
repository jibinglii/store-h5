<template>
  <div class="page-box">
    <x-header title="添加银行卡" back-url="/shop/bankcard.html"></x-header>

    <x-group title="选择账户类型">
      <radio-cell :cells="radios" v-model="cardtype"></radio-cell>
    </x-group>

    <x-cell-group v-if="cardtype.value == 'bank'" title="完善银行卡信息">
      <info-cell v-if="hasRealname" title="姓名">{{bankinfo.realname}}</info-cell>
      <input-cell v-if="!hasRealname" v-model="bankinfo.realname" title="姓名" placeholder="请输入您的姓名"></input-cell>
      <input-cell type="number" v-model="bankinfo.id_card" title="身份证号" placeholder="请输入您的身份证号"></input-cell>
      <input-cell type="number" v-model="bankinfo.bankno" title="银行卡号" placeholder="请输入卡号"></input-cell>
      <input-cell type="number" v-model="bankinfo.mobile" title="预留手机号" placeholder="请输入手机号"></input-cell>
    </x-cell-group>

    <x-cell-group v-if="cardtype.value == 'alipay'" title="完善支付宝信息">
      <info-cell v-if="hasRealname" title="姓名">{{bankinfo.realname}}</info-cell>
      <input-cell v-if="!hasRealname" v-model="bankinfo.realname" title="姓名" placeholder="请输入您的姓名"></input-cell>
      <input-cell type="text" v-model="bankinfo.bankno" title="支付宝账号" placeholder="请输入您的账号"></input-cell>
      <input-cell type="number" v-model="bankinfo.mobile" title="预留手机号" placeholder="请输入手机号"></input-cell>
    </x-cell-group>

    <x-cell-group v-if="cardtype.value == 'wechat'" title="完善微信收款信息">
      <info-cell v-if="hasRealname" title="姓名">{{bankinfo.realname}}</info-cell>
      <input-cell v-if="!hasRealname" v-model="bankinfo.realname" title="姓名" placeholder="请输入您的姓名"></input-cell>
      <input-cell type="text" v-model="bankinfo.bankno" title="微信账号" placeholder="请输入您的账号"></input-cell>
      <input-cell type="number" v-model="bankinfo.mobile" title="预留手机号" placeholder="请输入手机号"></input-cell>
    </x-cell-group>

    <label for="weuiAgree" class="weui-agree">
      <input id="weuiAgree" type="checkbox" v-model="isagree" checked class="weui-agree__checkbox">
      <span class="weui-agree__text">
        同意
        <a @click="showAgree" href="javascript:void(0)">《绑卡服务协议》</a>
      </span>
    </label>

    <agree title="绑卡服务协议" ref="agree" :content="protocol"/>

    <div class="op" @click="next()">
      <x-button type="primary" text="下一步"></x-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XGroup from "$components/XGroup";
import XCellGroup from "$components/XCellGroup";
import RadioCell from "$components/RadioCell";
import InputCell from "$components/InputCell";
import InfoCell from "$components/InfoCell";
import XButton from "$components/XButton";
import Agree from "$components/Agree";
import protocol from '$api/protocol';
export default {
  components: {
    XHeader,
    XGroup,
    XCellGroup,
    RadioCell,
    InputCell,
    InfoCell,
    XButton,
    Agree
  },
  data() {
    return {
      hasRealname: false,
      isagree: false,
      saving: false,
      bankinfo:{
        bankno: "",
        realname: "",
        mobile: "",
        id_card: "",
        bank: "bank",
        is_default: 1
      },
      protocol: '',
      cardtype: {index: 0, value: 'bank'},
      radios:[
        {
          title:'银行卡',
          value: 'bank',
          icon:'/images/shop/bank.png',
          checked: true,
          show: true
        },
        {
          title:'支付宝',
          value: 'alipay',
          icon:'/images/shop/alipay.png',
          checked: false,
          show: true
        },
        {
          title:'微信',
          value: 'wechat',
          icon:'/images/shop/weixin.png',
          checked: true,
          show: true
        }
      ],
    }
  },
  created () {
    this.getProtocol()
  },
  methods: {
    next() {
      let validate = true;
      if (!this.isagree) {
        this.$alert("请勾选《绑卡服务协议》");
      } else {
        // for (var index in this.bankinfo){
        //   if(this.bankinfo[index]==""){
        //     validate = false;
        //     break;
        //   }
        // }
        // if(!validate){
        //   this.$alert("您填写的信息不完整");
        // }
        if (!this.saving && validate) {
          this.saving = true;
          this.$toast.loading('信息保存中');
          this.$http
            .post("api/v1/bankcard", _.assign(this.bankinfo, {bank: this.cardtype.value}))
            .then(({data}) => {
              this.saving = false;
              let redirect = this.$route.query['redirect']
              if (data.need_confirm){
                // todo fuyou
                let url = "/shop/bankcardsms.html?id=" + data.card.id + "&m=" + data.card.mobile +
                "&tssn=" + data.tssn + "&redirect=" + redirect;
                location.href = url;
              } else if(redirect != '' && redirect != undefined) {
                redirect = decodeURIComponent(redirect)
                location.replace(redirect);
              } else {
                this.$router.replace({name: 'banks'})
              }
            }).catch(() => {
              this.saving = false;
            })
        }
      }

    },
    showAgree() {
      this.$refs.agree.show();
    },
    help() {
      this.$alert({
        title: "持卡人说明",
        content: "为保证账户资金安全，只能绑定认证用户本人的银行卡（储蓄卡）或支付宝账户"
      });
    },
    getProtocol () {
      protocol.getProtocol('store_add_band').then(({data}) => {
        this.protocol = data.content
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}
.tips {
  position: relative;
  padding: 10px 10px 0 10px;
  font-size: 14px;
  i {
    font-size: 15px;
  }
}
.op {
  padding: 20px 20px;
}
</style>
