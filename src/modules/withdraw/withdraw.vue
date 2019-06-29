
<template>
  <div>
    <x-header title="提现"></x-header>
    <div class="card">
      <van-cell-group>
        <van-cell title="到账银行卡">
          <span @click="showlist()" class="default_text">
            <img :src="bankImg">
            {{bankName}}
            <van-icon name="arrow" v-show="downIcon"/>
            <van-icon name="arrow-down" v-show="!downIcon"/>
          </span>
        </van-cell>
        <ul v-show="falg" class="select_box">
          <li
            @click="checkThis(item.bank_info.bankName,item.bank_info.bankImg)"
            v-for="(item, index) in bank_cards"
            :key="index"
          >
            <img :src="item.bank_info.bankImg">
            <a href="javascript:void(0);">{{item.bank_info.bankName}}</a>
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
          @click="next()"
          :class="{disabled: !canSubmit}"
        >预计24小时内到账，确认提现</van-button>
      </div>
    </div>
    <a href class="quesBotm">常见问题</a>
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

export default {
  name: "withdraw",
  components: {
    XHeader,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-field": Field,
    "van-checkbox": Checkbox,
    "van-icon": Icon
  },
  data() {
    return {
      falg: false,
      bank_cards: [],
      amount: "",
      bankName: "请选择",
      bankImg: "",
      showBalance: true,
      showDec: false,
      downIcon: true
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
    this.$http.get("/api/v1/bankcard/", { loading: true }).then(({ data }) => {
      this.bank_cards = data.bank_cards;
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    showlist: function() {
      this.falg = !this.falg;
      this.downIcon = !this.downIcon;
    },
    checkThis: function(bankName, bankImg) {
      this.bankName = bankName;
      this.bankImg = bankImg;
      this.falg = !this.falg;
      this.downIcon = !this.downIcon;
    },
    withdrawBtn() {
      this.showBalance = false;
      this.showDec = true;
      this.amount = this.currentUser.wallet.amount;
    },
    next() {
      this.$router.push({
        name: "withdraw.paypwd"
      });
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
            width: .853333rem;
            height: .853333rem;
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
</style>
