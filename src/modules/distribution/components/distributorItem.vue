<template>
  <div>
    <van-card slot="center" :name="item.id" :thumb="item.thumb" @click="click">
      <div slot="title">
        <p class="title">
          {{item.title}}
          <span>{{item.desc}}</span>
        </p>
      </div>
      <div slot="price">
        <section class="custom-card-bottom">
          <i>{{item.id}}</i>
        </section>
      </div>
    </van-card>
  </div>
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
@import "~vant/lib/index.css";
.van-card {
  background-color: #ffffff;
  border-bottom: solid 1px #f2f2f2;
  margin-top: 0;
  padding: 0.469333rem 0.64rem;
  .van-card__header {
    align-items: center;
    .van-card__thumb {
      width: 2.346667rem;
      height: 2.346667rem;
      img {
        border-radius: 50%;
        padding: 0.426667rem 0.426667rem 0 0;
      }
    }
    .van-card__content {
      min-height: 70px;
      .title {
        font-size: 0.597333rem;
        padding: 0.426667rem 0 0.426667rem 0;
        span {
          padding: 0 0.426667rem;
          background-color: #000;
          font-size: 0.512rem;
          color: #fff;
          border-radius: 0.170667rem;
        }
      }
    }
  }
}
.custom-card-bottom {
  display: flex;
  flex: 1;
  justify-content: space-between;

  i {
    font-style: normal;
    font-size: 0.512rem;
    color: #999;
  }
}
</style>
