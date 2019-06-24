<template>
  <div>
    <van-card
      slot="center"
      :name="item.uuid"
      :title="item.title"
      :desc="item.game_name"
    >
      <van-image
        slot="thumb"
        :src="item.logo"
        width="100%"
        height="100%"
        fit="cover"
      />

      <div slot="price">
        <section class="custom-card-bottom">
          <span class="custom-price">
            ￥
            <i>{{item.amount | formatMoney | roundNum}}.</i>
            {{item.amount | formatMoney | decimalNum}}
          </span>
          <div class="custom-btns">
            <van-button>分享</van-button>
            <van-button @click="onBuy">立即购买</van-button>
          </div>
        </section>
      </div>
    </van-card>
  </div>
</template>

<script>
import Button from "vant/lib/button";
import Card from "vant/lib/card";
import Image from "vant/lib/image";
import "vant/lib/button/style";
import "vant/lib/card/style";
export default {
  name: "goodscard",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    onBuy() {
      this.$router.push({
        name: "goods.view",
        params: { goods: this.item.uuid }
      });
    }
  },
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    [Image.name]: Image
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-card {
  padding: 0.5rem 0.6rem;
  background-color: #fff;
  margin-top: 0;
  .van-card__thumb {
    width: 5rem;
    height: 5rem;
    margin-right: 0.5rem;
  }

  .van-card__title {
    width: 100%;
    height: 0.7rem;
    margin-top: 0.2rem;
    font-size: 0.7rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #000;
    line-height: 1;
  }
  .van-card__desc {
    max-height: none;
    margin-top: 0.6rem;
    width: 2.5rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    height: 0.75rem;
    font-size: 0.5rem;
    line-height: 0.75rem;
    text-align: center;
    background: rgba(137, 199, 56, 1);
    color: #fff;
    border-radius: 0.2rem;
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
    font-size: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    align-items: flex-end;
    i {
      font-style: normal;
      font-size: 0.9rem;
      line-height: 0.8rem;
    }
  }
  .custom-btns {
    .van-button {
      height: 1.35rem;
      width: 3.25rem;
      line-height: 1.25rem;
      &:first-child {
        margin-right: 0.5rem;
      }
    }

    .van-button--normal {
      padding: 0;
      font-size: 0.6rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
    }

    .van-button--default {
      color: #fff;
      background-color: #000;
      border: 1px solid #000;
      border-radius: 0.2rem;
      &:first-child {
        color: #000;
        background-color: #fff;
      }
    }
  }
}
</style>
