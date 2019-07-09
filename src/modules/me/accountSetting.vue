<template>
  <div class="accountSet">
    <x-header
      title="账号设置"
      url="me.me"
    ></x-header>
    <van-cell-group>
      <!-- <van-cell title="修改登录密码" is-link to="me"/> -->
      <van-cell
        title="修改支付密码"
        is-link
        :to="{name: 'me.edit-pay-pwd'}"
      />
      <van-cell
        title="收付款账号"
        is-link
        :to="{name: 'banks'}"
      />
    </van-cell-group>
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="submit"
      >退出登录</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Cell from "vant/lib/cell";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import "vant/lib/cell/style";
import { mapActions } from 'vuex'
export default {
  name: "",
  components: {
    XHeader,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell
  },
  methods: {
    ...mapActions(['logout']),
    submit() {
      this.$confirm({
        title: "温馨提示",
        content: '您确定要退出吗？',
        yesText: "否", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "是", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
        console.log('“cancel”');
      }).catch(() => {
        this.logout()
        this.$router.push({ name: 'auth.login' })
        this.$toast.success('退出成功，请重新登录')
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.accountSet {
  .right-box {
    display: none;
  }
  .van-cell {
    padding: 0.426667rem 0.64rem;
    .van-cell__title {
      span {
        font-size: 0.682667rem;
        font-weight: 600;
      }
    }
  }
  .btn {
    text-align: center;
    .van-button {
      width: 90%;
      margin: 2.133333rem auto;
      background: #000;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
