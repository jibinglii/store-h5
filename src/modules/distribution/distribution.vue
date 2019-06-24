
<template>
  <div>
    <x-header
      title="分销人员管理"
      back-url="home"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <van-tabs v-model="active">
      <van-tab
        :title="item"
        title-active-color="#000000"
        v-for="(item, index) in tabs"
        :key="index"
      ></van-tab>
    </van-tabs>
    <div v-for="(item,key) in goods" :key="key" class="list">
      <v-slide>
        <section class="custom-cell" :class="slideDirection" slot="center">
          <distributor-item :item="item"></distributor-item>
        </section>
      </v-slide>
    </div>
  </div>
</template>
<script>
// https://youzan.github.io/vant/#/zh-CN/tab
// todo 修改选择样式
import XHeader from "$components/XHeader";
import Tabs from "vant/lib/tabs";
import Tab from "vant/lib/tab";
import "vant/lib/tabs/style";
import "vant/lib/tab/style";
import distributorItem from "./distributorItem";
import Slide from "./slide";
export default {
  name: "store",
  components: {
    XHeader,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "distributor-item": distributorItem,
    vSlide: Slide
  },
  data() {
    return {
      tabs: ["全部", "已启用", "未启用"],
      active: 0,
      slideDirection: "",
      goods: [
        {
          id: "ID：1524123",
          title: "火影忍者超级无敌号",
          desc: "正常",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "ID：1524123",
          title: "火影忍者超级无敌号",
          desc: "停用",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        }
      ],
      page: 1
    };
  },
  methods: {

  }
};
</script>
<style lang="scss">
.van-tabs__line {
  background-color: #000000;
  height: 2px;
}
.tabsTwo {
  .van-tabs__line {
    height: 0px;
  }
}
.list {
  overflow: hidden;
}
</style>
