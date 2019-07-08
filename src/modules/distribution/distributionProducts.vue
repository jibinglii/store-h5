<template>
  <div>
    <x-header
      title="分销产品"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <van-tabs v-model="active" @click="loadData">
      <van-tab
        :title="item.title"
        title-active-color="#000000"
        v-for="(item, index) in tabs"
        :key="index"
      ></van-tab>
    </van-tabs>
    <div
      v-for="(item,key) in goods"
      :key="key"
      class="list"
    >
      <distribution-products-item :item="item"></distribution-products-item>
    </div>
  </div>
</template>
<script>
import XHeader from "$components/XHeader"
import Tabs from "vant/lib/tabs"
import Tab from "vant/lib/tab"
import "vant/lib/tabs/style"
import "vant/lib/tab/style"
import distributionProductsItem from "./components/distributionProductsItem"
export default {
  components: {
    XHeader,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "distribution-products-item": distributionProductsItem,
  },
  data() {
    return {
      tabs: [{"id": "0", "title": "全部"},{ "id": "0,1", "title": "游戏" }, { "id": "2", "title": "流量" }, { "id": "3", "title": "账号" }, { "id": "4", "title": "服务" }],
      active: 0,
      goods: []
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods() {
      let type = this.tabs[this.active].id
      let param = {}
      if (type != 0){
        param['type'] = type
      }
      this.goods = []
      this.$toast.loading()
      this.$http.get('api/v2/store/sellers/my-drp-goods', {params: param}).then(({data})=>{
        this.$toast.clear()
        this.goods = data.goods
      })
    },
    loadData () {
      this.getGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.van-tabs__line {
  background-color: #020202;
  height: 2px;
}
</style>
