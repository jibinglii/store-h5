<template>
  <div>
    <van-swipe-cell
      :right-width="slideWidth"
      :left-width="0"
      :disabled="disabledSlide"
      :on-close="onClose"
    >
      <slot name="center"></slot>
      <van-button square slot="right" type="danger" text="取消收藏"/>
    </van-swipe-cell>
  </div>
</template>

<script>
import SwipeCell from "vant/lib/button";
import Button from "vant/lib/swipe-cell";
import "vant/lib/button/style";
import "vant/lib/swipe-cell/style";
export default {
  props: {
    id: {
      type: String,
      default: 0
    },
    disabledSlide: {
      type: Boolean,
      default: false
    }
  },
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
        self.slideWidth = (fs * 124) / 40;
      };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener("DOMContentLoaded", recalc, false);
    recalc();
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$emit("onDelete", this.id);
          instance.close();
          break;
      }
    }
  },
  components: {
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-swipe-cell__right {
  .van-button {
    height: 100%;
    line-height: 100%;
    width: 3.1rem;
  }
  .van-button--square {
    border-radius: 0;
  }
  .van-button--normal {
    padding: 0 0.75rem;
    font-size: 0.6rem;
    line-height: 0.6rem;
  }
  .van-button--danger {
    color: #fff;
    background-color: #c22727;
    border: 1px solid #c22727;
  }
}
</style>
