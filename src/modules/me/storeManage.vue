<template>
  <div class="storeManage">
    <x-header
      title="店铺管理"
      back-url="me.me"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <div class="store_banner">
      <div class="store_banner_l">
        <p>1000</p>
        <span>累计销售</span>
      </div>
      <div class="store_banner_r">
        <p>2319</p>
        <span>本月销售</span>
      </div>
    </div>
    <div class="dl_list">
      <a href>
        <dl>
          <dt>
            <img src="../../assets/images/fabu.png" alt>
          </dt>
          <dd>发布商品</dd>
        </dl>
      </a>
      <a href>
        <dl>
          <dt>
            <img src="../../assets/images/liulan.png" alt>
          </dt>
          <dd>预览店铺</dd>
        </dl>
      </a>
    </div>
    <div class="store_manage">
      <p>商品管理</p>
      <div class="store_manage_list">
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/shenhe.png" alt>
            </dt>
            <dd>待审核</dd>
          </dl>
        </a>
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/chushou.png" alt>
            </dt>
            <dd>出售中</dd>
          </dl>
        </a>
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/maichu.png" alt>
            </dt>
            <dd>已出售</dd>
          </dl>
        </a>
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/xiajia.png" alt>
            </dt>
            <dd>已下架</dd>
          </dl>
        </a>
      </div>
    </div>
    <div class="store_manage">
      <p>订单管理</p>
      <div class="store_manage_list">
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/df.png" alt>
            </dt>
            <dd>待发货</dd>
          </dl>
        </a>
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/ds.png" alt>
            </dt>
            <dd>待收货</dd>
          </dl>
        </a>
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/jywc.png" alt>
            </dt>
            <dd>交易成功</dd>
          </dl>
        </a>
        <a href>
          <dl>
            <dt>
              <img src="../../assets/images/th.png" alt>
            </dt>
            <dd>退货/维权</dd>
          </dl>
        </a>
      </div>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <span>店铺设置</span>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
export default {
  name: "storeManage",
  components: {
    XHeader
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../assets/css/common.css";

.storeManage {
  .right-box {
    display: none;
  }
  .store_banner {
    width: 100%;
    height: 180px;
    background-image: url(../../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    color: #ffffff;
    .store_banner_l,
    .store_banner_r {
      flex: 1;
      text-align: center;
      p {
        font-size: 1.8em;
      }
      span {
        font-size: 0.6em;
      }
    }
    .store_banner_l {
      border-right: solid 1px #999999;
    }
  }
  .dl_list {
    background: #ffffff;
    display: flex;
    align-items: center;
    a {
      display: block;
      flex: 1;
      text-align: center;
      padding: 18px 0;
      dl {
        img {
          width: 30px;
        }
        dd {
          font-size: 0.8em;
        }
      }
    }
  }
  .store_manage {
    background: #ffffff;
    margin: 10px 0;
    p{
       padding: 10px 0 0 10px;
    }
    .store_manage_list {
      display: flex;
      align-items: center;
      a {
        display: block;
        flex: 1;
        text-align: center;
        padding: 18px 0;
        dl {
          img {
            width: 30px;
          }
          dd {
            font-size: 0.8em;
          }
        }
      }
    }
    .weui-cell{
      padding: 14px 15px;
    }
    .weui-cell:before{
      left: 0;
    }
  }
}
</style>
