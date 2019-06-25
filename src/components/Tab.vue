<template>
  <div class="fixed-bottom" :style="{paddingBottom:paddingBottom+'px'}">
    <div class="weui-tabbar" :style="{paddingBottom:paddingBottom+'px'}">
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
      }
      return 0;
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
          url: "me.me"
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

<style lang="scss" scoped>
@import "../assets/sass/_variables.scss";

.fixed-bottom {
  margin-bottom: 3.75rem;
  .weui-tabbar {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: white;
    .kefu {
      width: 45px;
    }
    .weui-tabbar__item {
      border-right: solid 1px #f2f2f2;
      padding: 0;
      &:nth-child(1) {
        padding: 5px 0 0;
        flex: 0.8;
      }
      &:nth-child(3) {
        flex: 1.5;
      }
    }
    .weui-tabbar__item:last-child {
      border: none;
    }
    .weui-tabbar__item.active {
      p {
        color: #000;
        font-weight: 500;
      }
    }
    .weui-tabbar__label {
      text-align: center;
      color: #999;
      font-size: 16px;
      line-height: 50px;
    }
  }
}
// @supports (bottom: constant(safe-area-inset-bottom)) {
//   .weui-tabbar {
//     position: fixed;
//     bottom: constant(safe-area-inset-bottom);
//   }
// }
// @supports (padding-bottom: constant(safe-area-inset-bottom)) {
//   .fixed-bottom {
//     padding-bottom: constant(safe-area-inset-bottom);
//   }
// }
</style>
