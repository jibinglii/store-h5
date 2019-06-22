<template>
  <div class="accountSet">
    <x-header
      title="账号设置"
      back-url="me.me"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <van-cell-group>
      <van-cell title="修改登录密码" is-link to="me"/>
      <van-cell title="修改支付密码" is-link to="index"/>
      <van-cell title="银行卡管理" is-link to="index"/>
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" hairline size="large">退出登录</van-button>
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

export default {
  name: "",
  components: {
    XHeader,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
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
    }
  }
}
</style>
