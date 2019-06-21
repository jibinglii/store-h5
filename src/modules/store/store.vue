
<template>
  <div>
    <x-header
      title="店铺主页"
      back-url="home"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <div class="stores">
      <ul class="tab-bar">
        <li
          v-for="(item,index) in tabs"
          :key="index"
          :class="{active:index == num}"
          @click="tab(index)"
        >{{item}}</li>
      </ul>
      <div class="tabCon">
        <div v-for="(itemCon,index) in tabContents" :key="index" v-show="index == num">{{itemCon}}</div>
      </div>
    </div>

    <tab></tab>
  </div>
</template>
<script>
import XHeader from "$components/XHeader";
import Tab from "$components/Tab";

export default {
  name: "store",
  components: {
    Tab,
    XHeader
  },
  data() {
    return {
      tabs: ["游戏", "流量", "账号", "服务", "服务", "服务","账号", "服务", "服务", "服务"],
      tabContents: ["内容一", "内容二", "内容三", "内容四"],
      num: 1
    };
  },
  methods: {
    tab(index) {
      this.num = index;
    }
  }
};
</script>
<style lang="scss">
.stores{
  .tab-bar {
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    height: 50px;
    line-height: 50px;
    &::-webkit-scrollbar {
      display: none;
    }
    li{
      float: left;
      padding: 0 10px;
    }
  }
}

</style>
