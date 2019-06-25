<template>
  <div>
    <x-header title="经营状况" back-color="#ffffff" color="#000" underline-color="#f2f2f2"></x-header>
    <van-tabs v-model="active">
      <van-tab
        :title="item"
        title-active-color="#000000"
        v-for="(item, index) in tabs"
        :key="index"
      ></van-tab>
    </van-tabs>
    <div v-for="(item,key) in goods" :key="key" class="list">
      <goods-item :item="item"></goods-item>
    </div>
  </div>
</template>
<script>
import XHeader from "$components/XHeader";
import Tabs from "vant/lib/tabs";
import Tab from "vant/lib/tab";
import "vant/lib/tabs/style";
import "vant/lib/tab/style";
import goodsItem from "./components/goodsItem";

export default {
  components: {
    XHeader,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "goods-item": goodsItem
  },
  data() {
    return {
      tabs: ["全部", "审核中", "在售中", "已出售", "已下架"],
      active: 0,
      search: "",
      goods: [
        {
          id: "ID：1524123",
          headLine: "王泽荣耀V8满英雄号，很多限定皮肤",
          title: "王者荣耀-全区全服-全区全服",
          commission: "10%",
          price: "956.6元",
          status: "出售中",
          distributionBtn: "分销商品",
          ObtainedBtn: "下架",
          transactionBtn: "查看交易",
          delectBtn: "删除",
          reStockingBtn: "重新上架",
          releaseTime: "2019-03-27 23:37:35",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "ID：1524123",
          headLine: "王泽荣耀V8满英雄号，很多限定皮肤",
          title: "王者荣耀-全区全服-全区全服",
          commission: "10%",
          price: "956.6元",
          status: "审核中",
          distributionBtn: "分销商品",
          ObtainedBtn: "下架",
          transactionBtn: "查看交易",
          delectBtn: "删除",
          reStockingBtn: "重新上架",
          releaseTime: "2019-03-27 23:37:35",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "ID：1524123",
          headLine: "王泽荣耀V8满英雄号，很多限定皮肤",
          title: "王者荣耀-全区全服-全区全服",
          commission: "10%",
          price: "956.6元",
          status: "已出售",
          distributionBtn: "分销商品",
          ObtainedBtn: "下架",
          transactionBtn: "查看交易",
          delectBtn: "删除",
          reStockingBtn: "重新上架",
          releaseTime: "2019-03-27 23:37:35",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.van-tabs__line {
  background-color: #000;
  height: 2px;
}
</style>
