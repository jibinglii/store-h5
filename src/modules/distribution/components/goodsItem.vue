<template>
  <div>
    <div class="card">
      <h3 class="headLine">{{item.headLine}}</h3>
      <van-card slot="center" :name="item.id" :thumb="item.thumb" @click="click">
        <div slot="title">
          <h3 class="title">{{item.title}}</h3>
          <p>商品价格: {{item.price}}</p>
          <p>发布时间: {{item.releaseTime}}</p>
        </div>
        <div slot="footer">
          <span>
            <i>佣金：</i>
            {{item.commission}}
          </span>
          <van-button size="small" hairline type="primary">{{item.distributionBtn}}</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
import Card from "vant/lib/card";
import Button from "vant/lib/button";
import "vant/lib/card/style";
import "vant/lib/button/style";
export default {
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
    [Card.name]: Card,
    "van-button": Button
  },
  methods: {
    click() {}
  }
};
</script>

<style lang="scss">
@import "~vant/lib/index.css";
.card {
  background-color: #ffffff;
  h3.headLine {
    font-size: 0.682667rem;
    border-top: solid 1px #f2f2f2;
    border-bottom: solid 1px #f2f2f2;
    line-height: 40px;
    padding: 0 .64rem;
  }
  .van-card {
    background-color: #ffffff;
    margin-bottom: 0.426667rem;
    margin-top: 0;
    padding: 0;
    .van-card__header {
      align-items: center;
      padding: 0.341333rem 0.64rem;
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
      padding: 0.426667rem 0.64rem;
      text-align: left;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          font-style: normal;
          color: #999;
        }
      }
      .van-button {
        background: #000;
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
}
</style>
