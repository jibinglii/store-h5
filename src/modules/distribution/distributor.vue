
<template>
  <div>
    <x-header
      title="分销人员管理"
      back-url="home"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
      right-text="添加"
      @click-right="add"
    ></x-header>
    <div v-for="(item,key) in goods" :key="key" class="list">
      <v-slide>
        <section class="custom-cell" :class="slideDirection" slot="center">
          <distributor-item :item="item"></distributor-item>
        </section>
      </v-slide>
    </div>
  </div>
</template>
<script>
// https://youzan.github.io/vant/#/zh-CN/tab
// todo 修改选择样式
import XHeader from "$components/XHeader";
import distributorItem from "./components/distributorItem";
import Slide from "./components/slide";
export default {
  name: "store",
  components: {
    XHeader,
    "distributor-item": distributorItem,
    vSlide: Slide
  },
  data() {
    return {
      slideDirection: "",
      goods: [
        {
          id: "ID：1524123",
          title: "火影忍者超级无敌号",
          desc: "正常",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "ID：1524123",
          title: "火影忍者超级无敌号",
          desc: "停用",
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        }
      ],
      page: 1
    };
  },
  methods: {
    add () {

    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.van-tabs__line {
  background-color: #000000;
  height: 2px;
}
.tabsTwo {
  .van-tabs__line {
    height: 0px;
  }
}
.list {
  overflow: hidden;
}
</style>
