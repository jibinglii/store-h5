<template>
  <div class="goods-keep">
    <!-- 游戏交易保障 -->
    <div class="header">
      <h4>游戏交易保障</h4>
    </div>
    <div class="content">
      <p>
        搜瓜为你购买游戏商品提供全程客服协助，以保障您的交易 安全，交易中有任何问题请联系客服。
      </p>
      <div class="step">
        <img
          src="/images/shop/keep-1.png"
          alt=""
        >
        <img
          src="/images/shop/keep-divider.png"
          alt=""
          class="divider"
        >
        <img
          src="/images/shop/keep-2.png"
          alt=""
        >
        <img
          src="/images/shop/keep-divider.png"
          alt=""
          class="divider"
        >
        <img
          src="/images/shop/keep-3.png"
          alt=""
        >
      </div>
    </div>
    <div class="divider"></div>
    <router-link
      class="more"
      href="/shop/contact.html"
      v-show="false"
    >
      如需了解更多，点击这里联系客服
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.goods-keep {
  background-color: white;
  margin-top: 0.625rem;
  .header {
    height: 46px;
    line-height: 46px;
    position: relative;
    border-bottom: #ededed 1px solid;
    padding-left: 0.75rem;
    h4{
      font-size: 16px;
    }
  }
  .content {
    padding: 1rem 0.75rem;
    p {
      font-size: 0.7rem;
    }
    .step {
      display: flex;
      align-items: center;
      justify-items: center;
      padding: 8px 32px;
      img {
        width: 60px;
        height: auto;
        &.divider {
          width: 30px;
        }
      }
    }
  }
  .divider {
    height: 1px;
    width: 95%;
    background-color: #ededed;
    margin: 0 auto;
  }
  .more {
    display: block;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    text-align: center;
    color: #020202;
  }
}
</style>
