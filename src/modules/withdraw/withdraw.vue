
<template>
  <div>
    <x-header title="提现"></x-header>
    <div class="card">
      <van-cell-group>
        <van-cell title="到账银行卡">
          <span @click="showlist()" class="default_text">
            <i class="iconfont" :class="'icon-' + bankImg"></i>
            {{bankName}}
            <van-icon name="arrow" v-show="downIcon"/>
            <van-icon name="arrow-down" v-show="!downIcon"/>
          </span>
        </van-cell>
        <ul v-show="flag" class="select_box">
          <li
            @click="checkThis(item)"
            v-for="(item, index) in bank_cards"
            :key="index"
          >
            <i class="iconfont" :class="'icon-' + item.bank"></i>
            <a href="javascript:void(0);">{{item.bank_info.bankName}} {{item.bankno_last4}}</a>
          </li>
        </ul>
      </van-cell-group>
      <van-cell-group>
        <p class="title">提现金额</p>
        <van-field v-model="amount" placeholder="请输入提现金额" class="amountInput"/>
      </van-cell-group>
      <div class="dec" v-if="showBalance">
        钱包余额
        <span>￥{{currentUser.wallet.amount|formatMoney}}</span>
        <a @click="withdrawBtn">全部提现</a>
      </div>
      <div class="dec" v-if="showDec">
        额外扣除
        <span>￥{{amount}}</span>（费率0.10%）
      </div>
      <div class="btn">
        <van-button
          type="primary"
          hairline
          size="large"
          @click="pay"
          :class="{disabled: !canSubmit}"
        >预计24小时内到账，确认提现</van-button>
      </div>
    </div>
    <router-link :to="{name: 'me.helps'}" class="quesBotm">常见问题</router-link>
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
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Checkbox from "vant/lib/checkbox";
import "vant/lib/checkbox/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import Icon from "vant/lib/icon";
import "vant/lib/icon/style";
import { mapGetters } from "vuex";
import Popup from 'vant/lib/popup';
import 'vant/lib/popup/style';
import PasswordInput from 'vant/lib/password-input'
import NumberKeyBoard from 'vant/lib/number-keyboard'
import 'vant/lib/password-input/style';
import 'vant/lib/number-keyboard/style';

import user from '$api/user'

export default {
  name: "withdraw",
  components: {
    XHeader,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-field": Field,
    "van-checkbox": Checkbox,
    "van-icon": Icon,
    [Popup.name]: Popup,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyBoard.name]: NumberKeyBoard
  },
  data() {
    return {
      flag: false,
      bank_cards: [],
      amount: "",
      bankName: "请选择",
      bankImg: "",
      showBalance: true,
      showDec: false,
      downIcon: true,
      isShow: false,
      showKeyboard: true,
      showValue: '',
      info: '',
      bank: ''
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    canSubmit() {
      if (this.amount != "") {
        return true;
      }
      return false;
    }
  },
  created() {
    this.$http
      .get("/api/v1/bankcard/", { loading: true })
      .then(({ data }) => {
        this.bank_cards = data.bank_cards;
        if (this.bank_cards.length == 0){
          this.$alert('您还没有添加银行卡，点击前往添加').then(() => {
            let redirect = encodeURIComponent(window.location.href);
            this.$router.replace({name: 'banks.add', query: {redirect: redirect}})
          })
        }
      })
  },
  methods: {
    onInput(key) {
      this.showValue = (this.showValue + key).slice(0, 6);
      if (this.showValue.length == 6) {
        // 验证密码
        this.$toast.loading({message: '正在验证码支付密码...', mask: true});
        user.veryPPwd(this.showValue, true).then(({ data }) => {
          this.confirm()
        }).catch(({ response }) => {
          this.$toast({message: '支付密码输入错误'})
          this.showValue = ''
        })
      }
    },
    onDelete() {
      this.showValue = this.showValue.slice(0, this.showValue.length - 1);
    },
    close() {
      this.isShow = false
    },
    showlist: function() {
      this.flag = !this.flag;
      this.downIcon = !this.downIcon;
    },
    checkThis: function(bank) {
      this.bankName = bank.bank_info.bankName + bank.bankno_last4;
      this.bankImg = bank.bank;
      this.flag = !this.flag;
      this.downIcon = !this.downIcon;
      this.bank = bank
    },
    withdrawBtn() {
      this.showBalance = false;
      this.showDec = true;
      this.amount = this.currentUser.wallet.amount;
    },
    pay() {
      if (this.bank == '') {
        this.$alert('请先选择银行卡').then(() => {
          this.showlist()
        })
      } else {
        this.isShow = true
      }
    },
    confirm(){
      let param = {bank_id: this.bank.id, amount: this.amount}
      this.$toast.loading({mask: true})
      this.$http.post('api/v2/user/withdraws/apply', param).then(()=>{
        this.$toast.success('提现申请提交成功')
        this.$router.back()
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  width: 94%;
  margin: 10px auto;
  background: #ffffff;
  /deep/.van-cell-group {
    .van-dropdown-menu {
      height: 24px;
      .van-dropdown-menu__item {
        display: block;
      }
      .van-cell__title {
        text-align: left;
      }
    }
    .van-hairline--top-bottom::after {
      border-width: 0px;
    }
    .van-cell {
      padding: 0.426667rem 0.64rem;
      font-size: 0.768rem;
      .van-cell__title {
        span {
          color: #666;
        }
      }
      .van-cell__value {
        flex: 2;
        .default_text {
          font-size: 0.597333rem;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          img {
            width: 0.853333rem;
            height: 0.853333rem;
            padding-right: 0.426667rem;
          }
          .van-icon {
            padding-left: 0.426667rem;
          }
        }
      }
    }
    .select_box {
      width: 100%;
      position: absolute;
      z-index: 99999;
      padding: 0 0 0.426667rem 0;
      background-color: #ffffff;
      li {
        display: flex;
        align-items: center;
        padding: 0.426667rem;
        border-bottom: solid 1px #f2f2f2;
        img {
          padding-right: 0.426667rem;
          width: 0.64rem;
          height: 0.64rem;
        }
        a {
          font-size: 0.597333rem;
        }
      }
    }
    .title {
      font-size: 0.597333rem;
      color: #999;
      padding: 0.426667rem 0.64rem;
    }
    .amountInput {
      font-weight: 600;
      font-size: 1.28rem;
      &::before {
        content: "￥";
        line-height: 1.4;
      }
    }
    .van-field__control::-webkit-input-placeholder {
      font-weight: 400;
    }
  }
  .dec {
    padding: 0.853333rem 0 0.426667rem 0.64rem;
    font-size: 0.554667rem;
    color: #999;
    a {
      padding-left: 0.426667rem;
      text-decoration: underline;
      color: #007bff;
    }
  }
  .btn {
    text-align: center;
    .van-button {
      width: 90%;
      margin: 0.853333rem auto 2.133333rem auto;
      background: #000;
      color: #ffffff;
      border-radius: 0.213333rem;
      &.disabled {
        opacity: 0.3;
      }
    }
  }
}
.quesBotm {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0.426667rem;
  margin: auto;
  font-size: 0.597333rem;
  color: #999;
  text-align: center;
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
