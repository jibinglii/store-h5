<template>
  <div class="personCenter">
    <div class="header">
      <img src="../../assets/images/user_logo.png" alt class="user_logo">
      <p>
        爱抽烟的菇凉
        <img src="../../assets/images/bianji.png" alt>
      </p>
      <span>命里有时终须有 命里无时莫强求</span>
    </div>
    <div class="page_item">
      <p class="p_title">我是买家</p>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/order.png">
          </div>
          <div class="weui-cell__bd">
            <p>我的订单</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
    </div>
    <div class="page_item">
      <p class="p_title">我是卖家</p>
      <div class="weui-cells">
        <router-link :to="{ name: 'me.storemanage'}" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd">
              <img src="../../assets/images/dianpu.png">
            </div>
            <div class="weui-cell__bd">
              <p>店铺管理</p>
            </div>
            <div class="weui-cell__ft"></div>
        </router-link>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/shangpin.png">
          </div>
          <div class="weui-cell__bd">
            <p>商品管理</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/fenxiao.png">
          </div>
          <div class="weui-cell__bd">
            <p>分销管理</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/jiesuan.png">
          </div>
          <div class="weui-cell__bd">
            <p>结算管理</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
    </div>
    <div class="page_item">
      <p class="p_title">常用工具</p>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/mai.png">
          </div>
          <div class="weui-cell__bd">
            <p>我要卖</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/shoucang.png">
          </div>
          <div class="weui-cell__bd">
            <p>我的收藏</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/liucheng.png">
          </div>
          <div class="weui-cell__bd">
            <p>操作流程</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/xiaoxi.png">
          </div>
          <div class="weui-cell__bd">
            <p>我的消息</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/fankui.png">
          </div>
          <div class="weui-cell__bd">
            <p>意见反馈</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/help.png">
          </div>
          <div class="weui-cell__bd">
            <p>使用帮助</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/seting.png">
          </div>
          <div class="weui-cell__bd">
            <p>账号设置</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import XHeader from "$components/XHeader";
export default {
  name: "storeManage",
  components: {
    Tab,
    XHeader
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../assets/css/common.css";

.header {
  background-image: url(../../assets/images/me_bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  padding: 30px 0;
  color: #ffffff;
  .user_logo {
    width: 20%;
    padding-bottom: 15px;
  }
  p {
    font-weight: 600;
    img {
      width: 18px;
      vertical-align: middle;
    }
  }
  span {
    font-size: 0.13rem;
    color: #999999;
  }
}
.page_item {
  .p_title {
    font-size: 0.12rem;
    color: #818181;
    padding: 10px;
  }
  .weui-cells {
    margin-top: 0;
    .weui-cell {
      padding: 6px 15px;
      img {
        width: 35px;
      }
    }
  }
}
</style>
