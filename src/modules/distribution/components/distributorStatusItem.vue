<template>
  <van-card slot="center" :name="item.id" :thumb="item.thumb" @click="click">
    <div slot="title">
      <h3 class="title">{{item.title}}</h3>
      <p>成交价格: {{item.price}}</p>
      <p>成交日期: {{item.transacDate}}</p>
    </div>
    <div slot="footer">
      <span>
        <i>结算日期：</i>
        {{item.settlementDate}}
      </span>
      <b>{{item.status}}</b>
    </div>
  </van-card>
</template>

<script>
import Card from "vant/lib/card";
import "vant/lib/card/style";
export default {
  name: "distributorItem",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      result: ["1", "2"]
    };
  },
  components: {
    [Card.name]: Card
  },
  methods: {
    click() {
      this.$router.push("./distributionStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.van-card {
  background-color: #ffffff;
  margin-bottom: 0.426667rem;
  margin-top: 0;
  padding: 0;
  .van-card__header {
    align-items: center;
    padding: .341333rem .64rem;
    .van-card__thumb {
      width: 3.2rem;
      height: 3.2rem;
      img {
        width: 100%;
      }
    }
  }

  .van-card__content {
    line-height: 2;
    .title {
      font-size: 0.597333rem;
      padding: 0.426667rem 0 0 0;
      p {
        padding: 0 0.426667rem;
        background-color: #000;
        font-size: 0.512rem;
        color: #fff;
        border-radius: 0.170667rem;
      }
    }
  }
  .van-card__footer {
    position: relative;
     padding: .426667rem .64rem;
    text-align: left;
    div {
      display: flex;
      justify-content: space-between;
      i {
        font-style: normal;
        color: #999;
      }
    }
  }
  .van-card__footer:after {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    border-top: solid 1px #f2f2f2;
  }
}
</style>
