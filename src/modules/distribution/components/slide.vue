<template>
  <div>

    <van-swipe-cell :right-width="slideWidth" :left-width="0" :on-close="onclick">
      <slot name="center"></slot>
      <van-button square slot="right" type="danger" text="管理"/>
    </van-swipe-cell>
  </div>
</template>

<script>
import { SwipeCell, Button, Dialog } from "vant";
export default {
  data() {
    return {
      slideWidth: 0
    };
  },
  created() {
    let self = this;
    let docEl = document.documentElement,
      resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize",
      recalc = function() {
        let fs = getComputedStyle(window.document.documentElement)["font-size"];
        fs = fs.substr(0, fs.indexOf("px"));
        self.slideWidth = (fs * 124) / 46.875;
      };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener("DOMContentLoaded", recalc, false);
    recalc();
  },
  methods: {
    onclick() {
      this.$router.push('./distributormanage')
    }
  },
  components: {
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  }
};
</script>

<style lang="scss" scoped>
@import "~vant/lib/index.css";
/deep/.van-swipe-cell__right {
  .van-button {
    height: 100%;
    line-height: 100%;
    width: 2.645333rem;
  }
  .van-button--square {
    border-radius: 0;
  }
  .van-button--normal {
    padding: 0 0.632rem;
    font-size: 0.512rem;
    line-height: 0.512rem;
  }
  .van-button--danger {
    color: #fff;
    background-color: #AAAAAA;
    border: 1px solid #AAAAAA;
  }
}
</style>
