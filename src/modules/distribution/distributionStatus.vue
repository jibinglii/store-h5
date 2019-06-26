
<template>
  <div>
    <x-header
      title="分销状况"
      back-url="me"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <div class="header">
      <h1>1927</h1>
      <span>分销单量</span>
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
import XHeader from "$components/XHeader";
import distributorStatusItem from "./components/distributorStatusItem";
import Tabs from "vant/lib/tabs";
import Tab from "vant/lib/tab";
import "vant/lib/tabs/style";
import "vant/lib/tab/style";
export default {
  name: "store",
  components: {
    XHeader,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "distributor-status-item": distributorStatusItem
  },
  data() {
    return {
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
        },
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.van-tabs__line {
  background-color: #000000;
  height: 2px;
}
.header {
  background-image: url(../../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 7.68rem;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 1.834667rem;
  }
  span {
    font-size: 0.554667rem;
    color: #b7b7b7;
  }
}
.list{
  .date-select{
    p{
      font-size: .682667rem;
      font-weight: 600;
      padding: .426667rem .64rem;
    }
  }
}
</style>
