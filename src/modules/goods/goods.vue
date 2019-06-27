<template>
  <div class="goods">
    <x-header
      title="商品详情"
      @click-right="showShare = true"
    >
      <div slot="right">
        <i class="iconfont icon-share"></i>
      </div>
    </x-header>
    <div
      class="banner"
      @click="previewImg"
    >
      <img :src="goods.logo">
      <div class="btn">
        点击查看 (共{{ goodsImgLen }}张图片)
      </div>
    </div>

    <div class="info">
      <div class="price-info">
        <span class="price">{{goods.amount | formatMoney}}</span>
        <span class="game">{{goods.game.name}}</span>
        <span class="status">{{goods.status_label}}</span>
      </div>
      <div class="title">
        <h4>{{goods.title}}</h4>
      </div>
    </div>

    <div class="desc">
      <div class="header">
        <div
          :class="{active: tabIndex == 0}"
          @click="tabIndex=0"
        >
          <h4>商品描述</h4>
        </div>
        <div
          :class="{active: tabIndex == 1}"
          @click="tabIndex=1"
        >
          <h4>交易说明</h4>
        </div>
      </div>
      <div class="content">
        <div
          class="desc1"
          v-show="tabIndex == 0"
        >
          <div class="item">
            <label>所在区服</label>
            <div>
              {{goods.server.type}}-{{goods.server.title}}
            </div>
          </div>
          <div
            v-for="(item, index) in goods.specs"
            :key="index"
            class="item"
          >
            <label>{{item.option.title}}</label>
            <div>
              <span v-if="Array.isArray(item.value)">
                {{item.value.join(', ')}}
              </span>
              <span v-else-if="item.type == 'radio'">
                {{item.option.options[item.value]}}
              </span>
              <span v-else>
                {{item.value}}
              </span>
            </div>
          </div>
          <div class="item">
            <label>商品描述</label>
            <div v-html="goods.content">

            </div>
          </div>
        </div>
        <div
          class="shuomin"
          v-show="tabIndex == 1"
        >
          <trade-desc></trade-desc>
        </div>
      </div>
    </div>
    <goods-keep v-show="tabIndex==0"></goods-keep>
    <goods-tips v-show="tabIndex==1"></goods-tips>

    <recommend></recommend>

    <div class="btn-group">
      <div class="btn-l">
        <a
          @click="connectSaler"
          class="service"
        >
          <img
            src="/images/shop/goods-service.png"
            alt=""
          >
          <span>联系卖家</span>
        </a>
        <a
          @click="collect(goods)"
          class="collect"
        >{{ goods.is_collect ? '已收藏' : '加入收藏'}}</a>
      </div>
      <a
        @click="buy(goodsId)"
        class="buy"
        :class="{disabled: !canBuy}"
      >{{canBuy?'立即购买':'暂时无货'}}</a>
    </div>

    <van-action-sheet
      v-model="showShare"
      title="分享"
      cancel-text="取消"
    >
      <div class="share">
        <div
          class="share-item"
          @click="shareGoods(goods.uuid)"
        >
          <div class="icon"><i class="iconfont icon-share1"></i></div>
          <span>
            发送给好友
          </span>
        </div>
        <div
          class="share-item"
          @click="copy(goods)"
        >
          <div class="icon"><i class="iconfont icon-copy-url"></i></div>
          <span>复制链接</span>
        </div>
        <div
          class="share-item"
          @click="share(goods)"
        >
          <div class="icon"><i class="iconfont icon-share"></i></div>
          <span>分享到其他应用</span>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import Vue from 'vue'
