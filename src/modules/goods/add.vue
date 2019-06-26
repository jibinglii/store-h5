<template>
  <div class="add">
    <x-header title="添加商品" back-url="me.me"></x-header>
    <van-cell-group>
      <van-cell title="商品类型">
        <b>{{goodsType}}</b>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="游戏名称">
        <b>{{serverName}}</b>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="平台类型" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="currentMobileType" :options="option1"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="商品品类" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="producType" :options="option2"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="title" label="商品标题" placeholder="请输入商品标题"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="游戏区服" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value3" :options="option3"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="price" label="商品价格" placeholder="请输入商品价格" class="price"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="stock" label="商品库存" placeholder="请输入商品库存" class="stock"/>
    </van-cell-group>
    <van-cell-group>
      <uploader title="头像" :limit="15" v-model="avatar"></uploader>
    </van-cell-group>
    <van-cell-group class="intro-cell">
      <van-cell title="商品介绍"/>
      <van-field v-model="intro" type="textarea" autosize placeholder="请输入商品介绍" class="intro"/>
    </van-cell-group>
    <div class="agreement">
      <label for="weuiAgree" class="weui-agree">
        <van-checkbox v-model="checked"></van-checkbox>
        <span class="weui-agree__text">
          我已阅读并同意
          <a @click="onClick" href="javascript:void(0)">《商品发布协议》</a>
        </span>
      </label>
    </div>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="submit">保存</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import DropdownMenu from "vant/lib/dropdown-menu";
import "vant/lib/dropdown-menu/style";
import DropdownItem from "vant/lib/dropdown-item";
import "vant/lib/dropdown-item/style";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Checkbox from "vant/lib/checkbox";
import "vant/lib/checkbox/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import XUploader from "$components/XUploader";

export default {
  name: "goods-sort",
  components: {
    XHeader,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    "van-field": Field,
    "van-checkbox": Checkbox,
    [XUploader.name]: XUploader
  },
  data() {
    return {
      goodsType:"",
      serverName: "",
      title: "",
      currentMobileType: 0,
      producType: 0,
      value3: 0,
      avatar: [],
      intro: "",
      price: "",
      stock: "",
      checked: true,
      option1: [
        { text: "苹果端", value: 0 },
        { text: "安卓端", value: 1 },
        { text: "PC端", value: 2 }
      ],
      option2: [
        { text: "苹果端", value: 0 },
        { text: "安卓端", value: 1 },
        { text: "PC端", value: 2 }
      ],
      option3: [
        { text: "苹果端", value: 0 },
        { text: "安卓端", value: 1 },
        { text: "PC端", value: 2 }
      ]
    };
  },
  created() {
    // let routerParams = this.$route.params;
    // console.log(routerParams)
    // this.goodsType = routerParams;
    // this.$http.get("api/v1/goods").then(({ data }) => {
    //   console.log(data.goods.data[0].game_name);
    //   var result = data.goods.data[0].game_name;
    //   this.serverName = result;
    // });
  },

  methods: {
    onClick() {},
    submit () {}
  }
};
</script>

<style lang="scss" scoped>
.add {
  /deep/.van-cell-group {
    .van-cell__title {
      font-weight: 600;
    }
    .van-dropdown-menu {
      height: 24px;
      .van-dropdown-menu__item {
        display: block;
      }
      .van-hairline--top-bottom::after {
        border-width: 0px;
      }
      .van-dropdown-menu__title::after {
        border: none;
      }
      .van-cell__title {
        text-align: left;
      }
    }
    .van-hairline--top-bottom::after {
      border-width: 0px;
    }
    .van-cell__value {
      color: #000;
    }
    .van-field__control {
      text-align: right;
    }
    .van-field__label {
      font-weight: 600;
    }
    .price,
    .stock {
      position: relative;
      input {
        width: 89%;
      }
    }
    .price::after {
      content: "元";
      position: absolute;
      right: 0.853333rem;
    }
    .stock::after {
      content: "件";
      position: absolute;
      right: 0.853333rem;
    }
    .weui-uploader__title{
      font-size: .682667rem;
      color: #000;
      font-weight: 600;
    }
  }
  /deep/.intro-cell {
    .van-cell:not(:last-child)::after {
      border: none;
    }
    .intro {
      .van-field__control {
        text-align: left;
      }
    }
  }
  .agreement {
    .weui-agree {
      display: flex;
      .van-checkbox__icon--checked .van-icon {
        background-color: #000;
        border-color: #000;
      }
      .van-checkbox {
        padding-right: 0.426667rem;
      }
      a {
        color: #000;
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


