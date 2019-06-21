<template>
  <div class="page-home">
    <x-header
      title="店铺主页"
      :allow-back="false"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <div class="top-search">
      <div class="top-search-l">
        <img
          :src="store.logo"
          alt
        >
        <div class="top-search-text">
          <h4>{{ store.name }}</h4>
          <span>{{ store.desc }}</span>
        </div>
      </div>
      <a
        href="javascript:;"
        class="searchBtn"
      >
        <img
          src="../../assets/images/sousuo.png"
          alt
        >搜索
      </a>
    </div>
    <div class="store">
      <div class="store_title">
        <img
          src="../../assets/images/title_img.png"
          alt
        >
      </div>
      <div class="list">
        <goods-item
          v-for="item in goods"
          :key="item.id"
          :goods="item"
        ></goods-item>
        <infinite-loading
          @infinite="infiniteHandler"
        >
          <div slot="spinner">
            <van-loading type="spinner" size="18px"> 加载中... </van-loading>
          </div>
          <div slot="no-more">没有更多数据啦...</div>
          <div slot="no-results">没有数据</div>
        </infinite-loading>
      </div>
    </div>
    <nav-block/>
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
      page: 1
    }
  },
  computed: {
    ...mapGetters(['store'])
  },
  created() {

  },
  methods: {
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

      img {
        padding-right: 10px;
        width: 3.125rem;
        height: 3.125rem;
      }
      .top-search-text {
        h4 {
          font-size: .8125rem;
          font-weight: 400;
        }
        span {
          font-size: 0.6rem;
          color: #999999;
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
      border-radius: .9rem;
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
    }
    .list {
      position: relative;
    }
  }
}
</style>