import ImagePreview from 'vant/lib/image-preview'
import 'vant/lib/image-preview/style'
import Actionsheet from 'vant/lib/action-sheet'
import 'vant/lib/action-sheet/style'
import XHeader from '$components/XHeader'
import Recommend from '$components/Recommend'
import TradeDesc from './components/TradeDesc'
import GoodsKeep from './components/GoodsKeep'
import GoodsTips from './components/GoodsTips'
import * as service from '$modules/goods/services'
import VueClipboard from 'vue-clipboard2';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
export default {
  components: {
    ImagePreview, XHeader, TradeDesc, GoodsKeep, GoodsTips, 'van-action-sheet': Actionsheet, Recommend
  },
  data() {
    return {
      goodsId: '',
      tabIndex: 0,
      goods: { images: [], game: [], server: [], specs: [] },
      showShare: false
    }
  },
  computed: {
    goodsImgLen() {
      return this.goods.images.length
    },
    canBuy() {
      if (this.goods.status != 4) {
        return false
      }
      return this.goods.store_nums > 0
    }
  },
  created() {
    this.goodsId = this.$route.params.goods
    this.getDetail();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.goodsId = to.params.goods
    this.getDetail();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  },
  methods: {
    buy(goodsId) {
      if (this.canBuy) {
        this.$router.push({ name: 'confirm', params: { 'goods': goodsId }, query: { 'spread_id': this.$route.query['spread_id'] } })
      }
    },
    async getDetail() {
      this.$toast.loading({ mask: true })
      service.goodsView(this.goodsId, {
        params: {
          include: 'specs.option,game,server',
          'fields[game]': 'id,name',
          append: 'is_collect'
        }
      })
        .then(({ data }) => {
          this.goods = data.goods;
          window.document.title = this.goods.title;
          this.$toast.clear()
        }).catch(({ response }) => {
          this.$router.back()
        });
    },
    connectSaler() {
      // 联系卖家
      this.downloadApp();
      if (this.$cookies.get('connect:goods:' + this.goodsId)) {
        window.soogua.postMessage(JSON.stringify({
          "action": "route",
          "params": JSON.stringify({ "url": "message/" + this.goods.user_id + "/6" })
        }))
      } else {
        window.soogua.postMessage(JSON.stringify({
          "action": "route",
          "params": JSON.stringify({ "url": "message/" + this.goods.user_id + "/6/" + this.goodsId })
        }));
        this.$cookies.set('connect:goods:' + this.goodsId, true)
      }
    },
    collect(goods) {
      if (!goods.is_collect) {
        this.$http.put('api/v1/collect/goods/' + this.goodsId).then(({ data }) => {
          this.$toast.success('收藏成功');
          this.$set(goods, 'is_collect', true)
        }).catch(error => {
          console.log(error.config)
          // this.$toast.fail(response.message)
        });
      }
    },
    previewImg() {
      ImagePreview(this.goods.images)
    },
    shareGoods(uuid) {
      if (undefined != uuid) {
        window.soogua.postMessage(JSON.stringify({
          "action": "shareGoods2Conversation",
          "params": JSON.stringify({ "goodsid": uuid, "max": 1 })
        }))
      }
      this.showShare = false
    },
    share(goods) {
      if (undefined != goods.uuid) {
        window.soogua.postMessage(JSON.stringify({
          "action": "share",
          "params": JSON.stringify({
            "title": goods.title,
            "descr": goods.content,
            "thumImage": goods.logo,
            "url": goods.url
          })
        }))
        this.showShare = false
      }
    },
    copy(goods) {
      if (undefined != goods.uuid) {
        this.$copyText(goods.url).then((e) => {
          this.$toast('复制成功，赶快去微信、QQ粘贴分享给你的好友吧');
          this.showShare = false
          console.log(e)
        }, function (e) {
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  .banner {
    position: relative;
    height: 11.875rem;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
    .btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.875rem;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      line-height: 1.875rem;
      font-size: 0.65rem;
      color: white;
    }
  }
  .info {
    height: 5.5rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 0 0.75rem;
    justify-content: center;
    .price-info {
      height: 2rem;
      display: flex;
      align-items: center;
      .price {
        font-size: 0.9rem;
        font-weight: 400;
        &::before {
          content: "¥ ";
          font-size: 0.6rem;
        }
        margin-right: 8px;
      }
      .game {
        background-color: #eaeaea;
        color: #666;
        padding: 1px 3px;
        font-size: 0.6rem;
        margin-right: 8px;
      }
      .status {
        background-color: #eaeaea;
        color: #e00;
        padding: 1px 3px;
        font-size: 0.6rem;
      }
    }
    .title h4 {
      height: 2.5rem;
      font-size: 0.8rem;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .desc {
    margin-top: 0.625rem;
    .header {
      height: 2.625rem;
      display: flex;
      align-items: center;
      div {
        flex: 1;
        display: block;
        text-align: center;
        height: 100%;
        line-height: 2.5rem;
        font-size: 0.8rem;
        &.active {
          background-color: white;
        }
      }
    }
    .content {
      background-color: white;
      padding: 0.75rem;
      .desc1 {
        .item {
          display: flex;
          position: relative;
          line-height: 1.75;
          padding: 0.25rem 0;
          label {
            flex: 4;
            color: #999;
            font-size: 0.8125rem;
            display: inline-block;
            line-height: 2rem;
          }
          div {
            flex: 7;
            display: inline-block;
            font-size: 0.8125rem;
            line-height: 2.5;
          }
          &::after {
            content: "";
            height: 1px;
            background-color: #ededed;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
    }
  }
  .btn-group {
    height: 50px;
    background-color: white;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    .btn-l {
      border-top: 1px #e5e5e5 solid;
      box-sizing: border-box;
    }
    a {
      display: block;
      height: 100%;
      box-sizing: border-box;
      float: left;
      color: #020202;
    }
    .service {
      width: 24%;
      text-align: center;
      img {
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 auto;
        margin-top: 6px;
      }
      span {
        display: block;
        color: #020202;
        font-size: 12px;
        line-height: 2;
      }
    }
    .collect {
      border-left: 1px solid #ededed;
      width: 38%;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
    }
    .buy {
      width: 38%;
      font-size: 16px;
      color: white;
      background: #020202;
      text-align: center;
      margin-top: -1px;
      &.disabled {
        opacity: 0.7;
      }
    }
  }
}

.recommend {
  margin-top: 0.625rem;
}

.share {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  .share-item {
    flex: 1;
    text-align: center;
    .icon {
      display: block;
      margin: 0 auto;
      height: 50px;
      width: 50px;
      border: 1px solid #020202;
      border-radius: 8px;
      text-align: center;
      line-height: 50px;
      .iconfont {
        font-size: 24px;
      }
    }
    span {
      font-size: 12px;
    }
  }
}
body {
  padding-bottom: 3.75rem;
}
</style>
