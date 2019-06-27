<template>
  <div class="storeManage">
    <x-header
      title="店铺管理"
      url="me.me"
    ></x-header>
    <div class="store_banner">
      <div class="store_banner_l">
        <p>{{ info.total_sale|formatMoney}}</p>
        <span>累计销售</span>
      </div>
      <div class="store_banner_r">
        <p>{{ info.total_sale_month | formatMoney }}</p>
        <span>本月销售</span>
      </div>
    </div>
    <div class="dl_list">
      <router-link :to="{name: 'goods.goodsort'}">
        <dl>
          <dt>
            <img src="../../assets/images/fabu.png" alt>
          </dt>
          <dd>发布商品</dd>
        </dl>
      </router-link>
      <router-link :to="{name: 'home'}">
        <dl>
          <dt>
            <img src="../../assets/images/liulan.png" alt>
          </dt>
          <dd>预览店铺</dd>
        </dl>
      </router-link>
    </div>
    <div class="store_manage">
      <p>商品管理</p>
      <div class="store_manage_list">
        <router-link :to="{name: 'seller/goods', hash: '#1'}">
          <dl>
            <dt>
              <img src="../../assets/images/shenhe.png" alt>
            </dt>
            <dd>待审核</dd>
          </dl>
        </router-link>
        <router-link :to="{name: 'seller/goods', hash: '#3'}">
          <dl>
            <dt>
              <img src="../../assets/images/chushou.png" alt>
            </dt>
            <dd>出售中</dd>
          </dl>
        </router-link>
        <router-link :to="{name: 'seller/goods', hash: '#5'}">
          <dl>
            <dt>
              <img src="../../assets/images/maichu.png" alt>
            </dt>
            <dd>已出售</dd>
          </dl>
        </router-link>
        <router-link :to="{name: 'seller/goods', hash: '#4'}">
          <dl>
            <dt>
              <img src="../../assets/images/xiajia.png" alt>
            </dt>
            <dd>已下架</dd>
          </dl>
        </router-link>
      </div>
    </div>
    <div class="store_manage">
      <p>订单管理</p>
      <div class="store_manage_list">
        <router-link :to="{name: 'seller/orders', hash: '#1'}">
          <dl>
            <dt>
              <img src="../../assets/images/df.png" alt>
            </dt>
            <dd>待发货</dd>
          </dl>
        </router-link>
        <router-link :to="{name: 'seller/orders', hash: '#2'}">
          <dl>
            <dt>
              <img src="../../assets/images/ds.png" alt>
            </dt>
            <dd>待收货</dd>
          </dl>
        </router-link>
        <router-link :to="{name: 'seller/orders', hash: '#3'}">
          <dl>
            <dt>
              <img src="../../assets/images/jywc.png" alt>
            </dt>
            <dd>交易成功</dd>
          </dl>
        </router-link>
        <router-link :to="{name: 'seller/orders', hash: '#4'}">
          <dl>
            <dt>
              <img src="../../assets/images/th.png" alt>
            </dt>
            <dd>退货/维权</dd>
          </dl>
        </router-link>
      </div>
      <router-link class="weui-cell weui-cell_access" :to="{name: 'store.setting'}">
        <div class="weui-cell__bd">
          <span>店铺设置</span>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
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
    return {
      info: {}
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      await this.$http.get('api/v1/seller/total').then(({data}) => {
        this.info = data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.storeManage {
  .right-box {
    display: none;
  }
  .store_banner {
    width: 100%;
    height: 7.68rem;
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
        font-size: 1.408rem;
        font-weight: 200;
        &::before {
          content: "￥";
          font-size: 0.75rem;
        }
      }
      span {
        font-size: .7rem;
        font-weight: 200;
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
      padding: .768rem 0;
      dl {
        img {
          width: 1.28rem;
        }
        dd {
          font-size: .682667rem;
        }
      }
    }
  }
  .store_manage {
    background: #ffffff;
    margin: .426667rem 0;
    p{
      font-size: .682667rem;
       padding: .426667rem 0 0 .426667rem;
    }
    .store_manage_list {
      display: flex;
      align-items: center;
      a {
        display: block;
        flex: 1;
        text-align: center;
        padding: .768rem 0;
        dl {
          img {
            width: 1.28rem;
          }
          dd {
            font-size: .65rem;
          }
        }
      }
    }
    .weui-cell{
      font-size: .682667rem;
      padding: .521rem .64rem;
    }
    .weui-cell:before{
      left: 0;
    }
  }
}
</style>
