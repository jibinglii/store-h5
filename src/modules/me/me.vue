<template>
  <div class="personCenter">
    <div class="header">
      <div class="user-icon">
        <img :src="currentUser.avatar" alt>
      </div>
      <h3>
        {{ currentUser.nickname }}
        <router-link :to="{ name: 'me.modifyuseinfo'}">
          <img src="../../assets/images/bianji.png">
        </router-link>
      </h3>

      <span>{{ currentUser.sign }}</span>
    </div>
    <cell-group
      :title="item.title"
      v-for="(item, index) in list"
      :key="index"
      v-show="item.show"
    >
      <cell
        :title="inner.title"
        :img="inner.img"
        :url="inner.url"
        v-for="(inner, index) in item.sub"
        :key="index"
        v-show="inner.show"
      />
    </cell-group>
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import XHeader from "$components/XHeader";
import { mapGetters } from "vuex";
import CellGroup from "./components/CellGroup";
import Cell from "./components/Cell";
export default {
  name: "storeManage",
  components: {
    Tab,
    XHeader,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: [
        {
          title: "我是买家",
          show: true,
          sub: [
            {
              title: '我的订单',
              url: 'orders',
              img: '/images/store/order.png',
              show: true
            }
          ]
        },
        {
          title: '我是卖家',
          show: this.$currentStore().user_id == this.$user().id  || (
            _.indexOf(this.$user().roles,'代理') != -1 || _.indexOf(this.$user().roles,'分销员') != -1
          ),
          sub: [
            {
              title: '店铺管理',
              url: 'me.storemanage',
              img: '/images/store/dianpu.png',
              show: this.$currentStore().user_id == this.$user().id && (_.indexOf(this.$currentStore().roles,'渠道店铺') != -1 || _.indexOf(this.$currentStore().roles,'推广店铺') != -1)
            },
            {
              title: '商品管理',
              url: 'seller/goods',
              img: '/images/store/shangpin.png',
              show: this.$currentStore().user_id == this.$user().id && (_.indexOf(this.$currentStore().roles,'渠道店铺') != -1 || _.indexOf(this.$currentStore().roles,'推广店铺') != -1)
            },
            {
              title: '商品管理',
              url: 'seller/goods',
              img: '/images/store/shangpin.png',
              show: this.$currentStore().user_id != this.$user().id && _.indexOf(this.$user().roles,'分销员') != -1
            },
            {
              title: '分销管理',
              url: 'distribution.distribution',
              img: '/images/store/fenxiao.png',
              show: this.$currentStore().user_id == this.$user().id && !(_.indexOf(this.$currentStore().roles,'渠道店铺') != -1),
            },
            {
              title: '结算管理',
              url: 'me.settlemanage',
              img: '/images/store/jiesuan.png',
              show: true
            },
            {
              title: '广告管理',
              url: 'ad.list',
              img: '/images/store/ad.png',
              show: this.$currentStore().user_id == this.$user().id && (_.indexOf(this.$currentStore().roles,'渠道店铺') != -1 || _.indexOf(this.$currentStore().roles,'推广店铺') != -1)
            }
          ]
        },
        {
          title: '常用工具',
          show: true,
          sub: [
            {
              title: '我的收藏',
              url: 'collection.collection',
              img: '/images/store/shoucang.png',
              show: true
            },
            {
              title: '操作流程',
              url: 'me.opp',
              img: '/images/store/liucheng.png',
              show: true
            },
            {
              title: '我的消息',
              url: '',
              img: '/images/store/xiaoxi.png',
              show: false
            },
            {
              title: '意见反馈',
              url: 'me.feedback',
              img: '/images/store/fankui.png',
              show: true
            },
            {
              title: '使用帮助',
              url: 'me.helps',
              img: '/images/store/help.png',
              show: true
            },
            {
              title: '账号设置',
              url: 'me.accountsetting',
              img: '/images/store/seting.png',
              show: true
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentStore"]),
    isAdmin () {
      return this.$currentStore().user_id == this.$user().id
    }
  },
  created () {
    document.title = '我的'
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 9rem;
  background-image: url("/images/shop/me-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .user-icon {
    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
    }
  }
  h3 {
    font-size: 0.768rem;
    line-height: 2;
    color: white;
    font-weight: 400;
    margin-bottom: -8px;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 0 30px;
    position: relative;
    img {
      width: 0.853333rem;
      vertical-align: middle;
      padding-left: 0.213333rem;
    }
  }
  span {
    font-size: 14px;
    line-height: 2;
    color: #999;
    padding: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
