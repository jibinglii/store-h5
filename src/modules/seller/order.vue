<template>
  <div class="pagebox">
    <x-header
      :title="pageTitle"
      url="me.storemanage"
    >
      <div slot="right-btn">
      </div>
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
        <order-item v-for="(item, index) in items" :key="index" :order="item"></order-item>
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
import Tabs from 'vant/lib/tabs'
import Tab from 'vant/lib/tab'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
import OrderItem from './components/OrderItem'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    XHeader, InfiniteLoading,
    'van-tabs': Tabs,
    'van-tab': Tab,
    [OrderItem.name]: OrderItem
  },
  data() {
    return {
      pageTitle: '商家订单管理',
      tabIndex: 0,
      statusTypes: [
        { id: "-1", title: '全部' },
        { id: "1", title: "待发货" },
        { id: "2", title: "待收货" },
        { id: "3", title: "已完成" },
        { id: "4", title: "退货中" }
      ],
      items: [],
      page: 1,
      status: -1,
      infiniteId: +new Date(),
    }
  },
  mounted() {
    this.tabIndex = location.hash.substr(1)
    if (this.tabIndex != ''){
      this.status = this.statusTypes[this.tabIndex].id
    }
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
      this.$http.get('/api/v1/user/seller-orders', param).then(({ data }) => {
        if (data.orders.data.length > 0) {
          this.page += 1;
          this.items.push(...data.orders.data);
          $state.loaded();
        }
        if (data.orders.per_page > data.orders.data.length) {
          $state.complete();
        }
      })
    },
  }
}
</script>


<style lang="scss" scoped>
/deep/.van-tabs__line{
  background-color: #020202;
  height: 2px;
}
</style>
