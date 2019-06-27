
<template>
  <div>
    <x-header
      title="分销人员管理"
      right-text="添加"
      @click-right="$router.push({name: 'distribution.distributormanage'})"
    ></x-header>
    <div class="list">
      <distributor-item
        :item="item"
        v-for="(item,key) in users"
        :key="key"
        @click.native="$router.push({name: 'distribution.distributormanage', params: {'id': item.id}, query: {'profit_rate': item.sellers.profit_rate}})"
      ></distributor-item>
    </div>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="spiral"
    >
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>
  </div>
</template>
<script>
// https://youzan.github.io/vant/#/zh-CN/tab
// todo 修改选择样式
import XHeader from "$components/XHeader"
import distributorItem from "./components/distributorItem"
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "store",
  components: {
    XHeader,
    "distributor-item": distributorItem,
    InfiniteLoading
  },
  data() {
    return {
      slideDirection: "",
      users: [],
      page: 1
    }
  },
  methods: {
    infiniteHandler($state) {
      this.$http.get('api/v2/store/sellers').then(({ data }) => {
        if (data.sellers.data.length > 0) {
          this.page += 1;
          this.users.push(...data.sellers.data);
          $state.loaded();
        }
        if (data.sellers.per_page > data.sellers.data.length) {
          $state.complete();
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
