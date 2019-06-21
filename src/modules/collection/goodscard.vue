<template>
  <div>
        <van-card
          slot="center"
          :name="item.id"
          :title="item.title"
          :desc="item.desc"
          :thumb="item.thumb"
        >
          <div slot="price">
            <section class="custom-card-bottom">
              <span class="custom-price">
                ￥
                <i>{{item.price}}</i>.00
              </span>
              <div class="custom-btn">
                <van-button>分享</van-button>
                <van-button>立即购买</van-button>
              </div>
            </section>
          </div>
        </van-card>
  </div>
</template>

<script>
import { Button, Card } from "vant";
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      result: ["1","2"],
    };
  },
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
  }
};
</script>

<style lang="scss" scoped>
@import "~vant/lib/index.css";
/deep/.van-card {
  padding: 0.426667rem 0.512rem;
  background-color: #fafafa;
  margin-top: 0;
  .van-card__thumb {
    width: 4.266667rem;
    height: 4.266667rem;
    margin-right: 0.426667rem;
  }

  .van-card__title {
    width: 5.333333rem;
    height: 0.597333rem;
    margin-top: 0.170667rem;
    font-size: 0.597333rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #000;
    line-height: 1;
  }
  .van-card__desc {
    max-height: none;
    margin-top: 0.512rem;
    width: 2.133333rem;
    padding-left: 0.256rem;
    padding-right: 0.256rem;
    height: 0.64rem;
    font-size: 0.426667rem;
    line-height: 0.64rem;
    text-align: center;
    background: rgba(137, 199, 56, 1);
    color: #fff;
    border-radius: 0.170667rem;
  }
  .van-card__bottom {
    display: flex;
    flex: 5;
    justify-items: space-between;
    align-items: flex-end;
    width: 100%;
    .van-card__price {
      width: 100%;
    }
  }
}
.custom-card-bottom {
  display: flex;
  flex: 1;
  justify-content: space-between;
  .custom-price {
    color: #ff0000;
    font-size: 0.512rem;
    i {
      font-style: normal;
      font-size: 0.768rem;
    }
  }
  .custom-btn {
    .van-button {
      height: 1.152rem;
      width: 2.773333rem;
      line-height: 1.109333rem /* 52/46.875 */;
      &:first-child {
        margin-right: 0.426667rem;
      }
    }

    .van-button--normal {
      padding: 0;
      font-size: 0.512rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
    }

    .van-button--default {
      color: #fff;
      background-color: #000;
      border: 1px solid #000;
      border-radius: 0.170667rem;
      &:first-child {
        color: #000;
        background-color: #fff;
      }
    }
  }
}
</style>
