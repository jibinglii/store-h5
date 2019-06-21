<template>
  <div class="page-home">
    <x-header
      title="店铺主页"
      back-url="home"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <div class="top-search">
      <div class="top-search-l">
        <img src="../../assets/images/top_search.png" alt>
        <div class="top-search-text">
          <p>游戏道具专卖店</p>
          <span>支持各类游戏道具</span>
        </div>
      </div>
      <a href="javascript:;" class="searchBtn">
        <img src="../../assets/images/sousuo.png" alt>搜索
      </a>
    </div>
    <div class="store">
      <div class="store_title">
        <img src="../../assets/images/title_img.png" alt>
      </div>
      <div class="list">
        <list-item></list-item>
        <list-item></list-item>
        <list-item></list-item>
        <list-item></list-item>
        <div class="clearBoth"></div>
      </div>
    </div>
    <div class="nav_ul">
      <nav-list></nav-list>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import listItem from "$components/listItem";
import NavList from "$components/NavList";
import XHeader from "$components/XHeader"
export default {
  name: "home",
  data() {
    return {};
  },

  components: {
    Tab,
    listItem,
    NavList,
    XHeader
  }
};
</script>

<style lang="scss">
@import "../../assets/css/common.css";

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
        width: 50px;
        height: 50px;
      }
      .top-search-text {
        span {
          font-size: 0.8em;
          color: #999999;
        }
      }
    }
    .searchBtn {
      display: flex;
      align-items: center;
      padding: 3px 15px;
      background: #ededed;
      font-size: 0.85em;
      color: #999;
      border-radius: 20px;
    }
  }
  .store {
    .store_title {
      text-align: center;
      padding: 18px 0;
    }
    .list{
      padding: 0 10px;
      .listItem{
         margin-right: 2%;
      }
      .listItem:nth-child(2n){
         margin-right: 0%;
      }

    }
  }
}
</style>
