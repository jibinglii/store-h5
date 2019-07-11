<template>
  <div class="page-box">
    <x-header title="确认订单"></x-header>
    <div class="goods">
      <goods-item-horizontal
        :goods="goods"
        :lazy="false"
      />
    </div>

    <x-cell-group>
      <info-cell title="配送方式">在线发货</info-cell>
    </x-cell-group>

    <x-cell-group title="收货信息">
      <input-cell
        title="您的姓名"
        placeholder="请输入姓名"
        v-model="receiver_name"
      ></input-cell>
      <input-cell
        type="number"
        title="您的电话"
        placeholder="请输入手机号"
        v-model="receiver_mobile"
      ></input-cell>
    </x-cell-group>

    <x-cell-group Title="担保服务">
      <x-picker
        ref="servicepicker"
        @confirm="getTotal"
        :default-index="defaultIndex"
        :columns="serviceColumns"
        title="所选服务"
        v-model="serviceValue"
      ></x-picker>
    </x-cell-group>

    <label
      for="weuiAgree"
      class="weui-agree"
    >
      <input
        id="weuiAgree"
        type="checkbox"
        checked
        class="weui-agree__checkbox"
        v-model="isagree"
      >
      <span class="weui-agree__text">账号在交易已完成之后出现账号被盗、被封号、被找回可获得赔偿。
        <a
          @click="showAgree"
          href="javascript:void(0)"
        >《担保服务协议》</a>
      </span>
    </label>

    <agree
      title="担保服务协议"
      ref="agree"
      :content="insureContent"
    />

    <div class="pay-bar">
      <span class="total">{{totalHtml}}</span>
      <a
        @click="next()"
        :class="{disabled: !canSubmit}"
      >去结算</a>
    </div>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import GoodsItemHorizontal from '$components/GoodsItemHorizontal'
import XCellGroup from '$components/XCellGroup'
import InfoCell from '$components/InfoCell'
import InputCell from '$components/InputCell'
import XPicker from '$components/XPicker'
import Agree from '$components/Agree'
import protocol from '$api/protocol'
import localforage from 'localforage'

export default {
  components: {
    XHeader, GoodsItemHorizontal, XCellGroup, InfoCell, XPicker, Agree, InputCell
  },
  data() {
    return {
      gameId: '',
      total: 0,
      totalHtml: '',
      goods: {},
      serviceColumns: [],
      defaultIndex: 2,
      receiver_name: '',
      receiver_mobile: '',
      services: [{"name":"30天担保产品","value":"1","day":30,"rate":0.1},{"name":"60天担保产品","value":"2","day":60,"rate":0.15},{"name":"不参与担保服务","value":"0","day":0,"rate":0}],
      serviceValue: {
        value: '',
        index: 2
      },
      creating: false,
      insureContent: '',
      isagree: false,
      spread_id: 0,
      token: ''
    }
  },
  watch: {
    receiver_name (val) {
      localforage.setItem('receiver_name', val)
    },
    receiver_mobile (val) {
      localforage.setItem('receiver_mobile', val)
    }
  },
  computed: {
    canSubmit() {
      if (this.receiver_name != '' && this.receiver_mobile != '') {
        return true
      }
      return false
    }
  },
  created() {
    this.goodsId = this.$route.params.goods
    this.getDetail();
    this.getSaleProtocol();
    this.getToken();
    localforage.getItem('receiver_name').then(val => {
      val == '' || (this.receiver_name = val)
    })
    localforage.getItem('receiver_mobile').then(val => {
      val == '' || (this.receiver_mobile = val)
    })
    if (this.$cookies.get('goods-spread') != undefined && this.$cookies.get('goods-spread') != 'undefined'){
      this.spread_id = this.$cookies.get('goods-spread')
    }
    if (this.$route.query['spread_id'] != undefined){
      this.spread_id = this.$route.query['spread_id']
    }
  },
  methods: {
    next() {
      if (this.canSubmit) {
        if (this.serviceValue.index != this.serviceColumns.length - 1 && this.isagree == false) {
          this.$toast({message:'您必须同意《担保服务协议》才能继续'});
          return
        }
        if (!this.creating) {
          this.creating = true;
          // 创建订单
          let param = {
            num: 1,
            receiver_name: this.receiver_name,
            receiver_mobile: this.receiver_mobile,
            express_type: 0,
            insure: this.serviceValue.index,
            spread_id: this.spread_id,
            '_token': this.token
          };
          this.$toast.loading({mask: true})
          this.$http.post('api/v1/order/' + this.goodsId, param).then(({ data }) => {
            this.$toast.clear()
            this.creating = false;
            let orderId = data.id;
            this.$router.push({name: 'pay.type', params: {'order': orderId}})
          }).catch(({data}) => {
            this.$toast.clear()
            this.creating = false;
            this.$toast(data.message)
          })
        }
      } else {
        this.$toast.fail('请先输入收货信息')
      }
    },
    async getDetail() {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      });
      await this.$http.get('/api/v1/goods/' + this.goodsId).then(({ data }) => {
        this.$toast.clear()
        this.goods = data.goods;
        this.initService();
        this.getTotal();
      })
    },
    getTotal() {
      let rate = this.services[this.serviceValue.index].rate;
      this.total = (this.goods.amount * rate) + this.goods.amount;
      this.totalHtml = " ¥ " + this.formatMoney(this.total) + " 元";
    },
    initService() {
      this.services.forEach((value) => {
        let name = value.name;
        if (value.value != "0") {
          name = name + " ( ¥ " + this.formatMoney((this.goods.amount * value.rate)) + ')';
        }
        this.serviceColumns.push(name);
      });
    },
    showAgree() {
      this.$refs.agree.show()
    },
    getSaleProtocol() {
      protocol.getProtocol('insure').then(data => {
        this.insureContent = data.data.content
      })
    },
    getToken(){
      this.$http.get('api/request-token').then(data => {
        this.token = data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  padding-bottom: 60px;
}
.page-box {
  position: relative;
}
.goods {
  background-color: #fff;
}
.pay-bar {
  height: 50px;
  background-color: white;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 16px;
  z-index: 1000;
  span {
    padding-left: 20px;
    font-size: 21px;
  }
  a {
    position: absolute;
    right: 0;
    height: 50px;
    padding: 0px 2rem;
    background-color: #000;
    color: #fff;
    &.disabled {
      opacity: 0.7;
    }
  }
}
</style>
