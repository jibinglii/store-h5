<template>
  <div class="goods-tips">
    <div class="header">
      <h4>如果遇到以下问题，请警惕是骗子！</h4>
    </div>
    <div class="content">
      <div class="item" v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
    </div>
    <a class="more" href="/shop/contact.html">
      验证客服真伪
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        '向你所要游戏账号和密码',
        '向你所要绑定手机号、验证码',
        '向买卖家所要【保证金】【手续费】【诚信金】要求支付 宝转账等以各种名目说有'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-tips {
  background-color: white;
  margin-top: .625rem;
  .header {
    height: 2.875rem;
    line-height: 2.875rem;
    position: relative;
    border-bottom: #ededed 1px solid;
    padding-left: .75rem;
  }
  .content{
    padding-left: .75rem;
    .item {
      display: flex;
      min-height: 2.25rem;
      line-height: 1;
      border-bottom: #ededed 1px solid;
      line-height: 1.5;
      font-size: .75rem;
      color: #020202;
      align-items: center;
      padding: .3125rem 0;
    }
  }
  .more {
    display: block;
    width: 100%;
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: .75rem;
    text-align: center;
    color: #020202;
  }
}
</style>
