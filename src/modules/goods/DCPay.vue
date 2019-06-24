<template>
  <div>
    <x-header title="银行卡支付"></x-header>
    <div>
      <order-item
        :order="order"
        :show-btn="false"
      ></order-item>
    </div>
    <x-cell-group title="付款银行卡">
      <x-picker
        ref="bank"
        :data="bankcards"
        :columns="bankColumns"
        title="银行卡"
        v-model="bank"
      ></x-picker>
    </x-cell-group>
    <div
      class="pay"
      @click="pay()"
    >¥ {{order.total_amount|formatMoney}} 立即付款</div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :overlay="true"
    >
      <div class="password-zone">
        <div
          class="close"
          @click="close()"
        ><i class="iconfont icon-close"></i></div>
        <div class="title">请输入支付密码</div>
        <van-password-input
          :value="showValue"
          :info="info"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import XPicker from '$components/XPicker'
import XHeader from '$components/XHeader'
import OrderItem from '$components/OrderItem'
import XCellGroup from '$components/XCellGroup'
import InfoCell from '$components/InfoCell'
import Popup from 'vant/lib/popup';
import 'vant/lib/popup/style';
import PasswordInput from 'vant/lib/password-input'
import NumberKeyBoard from 'vant/lib/number-keyboard'
import 'vant/lib/password-input/style';
import 'vant/lib/number-keyboard/style';
import user from '$api/user'
import order from '$api/order'
import bank from '$api/bank'
export default {
  components: {    XHeader, OrderItem, XCellGroup, InfoCell, 'van-popup': Popup,
    'van-password-input': PasswordInput,
    'van-number-keyboard': NumberKeyBoard, XPicker  },
  data() {
    return {
      orderid: '',
      order: {},
      bank: { bank_info: { bankName: '' } },
      isShow: false,
      showKeyboard: true,
      showValue: '',
      info: '',
      bankcards: []
    }
  },
  computed: {
    bankColumns() {
      let list = [];
      this.bankcards.forEach(item => {
        list.push(item.realname + ' 尾号：' + item.bankno_last4)
      });
      return list
    }
  },
  methods: {
    getOrderInfo() {
      order.view(this.orderid).then(({ data }) => {
        this.order = data.order
      })
    },
    getBankInfo() {
      bank.list().then(({ data }) => {
        if (data.bank_cards.length == 0) {
          throw new Exception('没有银行卡')
        }
        this.bankcards.push(...data.bank_cards)
      }).catch(({ response }) => {
        // this.$alert('您还没有添加银行卡，点击前往添加').then(() => {
        //   let redirect = encodeURIComponent(window.location.href);
        //   window.location.replace('/shop/bankcardadd.html?redirect=' + redirect)
        // })
      })
    },
    pay() {
      if (this.bank.index == 0 && this.bank.value == '请选择') {
        this.$alert('请先选择银行卡').then(() => {
          this.$refs['bank'].show = true
        })
      } else {
        this.isShow = true
      }
    },
    onInput(key) {
      this.showValue = (this.showValue + key).slice(0, 6);
      if (this.showValue.length == 6) {
        // 验证密码
        user.veryPPwd(this.showValue, true).then(({ data }) => {
          let param = { bankid: this.bankcards[this.bank.index].id, orderid: this.order.id };
          this.confirmPay(param)
        }).catch(({ response }) => {
          this.$toast({            message: '支付密码输入错误', onClose: () => {
              this.showValue = ''
            }          })
        })
      }
    },
    onDelete() {
      this.showValue = this.showValue.slice(0, this.showValue.length - 1);
    },
    close() {
      this.isShow = false
    },
    async confirmPay(param) {
      this.$loading({message: '正在请求支付...', mask: true});
      location.replace('/api/v1/pay/fuiou-h5/' + param.orderid + '/' + param.bankid + '?token=')
    }
  },
  created() {
    this.orderid = this.$route.params.order
    this.getOrderInfo()
    this.getBankInfo()
  }
}
</script>

<style lang="scss">
.pay {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  background-color: #020202;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.password-zone {
  height: 22rem;
  position: relative;
  .close {
    font-size: 30px;
    position: absolute;
    right: 0;
    width: 44px;
    height: 44px;
    line-height: 28px;
    text-align: center;
  }
  .title {
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 12px;
    color: #0079f3;
  }
}
</style>
