<template>
  <nav-bar
    :title="title"
    :left-text="leftText"
    :left-arrow="leftArrow"
    @click-left="back"
    @click-right="onClickRight"
    :style="{backgroundColor: backColor, color: color, borderBottom: '1px solid ' + underlineColor}"
  >
    <div slot="right">
      <slot name="right">{{rightText}}</slot>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "vant/lib/nav-bar";
import "vant/lib/nav-bar/style";
export default {
  name: "x-header",
  components: {
    NavBar
  },
  props: {
    title: {
      type: String
    },
    url: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    backColor: {
      type: String,
      default: "#ffffff"
    },
    color: {
      type: String,
      default: "#020202"
    },
    underlineColor: {
      type: String,
      default: "#ededed"
    },
    allowBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    leftArrow () {
      return this.allowBack
    }
  },
  methods: {
    back() {
      if (this.url == "") {
        this.$router.back();
      } else {
        this.$router.push({ name: this.url });
      }
    },
    onClickRight() {
      this.$emit("click-right");
    }
  },
  mounted() {
    window.document.title = this.title;
  }
};
</script>

<style lang="scss">
$height: 2.5rem;
header {
  height: $height;
  box-sizing: border-box;
  text-align: center;
  z-index: 99;
  width: 100%;
  position: relative;
  div.back-icon {
    width: $height;
    height: $height;
    display: inline-block;
    line-height: $height;
    text-align: center;
    position: absolute;
    box-sizing: border-box;
    left: 0;
    i {
      font-size: 0.8rem;
    }
  }
  h1 {
    display: inline-block;
    font-size: 0.768rem;
    height: 100%;
    line-height: $height;
    margin: 0;
  }
  .right-box {
    position: absolute;
    width: $height;
    right: 0;
    top: 0;
    height: 100%;
    text-align: center;
    line-height: $height;
    font-size: 0.682667rem;
    .iconfont {
      font-size: 0.8rem;
    }
  }
}
.van-nav-bar .van-icon {
  color: #020202;
}
</style>
