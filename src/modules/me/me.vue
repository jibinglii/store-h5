<template>
  <div class="personCenter">
    <div class="header">
      <div class="user-icon">
        <img :src="currentUser.avatar" alt>
      </div>
      <h3>
        {{ currentUser.nickname }}
        <router-link :to="{ name: 'me.modifyuseinfo'}">
          <img src="../../assets/images/bianji.png">
        </router-link>
      </h3>

      <span>{{ currentUser.sign }}</span>
    </div>
    <div class="page_item">
      <div class="weui-cells__title">我是买家</div>
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
      <div class="weui-cells__title">我是卖家</div>
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
      <div class="weui-cells__title">常用工具</div>
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
        <router-link :to="{ name: 'collection.collection'}" class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd">
            <img src="../../assets/images/shoucang.png">
          </div>
          <div class="weui-cell__bd">
            <p>我的收藏</p>
          </div>
          <div class="weui-cell__ft"></div>
        </router-link>
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
        <router-link :to="{ name: 'me.accountsetting'}" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../../assets/images/seting.png">
          </div>
          <div class="weui-cell__bd">
            <p>账号设置</p>
          </div>
          <div class="weui-cell__ft"></div>
        </router-link>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import XHeader from "$components/XHeader";
import { mapGetters } from "vuex";
export default {
  name: "storeManage",
  components: {
    Tab,
    XHeader
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style lang="scss">
.header {
  height: 9rem;
  background-image: url("/images/shop/me-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .user-icon {
    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
    }
  }
  h3 {
    font-size: 0.768rem;
    line-height: 2;
    color: white;
    font-weight: 400;
    margin-bottom: -8px;
    display: flex;
    align-items: center;
    img {
      width: 0.853333rem;
      vertical-align: middle;
      padding-left: .213333rem;
    }
  }
  span {
    font-size: 14px;
    line-height: 2;
    color: #999;
    margin-bottom: 24px;
  }
}
.page_item {
  .weui-cells__title {
    margin-top: 0.3em;
  }
  .weui-cells {
    margin-top: 0;
    .weui-cell {
      padding: 0.512rem 15px;
      img {
        width: 1.28rem;
        margin-right: 0.426667rem;
        vertical-align: middle;
      }
      .weui-cell__bd {
        p {
          font-size: 0.682667rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
