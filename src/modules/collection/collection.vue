<template>
  <div class="collection">
    <van-nav-bar
      title="我的收藏"
      :right-text="rightText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <section class="container" v-for="(item,key) in goods" :key="key">
        <v-slide>
          <section class="custom-cell" :class="slideDirection" slot="center">
            <div class="custom-checkbox">
              <van-checkbox :name="key"/>
            </div>
            <goods-card :item="item"></goods-card>
          </section>
        </v-slide>
      </section>
    </van-checkbox-group>
  </div>
</template>

<script>
import { NavBar, Checkbox, CheckboxGroup } from "vant";
import Slide from "./slide";
import GoodsCard from "./goodscard.vue";
export default {
  data() {
    return {
      checkedGoods: [],
      state: false,
      slideDirection: "",
      rightText: "管理",
      goods: [
        {
          id: "1",
          title: "火影忍者超级无敌号",
          desc: "网店账号",
          price: 200,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
        },
        {
          id: "2",
          title: "火影忍者超级无敌号",
          desc: "网店账号",
          price: 690,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "3",
          title: "火影忍者超级无敌号",
          desc: "网店账号/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      console.log("TCL: onClickLeft -> 返回");
    },
    onClickRight() {
      this.state = !this.state;
      this.rightText = this.state ? "完成" : "管理";
      this.slideDirection = this.state ? "slide-right" : "slide-left";
      console.log("TCL: onClickRight -> 按钮");
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    vSlide: Slide,
    GoodsCard
  }
};
</script>

<style lang="scss" scoped>
@import "~vant/lib/index.css";
.collection {
  width: 100%;
  background: #f2f2f2;
  .container:not(:first-child) {
    margin-top: 0.426667rem;
  }
  .custom-cell {
    position: relative;
    .custom-checkbox {
      position: absolute;
      top: 0;
      left: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      height: 100%;
      line-height: 100%;
      width: 2.645333rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .slide-right {
    transform: translate3d(62px, 0px, 0px);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }
  .slide-left {
    transform: translate3d(0px, 0px, 0px);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }
}
/deep/.van-nav-bar {
  height: 2.090667rem /* 98/46.875 */;
  line-height: 2.090667rem /* 98/46.875 */;
  border-bottom: 1px solid #ededed;
  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #000;
    font-weight: bold;
    font-size: 0.768rem; /* 36/46.875 */;
    font-family: PingFang-SC-Bold;
  }
  .van-icon {
    color: #000;
  }
  .van-nav-bar__arrow {
    min-width: 1em;
    font-size: 0.554667rem /* 26/46.875 */;
  }
  .van-nav-bar__text {
    font-size: 0.554667rem /* 26/46.875 */;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #000;
  }
}
</style>
