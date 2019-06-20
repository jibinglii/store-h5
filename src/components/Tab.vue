<template>
  <div class="weui-tabbar" :style="{paddingBottom: paddingBottom + 'px'}">
    <div class="weui-tabbar__item">
      <img src="../assets/images/kefu.png" alt class="kefu">
    </div>

    <a
      class="weui-tabbar__item"
      :class="{active: item.url == currentUrl}"
      v-for="(item, index) in tabs"
      :key="index"
      @click="go(item, index)"
    >
      <p class="weui-tabbar__label">{{ item.text }}</p>
    </a>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    tabIndex: {
      type: String,
      default: "0"
    }
  },
  computed: {
    paddingBottom() {
      if (this.isWechat()) {
        if (this.isIPhoneX() && this.isFirst) {
          return 30;
        }
        return 0;
      }
    },
    currentUrl() {
      return this.$route.name;
    }
  },
  methods: {
    go(item, index) {
      this.$router.push({ name: item.url });
    }
  },
  data() {
    return {
      tabs: [
        {
          text: "首页",
          url: "home"
        },
        {
          text: "全部商品",
          url: "store.store"
        },
        {
          text: "我的",
          url: ""
        }
      ],
      isFirst: true
    };
  },
  mounted() {
    // if (this.isWechat()) {
    // }
  }
};
</script>

<style lang="scss">
@import "../assets/sass/_variables.scss";
body {
  padding-bottom: 3.75rem;
}
.weui-tabbar {
  position: fixed;
  bottom: 0;
  height: 3.125rem;
  width: 100%;
  background-color: white;
  .kefu{
   width: 47%;
  }
  .weui-tabbar__item {
    border-right: solid 1px #f2f2f2;
  }
  .weui-tabbar__item:last-child {
    border: none;
  }
  .weui-tabbar__item.active {
    p {
      color: #000;
      font-weight: 400;
    }
  }
  .weui-tabbar__label {
    text-align: center;
    color: #999;
    font-size: 14px;
    line-height: 2.8;
  }
}
.weui-tabbar:before {
  border: none;
}
.tools-bar {
  position: fixed;
  left: 1rem;
  bottom: 6rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  height: 3rem;
  line-height: 3rem;
  .btn {
    padding: 0 0.5rem;
    display: inline-block;
    border-left: white 1px dashed;
  }
}
</style>
