<template>
  <div class="pagebox">
    <x-header
      title="商品管理"
      url="me.storemanage"
    >
    </x-header>
    <van-tabs
      class="tabsTwo"
      @click="filterData"
      v-model="tabIndex"
    >
      <van-tab
        :title="item.title"
        v-for="(item) in statusTypes"
        :key="item.id"
      />
    </van-tabs>
    <div class="tab-content">
      <div class="tab-content-item">
        <goods-item
          v-for="(item, index) in items"
          :key="index"
          :goods="item"
        ></goods-item>
        <infinite-loading
          :identifier="infiniteId"
          @infinite="infiniteHandler"
          spinner="spiral"
        >
          <div slot="no-more">没有更多数据啦...</div>
          <div slot="no-results">没有数据</div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>
<script>
import XHeader from '$components/XHeader'
import GoodsItem from '$components/GoodsItem'
import Tabs from 'vant/lib/tabs'
import Tab from 'vant/lib/tab'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    XHeader, GoodsItem, InfiniteLoading,
    'van-tabs': Tabs,
    'van-tab': Tab,
  },
  data() {
    return {
      pageTitle: '商品管理',
      tabIndex: 0,
      statusTypes: [
        { id: "-1", title: '全部' },
        { id: "0", title: "审核中" },
        { id: "3", title: "审核退回" },
        { id: "4", title: "在售中" },
        { id: "5", title: "已下架" },
        { id: "7", title: "已出售" }
      ],
      items: [],
      page: 1,
      status: -1,
      infiniteId: new Date(),
    }
  },
  mounted () {
    this.tabIndex = location.hash.substr(1)
    this.status = this.statusTypes[this.tabIndex].id
  },
  methods: {
    filterData(index, title) {
      this.page = 1;
      this.items = [];
      this.infiniteId += 1;
      this.status = this.statusTypes[index].id;
      location.hash = '#' + index
    },
    infiniteHandler($state) {
      let param = {        params: {
          page: this.page
        }      };

      if (this.status != -1) {
        param['params']['status'] = this.status
      }
      this.$http.get('/api/v1/user/goods', param).then(({ data }) => {
        if (data.goods.data.length > 0) {
          this.page += 1;
          this.items.push(...data.goods.data);
          $state.loaded();
        }
        if (data.goods.per_page > data.goods.data.length) {
          $state.complete();
        }
      })
    },
  }
}
</script>
