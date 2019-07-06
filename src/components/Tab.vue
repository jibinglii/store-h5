<template>
  <div class="fixed-bottom">
    <div class="weui-tabbar">
      <router-link :to="{name: 'contact'}" class="weui-tabbar__item" :class="{'has-new-msg': isHasNewMsg}" v-show="canContact">
        <span style="display: inline-block;position: relative;">
            <img src="../assets/images/kefu.png" alt="" class="kefu">
            <span class="weui-badge weui-badge_dot" style="position: absolute;top: 2px;right: -5px;"
                  :class="{'has-new-msg': isHasNewMsg}"></span>
        </span>
      </router-link>
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
  import {mapGetters} from 'vuex'

  export default {
    components: {},
    props: {
      tabIndex: {
        type: String,
        default: "0"
      }
    },
    computed: {
      ...mapGetters(['isHasNewMsg']),
      currentUrl() {
        return this.$route.name;
      },
      canContact () {
        return this.$user().id != this.$currentStore().user_id
      }
    },
    methods: {
      go(item, index) {
        this.$router.push({name: item.url});
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
          span > .weui-badge {
            display: none;
          }
          span > .has-new-msg {
            display: block;
          }
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

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    .fixed-bottom {
      .weui-tabbar {
        padding-bottom: constant(safe-area-inset-bottom);
      }
    }
  }

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .fixed-bottom {
      .weui-tabbar {
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
  }
</style>
