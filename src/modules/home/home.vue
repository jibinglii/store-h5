<template>
  <div class="page-home">
    <x-header
      :title="currentStore.name"
      :allow-back="false"
    ></x-header>
    <div class="top-search" v-if="!isMainStore">
      <div class="top-search-l">
        <img
          :src="currentStore.logo"
          alt
        >
        <div class="top-search-text">
          <h4>{{ currentStore.name }}</h4>
          <span>{{ currentStore.desc }}</span>
        </div>
      </div>
    </div>
    <div class="ads">
      <a :href="item.url != '' ? item.url : 'javascript:void()'" v-for="item in ads" :key="item.id">
        <img v-lazy="item.img">
      </a>
    </div>
    <div class="store">
      <div class="store_title">
        <div class="iconfont icon-new-icon"></div>
        <div class="title">最新商品</div>
        <div class="iconfont icon-new-icon right"></div>
      </div>
      <div class="list">
        <goods-item
          v-for="item in goods"
          :key="item.id"
          :goods="item"
        ></goods-item>
        <infinite-loading @infinite="infiniteHandler">
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
    </div>
    <nav-block />
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab"
import GoodsItem from "$components/GoodsItem"
import Nav from "$components/Nav"
import XHeader from "$components/XHeader"
import { mapGetters } from 'vuex'
import * as services from './services'
import InfiniteLoading from 'vue-infinite-loading'
import Loading from 'vant/lib/loading'
import 'vant/lib/loading/style'
export default {
  name: "home",
  components: {
    Tab,
    GoodsItem,
    'nav-block': Nav,
    XHeader,
    InfiniteLoading,
    'van-loading': Loading
  },
  data() {
    return {
      goods: [],
      page: 1,
      loading: true,
      ads: []
    }
  },
  computed: {
    ...mapGetters(['currentStore']),
    isMainStore() {
      return _.isEmpty(this.currentStore)
    }
  },
  created() {
    this.getAds()
    setTimeout(() => {
      this.loading = false
    }, 300)
  },
  methods: {
    async getAds() {
      let param = {
        'fields[store_ads]': "id,img,url",
        per_page: 10
      }
      await services.ads(param).then(({ data }) => {
        this.ads = data.ads.data
      })
    },
    async infiniteHandler($state) {
      let param = {
        params: {
          'fields[store_goods]': "id,title,amount,game_id,sale_nums,images",
          page: this.page,
          per_page: 20
        }
      };
      await services.goods(param).then(({ data }) => {
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
<style lang="scss" scoped>
.ads{
  margin: 10px 0;
  font-size: 0;
  img{
    width: 100%;
    height: auto;
  }
}
.van-skeleton {
  padding: 0;
  .van-skeleton__row {
    background: white;
    height: 10rem;
    width: 9.0625rem;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    margin-bottom: 0.625rem;
    margin-top: 0;
    &:nth-child(odd) {
      left: 0;
    }
    &:nth-child(even) {
      left: 0.625rem;
    }
  }
}
.page-home {
  .top-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    padding: 20px 10px;
    .top-search-l {
      display: flex;
      align-items: center;
      width: 100%;
      img {
        width: 3.125rem;
        height: 3.125rem;
      }
      .top-search-text {
        padding-left: 10px;
        h4 {
          font-size: 0.8125rem;
          font-weight: 400;
        }
        span {
          font-size: 0.6rem;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .searchBtn {
      display: flex;
      align-items: center;
      padding: 0.15rem 0.75rem;
      background: #ededed;
      font-size: 0.7rem;
      color: #999;
      border-radius: 0.9rem;
      height: 1.5rem;
    }
  }
  .store {
    .store_title {
      display: flex;
      height: 60px;
      line-height: 60px;
      justify-content: center;
      align-items: center;
      .title{
        font-size: 18px;
      }
      .iconfont{
        font-size: 18px;
        margin: 0 4px;
        &.right{
          transform: rotate(180deg);
        }
      }
    }
    .list {
      position: relative;
    }
  }
}
</style>
