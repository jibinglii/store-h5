<template>
  <router-link class="goods-item-horizontal" :to="{name: 'goods.view', params:{'goods': goods.uuid}}" replace>
    <div class="img">
      <img
        v-if="!lazy"
        :src="logo"
        alt=""
      >
      <img
        v-else
        v-lazy="logo"
        alt=""
      >
    </div>
    <div class="goods-item-info">
      <h3 class="title">{{ goods.title }}</h3>
      <span class="item-game">{{ goods.game_name }}</span>
      <p class="server">{{ goods.server_name }}&nbsp;</p>
      <h1 class="price">{{ goods.amount | formatMoney }}</h1>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    logo() {
      if (undefined != this.goods.logo) {
        if (this.goods.logo.indexOf('aliyuncs') > 0) {
          return this.goods.logo + '?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_180/quality,q_90'
        }
        return this.goods.logo
      }
      return '';
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/sass/variables";
.goods-item-horizontal {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  color: $dark;
  padding: 0.6rem 0;
  border-bottom: solid 1px #ededed;
  overflow: hidden;
  &:first-child {
    padding-top: 0.6rem;
    margin-top: 0;
  }
  &:last-child {
    padding-bottom: 0.6rem;
    &::after {
      display: none;
    }
  }
  .img {
    flex: 2;
    padding: 0 0.6rem;
    display: flex;
    align-items: center;
    img {
      width: 4.5rem;
      height: 4.5rem;
    }
  }
  .goods-item-info {
    flex: 8;
    padding-right: 0.6rem;
    overflow: hidden;
    .title {
      display: block;
      font-size: 0.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .server {
      color: #666;
      font-size: 0.6rem;
    }
    .item-game {
      background-color: #eaeaea;
      color: #666;
      padding: 3px 5px;
      font-size: 0.6rem;
    }
    .price {
      font-size: 0.8rem;
      color: $dark;
      &::before {
        content: "¥ ";
      }
    }
  }
}
</style>
