<template>
  <div class="pagebox">
    <x-header title="商品管理" back-url="me.me" />
    <van-tabs
      @click="filterData"
      v-model="tabIndex"
      v-show="!isSeller"
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
          @update="filterData(tabIndex)"
          @assign="assign"
          :is-seller="isSeller"
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
    <van-action-sheet
      v-model="showAssign"
      title="分配推广员"
    >
      <van-cell-group>
        <van-field
          v-model="assignUserId"
          label="推广员ID"
          type="tel"
          input-align="right"
          placeholder="请输入推广员ID"
        />
        <van-field
          v-model="assignRate"
          type="number"
          label="推广费用比例"
          autosize
          input-align="right"
          placeholder="请编辑推广费用比例"
        />
      </van-cell-group>
      <div class="btn">
        <van-button
          type="primary"
          hairline
          size="large"
          @click="assignSubmit"
        >保存</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import XHeader from '$components/XHeader'
import GoodsItem from './components/GoodsItem'
import Tabs from 'vant/lib/tabs'
import Tab from 'vant/lib/tab'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
import InfiniteLoading from 'vue-infinite-loading';
import ActionSheet from 'vant/lib/action-sheet'
import 'vant/lib/action-sheet/style'
import Button from 'vant/lib/button'
import CellGroup from 'vant/lib/cell-group'
import Field from 'vant/lib/field'
import 'vant/lib/cell/style'
import 'vant/lib/field/style'
import 'vant/lib/button/style'

export default {
  components: {
    XHeader, GoodsItem, InfiniteLoading,
    'van-tabs': Tabs,
    'van-tab': Tab,
    [ActionSheet.name]: ActionSheet,
    'van-cell-group': CellGroup,
    'van-field': Field,
    'van-button': Button
  },
  data() {
    return {
      pageTitle: '商品管理',
      tabIndex: 0,
      statusTypes: [
        { id: "-1", title: '全部' },
        { id: "1", title: "审核中" },
        { id: "3", title: "审核退回" },
        { id: "4", title: "在售中" },
        { id: "5", title: "已下架" },
        { id: "7", title: "已出售" }
      ],
      items: [],
      page: 1,
      status: -1,
      infiniteId: new Date(),
      showAssign: false,
      assignUserId: '',
      assignRate: '',
      currentGoods: {}
    }
  },
  computed: {
    isSeller(){
      return _.indexOf(this.$user().roles,'分销员') != -1
    }
  },
  mounted() {
    this.tabIndex = location.hash.substr(1) || 0
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
      this.$http.get('/api/v2/store/user/goods', param).then(({ data }) => {
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
    assign(goods) {
      this.showAssign = true
      this.currentGoods = goods
    },
    assignSubmit(){
      let params = {goods_id: this.currentGoods.uuid, spread_id: this.assignUserId, profit_rate: this.assignRate}
      this.$toast.loading({mask: true})
      this.$http.post('api/v2/store/sellers/my-drp-goods/add', params).then(({data}) => {
        this.showAssign = false
        this.currentGoods = {}
        this.$toast.clear()
        this.$toast.success('分配成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.van-tabs__line {
  background-color: #020202;
}
/deep/.btn{
  text-align: center;
}
/deep/.van-button {
  width: 90%;
  margin: 2.133333rem auto;
  background: #000;
  color: #ffffff;
}
</style>
