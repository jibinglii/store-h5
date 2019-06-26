<template>
  <div class="goods-item">
    <router-link :to="{name: 'goods.view', params: {'goods': goods.uuid}}">
      <div class="t">
        <span>{{goods.title}}</span>
        <img
          alt="审核中"
          src="/images/shop/store_shz.png"
          v-if="goods.status == 0"
        />
        <img
          alt="未通过"
          src="/images/shop/store_wtg.png"
          v-if="goods.status == 3"
        />
        <img
          alt="已完成"
          src="/images/shop/store_ywc.png"
          v-if="goods.status == 2"
        />
      </div>
      <div class="c">
        <div class="img">
          <img :src="goods.logo" />
        </div>
        <div class="desc">
          {{goods.game_name}}-{{goods.server_name}}<br>
          商品价格：{{goods.amount}}元<br>
          发布时间：{{goods.updated_at}}
        </div>
        <div class="clear"></div>
      </div>
    </router-link>
    <div class="b">
      <span class="status">{{goods.status_label}}</span>
      <button style="opacity: 0">&nbsp;</button>
      <button
        v-if="goods.status == 3"
        class="btn-white"
        @click="updateStatus(goods.uuid, 'delete')"
      >删除</button>
      <button
        v-if="goods.status == 5"
        class="btn-black"
        @click="updateStatus(goods.uuid, 'up')"
      >上架</button>
      <button
        v-if="goods.status == 4"
        class="btn-black"
        @click="copy(goods)"
      >复制链接</button>
      <button
        v-if="goods.status == 4"
        class="btn-white"
        @click="updateStatus(goods.uuid, 'down')"
      >下架</button>
      <a
        v-if="goods.status == 0"
        class="goods-btn btn-black"
        :href="'/shop/goods_info_edit/'+ goods.uuid + '.html'"
      >修改</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);
export default {
  props: {
    goods: {
      type: Object
    }
  },
  methods: {
    updateStatus(uuid, action) {
      let message = "您确定要[删除]该商品吗？";
      if (action == 'up') {
        message = "您确定要[上架]该商品吗？";
      } else if (action == 'down') {
        message = "您确定要[下架]该商品吗？";
      }
      this.$confirm({
        title: "温馨提示",
        content: message,
        yesText: "否", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "是", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
        console.log('“cancel”');
      })
        .catch(() => {
          this.$toast.loading({mask: true})
          this.$http.post('api/v1/goods/' + uuid + '/' + action, {}, { loading: true }).then(({ message }) => {
            this.$toast(message);
            this.$emit('update')
          })
        });
    },
    copy(goods) {
      if (undefined != goods.uuid) {
        this.$copyText(window.location.href).then((e) => {
          this.$toast('复制成功，赶快去微信、QQ粘贴分享给你的好友吧');
        }, function (e) {
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-item {
  background-color: #fff;
  border-top: solid 1px #eaeaea;
  border-bottom: solid 1px #eaeaea;
  margin-bottom: 10px;
  display: block;
  a {
    color: #020202;
  }
  .t {
    display: block;
    position: relative;
    font-weight: bold;
    line-height: 2.5rem;
    padding: 0px 15px;
    border-bottom: solid 1px #eaeaea;
    font-size: .8rem;
    img {
      position: absolute;
      right: 0;
      top: 0;
      width: 80px;
      height: 80px;
      margin-top: -12px;
    }
  }
  .c {
    display: block;
    padding: 10px 12px;
    border-bottom: solid 1px #eaeaea;
    .img {
      position: absolute;
      img {
        width: 80px;
        height: 80px;
        border: none;
      }
    }
    .desc {
      float: left;
      margin-left: 90px;
      overflow: hidden;
      padding: 0px 10px;
      line-height: 180%;
      font-size: 0.75rem;
    }
  }
  .b {
    clear: both;
    display: block;
    line-height: 2rem;
    text-align: right;
    z-index: 999;
    .status {
      display: block;
      float: left;
      padding-left: 10px;
      font-size: 0.7rem;
      font-weight: bold;
    }
    .goods-btn,
    button {
      display: inline-block;
      font-size: 0.64rem;
      line-height: 180%;
      padding: 0px 20px;
      margin-right: 8px;
      border-radius: 5px;
    }
    .btn-white {
      color: #000;
      background-color: #fff;
      border: solid 1px #000;
    }
    .btn-black {
      color: #fff;
      background-color: #000;
      border: solid 1px #000;
      &:hover {
        color: #000;
        background-color: #fff;
      }
    }
  }
  .clear {
    clear: both;
  }
}
</style>
