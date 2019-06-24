<template>
  <div class="pagebox">
    <x-header
      title="订单管理"
      back-url="/shop/me.html"
    >
      <div slot="right-btn">
      </div>
    </x-header>
    <van-tabs
      class="tabsTwo"
      @click="filterData"
    >
      <van-tab
        :title="item.title"
        v-for="(item) in statusTypes"
        :key="item.id"
      />
    </van-tabs>

    <div class="tab-content">
      <div class="tab-content-item">
        <order-item
          v-for="(item, index) in items"
          :key="index"
          :order="item"
        ></order-item>
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
import OrderItem from '$components/OrderItem'
// import XTab from '$components/XTab'
import InfiniteLoading from 'vue-infinite-loading'
import Tabs from 'vant/lib/tabs'
import Tab from 'vant/lib/tab'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'

export default {
  components: {
    XHeader, OrderItem, InfiniteLoading,
    'van-tabs': Tabs,
    'van-tab': Tab,
  },
  data() {
    return {
      pageTitle: '订单管理',
      statusTypes: [
        { id: "-1", title: '全部' },
        { id: "0", title: "待付款" },
        { id: "1", title: "待发货" },
        { id: "3", title: "已完成" },
        { id: "4", title: "退货中" }
      ],
      items: [],
      page: 1,
      status: -1,
      infiniteId: +new Date(),
    }
  },
  methods: {
    filterData(index, title) {
      this.page = 1;
      this.items = [];
      this.infiniteId += 1;
      this.status = this.statusTypes[index].id;
    },
    infiniteHandler($state) {
      let param = {        params: {
          page: this.page
        }      };

      if (this.status != -1) {
        param['params']['status'] = this.status
      }
      this.$http.get('/api/v1/user/orders', param).then(({ data }) => {
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


<style lang="scss">
.titlebar {
  line-height: 50px;
  text-align: center;
  background-color: #ffffff;
  border-bottom: solid 1px #eaeaea;
  position: relative;
  a {
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
.tab-bar {
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  line-height: 50px;
  background-color: #ffffff;
  li {
    display: inline;
    font-size: 0.9rem;
    padding: 0 1.2rem;
    &.active span {
      font-weight: 500;
      border-bottom: 2px #000 solid;
      padding-bottom: 0.375rem;
      display: inline;
    }
  }
}
</style>
