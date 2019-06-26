
<template>
  <div>
    <x-header
      title="店铺主页"
      back-url="home"
      :allow-back=false
    ></x-header>
    <van-tabs v-model="active" @click="onTabClickTop">
      <van-tab
        :title="item.title"
        title-active-color="#000000"
        v-for="(item, index) in tabs"
        :key="index"
      >
        <van-tabs
          v-model="activeContent[index]"
          @click="onTabClick"
          class="tabsTwo"
        >
          <van-tab
            :title="itemContent.title"
            v-for="(itemContent) in tabContents[index]"
            :key="itemContent.id"
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
      tabs: [{"id":"1", "title": "游戏"}, {"id":"2", "title": "流量"}, {"id":"3", "title": "账号"}, {"id":"4", "title": "服务"}],
      //分类：流量（社群流量、媒体流量、站点流量）、账号（自媒体账号、网店账号、社交账号、视频账号）、游戏（游戏帐号、游戏装备、游戏点卡、游戏币）、服务（代练、租号、陪玩）、其他
      tabContents: [
        [{"id":"101","title": "游戏帐号"}, {"id":"102","title": "游戏装备"}, {"id":"104","title": "游戏点卡"}, {"id":"100","title": "游戏币"}],
        [{"id":"301","title": "社群流量"}, {"id":"300","title": "媒体流量"}, {"id":"302","title": "站点流量"}],
        [{"id":"401","title": "自媒体账号"}, {"id":"400","title": "网店账号"}, {"id":"402","title": "社交账号"}, {"id":"403","title": "视频账号"}],
        [{"id":"501","title": "代练"}, {"id":"500","title": "租号"}, {"id":"502","title": "陪玩"}]
      ],
      active: 0,
      activeContent: [0, 0, 0, 0],
      goods: [],
      page: 1,
      infiniteId: +new Date(),
      type2: 101
    };
  },
  methods: {
    onTabClickTop (index, title) {
      this.type2 = this.tabContents[this.active][0].id
      this.goods = []
      this.page = 1
      this.infiniteId += 1;
    },
    onTabClick(index, title) {
      this.goods = []
      this.page = 1
      this.infiniteId += 1;
      this.type2 = this.tabContents[this.active][index].id
    },
    infiniteHandler($state) {
      let param = {
        params: {
          'fields[store_goods]': "id,title,amount,game_id,sale_nums,images",
          page: this.page,
          per_page: 20
        }
      };
      if (this.type2 != 0) {
        param['params']['filter[type2]'] = this.type2
      }
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
.van-tabs__line{
  background-color: #000000;
  height: 2px;
}
.tabsTwo{
 .van-tabs__line{
   height: 0px;
 }
}
.list {
  position: relative;
  margin-top: 10px;
  overflow: hidden;
}
</style>
