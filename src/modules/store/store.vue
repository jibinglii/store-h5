
<template>
  <div>
    <x-header
      title="店铺主页"
      back-url="home"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <van-tabs v-model="active">
      <van-tab
        :title="item"
        v-for="(item, index) in tabs"
        :key="index"
      >
        <van-tabs
          v-model="activeContent[index]"
          @click="onTabClick"
        >
          <van-tab
            :title="itemContent"
            v-for="(itemContent, index) in tabContents[index]"
            :key="index"
          />
        </van-tabs>
      </van-tab>
    </van-tabs>
    <div class="list">
      <goods-item
        v-for="item in goods"
        :key="item.id"
        :goods="item"
      ></goods-item>
      <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId">
        <div slot="spinner">
          <van-loading
            type="spinner"
            size="18px"
          > 加载中... </van-loading>
        </div>
        <div slot="no-more">没有更多数据啦...</div>
        <div slot="no-results">没有数据</div>
      </infinite-loading>
    </div>
    <tab></tab>
  </div>
</template>
<script>
// https://youzan.github.io/vant/#/zh-CN/tab
// todo 修改选择样式
import XHeader from "$components/XHeader";
import XTab from "$components/Tab";
import Tabs from 'vant/lib/tabs'
import Tab from 'vant/lib/tab'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
import GoodsItem from "$components/GoodsItem"
import InfiniteLoading from 'vue-infinite-loading'
import Loading from 'vant/lib/loading'
import * as services from '$modules/home/services'
export default {
  name: "store",
  components: {
    'tab': XTab,
    XHeader,
    'van-tabs': Tabs,
    'van-tab': Tab,
    GoodsItem,
    InfiniteLoading,
    'van-loading': Loading,
  },
  data() {
    return {
      tabs: ["游戏", "流量", "账号", "服务"],
      tabContents: [
        ["游戏一", "游戏二", "游戏三", "游戏四"],
        ["流量一", "流量二", "流量三", "流量四"],
        ["账号一", "账号二", "账号三", "账号四"],
        ["服务一", "服务二", "服务三", "服务四", "服务5", "服务6", "服务7", "服务8"]
      ],
      active: 0,
      activeContent: [0, 0, 0, 0],
      goods: [],
      page: 1,
      infiniteId: +new Date()
    };
  },
  methods: {
    onTabClick(index, title) {
      this.goods = []
      this.page = 1
      this.infiniteId += 1;
    },
    infiniteHandler($state) {
      let param = {
        params: {
          'fields[store_goods]': "id,title,amount,game_id,sale_nums,images",
          page: this.page,
          per_page: 20
        }
      };
      services.goods(param).then(({ data }) => {
        if (data.goods.data.length > 0) {
          this.page += 1;
          this.goods.push(...data.goods.data);
          $state.loaded();
        }
        if (data.goods.per_page > data.goods.data.length) {
          $state.complete();
        }
      })
    }
  }
};
</script>
<style lang="scss">
.list {
  position: relative;
  margin-top: 10px;
}
</style>
