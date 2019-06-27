<template>
  <van-card
    slot="center"
    :name="item.id"
    :thumb="item.logo"
  >
    <div slot="title">
      <h3 class="title">{{item.title}}</h3>
      <p>分润比例: {{item.seller.profit_rate}}</p>
      <p>价格: {{item.amount|formatMoney}}</p>
    </div>
    <div slot="footer">
      <span>
        <i>店铺：</i>
        {{item.store.name}}
      </span>
      <van-button
        size="small"
        hairline
        type="primary"
        @click="copy"
      >复制链接</van-button>
    </div>
  </van-card>
</template>

<script>
import Vue from 'vue'
import Card from "vant/lib/card";
import Button from "vant/lib/button";
import "vant/lib/card/style";
import "vant/lib/button/style";
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);
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
    copy() {
      let url = location.origin + '/' + window.STORE_ID + '/goods/' + this.item.uuid + '.html?spread_id=' + this.$user().id
      this.$copyText(url).then((e) => {
        this.$toast('复制成功，赶快去微信、QQ粘贴分享给你的好友吧');
        this.showShare = false
      }, function (e) {
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.van-card {
  background-color: #ffffff;
  margin-bottom: 8px;
  margin-top: 0;
  padding: 0;
  .van-card__header {
    align-items: center;
    padding: 6px 8px;
    .van-card__thumb {
      width: 64px;
      height: 64px;
      img {
        width: 100%;
      }
    }
  }

  .van-card__content {
    line-height: 2;
    .title {
      font-size: 14px;
      padding: 8px 0 0 0;
      p {
        padding: 0 8px;
        background-color: #000;
        font-size: 10px;
        color: #fff;
        border-radius: 0.170667rem;
      }
    }
  }
  .van-card__footer {
    position: relative;
    padding: 6px 8px;
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
</style>
