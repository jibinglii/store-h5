
<template>
  <div>
    <x-header title="分销管理" back-color="#ffffff" color="#000" underline-color="#f2f2f2"></x-header>
<!--    <div class="store_banner">-->
<!--      <div class="store_banner_l">-->
<!--        <p><sup>￥</sup>1635.00</p>-->
<!--        <span>本月收益</span>-->
<!--      </div>-->
<!--      <div class="store_banner_r">-->
<!--        <p><sup>￥</sup>3635.00</p>-->
<!--        <span>累计收益</span>-->
<!--      </div>-->
<!--    </div>-->
    <van-cell-group>
     <van-cell icon="todo-list-o" title="分销任务" is-link to="distributionproducts" v-if="isFenxiaoyuan"/>
     <van-cell icon="bill-o" title="分销人员管理" is-link to="distributor" v-if="showPeople"/>
     <van-cell icon="user-o" title="分销订单管理" is-link :to="{name: 'seller/orders'}" v-if="showPeople"/>
    </van-cell-group>
  </div>
</template>
<script>
// https://youzan.github.io/vant/#/zh-CN/tab
// todo 修改选择样式
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
export default {
  name: "store",
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-field": Field
  },
  computed: {
    showPeople () {
      return !(_.indexOf(this.$currentStore().roles,'分销店铺') != -1)
    },
    isFenxiaoyuan () {
      return !(_.indexOf(this.$currentStore().roles,'推广店铺') != -1)
    }
  },
};
</script>
<style lang="scss" scoped>
.store_banner {
  width: 100%;
  height: 8.533333rem;
  background-image: url(../../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  line-height: 1.2;
  .store_banner_l,
  .store_banner_r {
    flex: 1;
    text-align: center;
    p {
      sup{
        font-size: .8rem;
        font-weight: 200;
      }
      font-size: 1.493333rem;
    }
    span {
      font-size: 0.554667rem;
      color: #b7b7b7;
    }
  }
  .store_banner_l {
    border-right: solid 1px #999999;
  }
}
.van-cell-group{
  .van-cell__title{
    font-weight: 600;
  }
}
</style>
