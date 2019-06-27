<template>
  <div class="storeManage">
    <x-header title="结算管理" url="me.me"></x-header>
    <div class="store_banner">
      <div class="store_banner_t">
        <span>可提现金额</span>
        <p>
          <sup>￥</sup>1635.00
        </p>
        <van-button plain hairline type="primary" class="withdraw">申请提现</van-button>
      </div>
      <div class="store_banner_b">
        <div class="store_banner_l">
          <p>
            <sup>￥</sup>
            {{ info.total_sale|formatMoney}}
          </p>
          <span>已完成交易</span>
        </div>
        <div class="store_banner_r">
          <p>
            <sup>￥</sup>
            {{ info.total_sale_month | formatMoney }}
          </p>
          <span>未完成交易</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab
        :title="item"
        title-active-color="#000000"
        v-for="(item, index) in tabs"
        :key="index"
      ></van-tab>
    </van-tabs>
    <div class="list">
      <div class="date-select">
        <p>2019年3月</p>
      </div>
      <div v-for="(item,key) in goods" :key="key">
        <distributor-status-item :item="item"></distributor-status-item>
      </div>
    </div>
  </div>
</template>

<script>
import distributorStatusItem from "../distribution/components/distributorStatusItem";
import XHeader from "$components/XHeader";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import Tabs from "vant/lib/tabs";
import Tab from "vant/lib/tab";
import "vant/lib/tabs/style";
import "vant/lib/tab/style";

export default {
  name: "storeManage",
  components: {
    XHeader,
    "van-button": Button,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "distributor-status-item": distributorStatusItem
  },
  data() {
    return {
      info: {},
      tabs: ["全部", "已结算", "未结算"],
      active: 0,
      goods: [
        {
          id: "ID：1524123",
          title: "王者荣耀-全区全服-全区全服",
          status: "已结算",
          price: "100元",
          transacDate: "2019-03-27 23:37:35",
          settlementDate: "2019-06-27 23:37:35",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "ID：1524123",
          title: "王者荣耀-全区全服-全区全服",
          status: "未结算",
          price: "100元",
          transacDate: "2019-03-27 23:37:35",
          settlementDate: "2019-06-27 23:37:35",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        }
      ]
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      await this.$http.get("api/v1/seller/total").then(({ data }) => {
        this.info = data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.storeManage {
  .right-box {
    display: none;
  }
  .store_banner {
    width: 100%;
    height: 8.533333rem;
    background-image: url(../../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding: 0.853333rem 0;
    color: #ffffff;
    .store_banner_t {
      line-height: 1.4;
      padding: 0.426667rem 0;
      span {
        font-size: 0.512rem;
        color: #b7b7b7;
      }
      p {
        font-size: 1.408rem;
        sup {
          font-size: 0.597333rem;
          font-weight: 400;
        }
      }
      .withdraw {
        height: 1.493333rem;
        line-height: 1.493333rem;
        border: solid 1px #b7b7b7;
        background-color: transparent;
        font-size: 0.512rem;
        margin: 0.426667rem 0 0.853333rem;
        border-radius: 0.213333rem;
      }
    }
    .store_banner_b {
      display: flex;
      align-items: center;
      .store_banner_l,
      .store_banner_r {
        flex: 1;
        text-align: center;
        line-height: 1.1;
        p {
          font-size: 0.853333rem;

          sup {
            font-size: 0.597333rem;
            font-weight: 400;
          }
        }
        span {
          font-size: 0.512rem;
          font-weight: 200;
          color: #b7b7b7;
        }
      }
    }
  }
  /deep/.van-tabs__line {
    background-color: #000000;
    height: 2px;
  }
  .list {
    .date-select {
      p {
        font-size: 0.682667rem;
        font-weight: 600;
        padding: 0.426667rem 0.64rem;
      }
    }
  }
}
</style>
