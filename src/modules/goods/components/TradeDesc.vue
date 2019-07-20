<template>
  <div class="trade-desc">
    <div class="item" v-for="(item, index) in items" :key="index">
      <label>{{ item.no }}</label>
      <div>
        <p>{{ item.title }}</p>
        <span>
          {{ item.desc }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          no: '①',
          title: '下单支付',
          desc: '选择商品后付款'
        },
        {
          no: '②',
          title: '验证账号信息',
          desc: '查看账号最新截图，联系客服确认是否购买'
        },
        {
          no: '③',
          title: '更换账号绑定信息',
          desc: '确认购买后，客服将绑定信息更换成买家信息'
        },
        {
          no: '④',
          title: '提取账号',
          desc: '绑定信息更换成功后，买家即可提取账号'
        },
        {
          no: '⑤',
          title: '交易成功',
          desc: '平台将货款转账给卖家，交易成功'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.trade-desc {
  .item {
    height: 3.125rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: .625rem;
    label {
      width: 4rem;
      display: inline-block;
      text-align: center;
      position: relative;
      &::after{
        content: '';
        height: 2.75rem;
        width: 1px;
        background-color: #7d7d7d;
        position: absolute;
        left: 49%;
        top: 80%;
      }
    }
    &:last-child label::after{
      display: none;
    }
    div {
      display: inline-block;
      vertical-align: middle;
      p {
        font-size: .75rem;
        color: #020202;
      }
      span {
        font-size: .6rem;
        color: #999;
      }
    }
  }
}
</style>
