<template>
  <div class="add">
    <x-header title="添加商品"></x-header>
    <van-cell-group>
      <van-cell title="商品类型">{{goodsType}}</van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="params.gameName" label="游戏名称" placeholder="请输入游戏名称" class="gameName"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="平台类型" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="currentMobileType" :options="mobileTypeOption"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="商品品类" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="producType" :options="producTypeOption"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="params.goodsTitle" label="商品标题" placeholder="请输入商品标题"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="游戏区服" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value3" :options="option3"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="params.price" label="商品价格" placeholder="请输入商品价格" class="price"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="params.stock" label="商品库存" placeholder="请输入商品库存" class="stock"/>
    </van-cell-group>
    <van-cell-group>
      <uploader title="商品图片" :limit="15" v-model="params.images"></uploader>
    </van-cell-group>
    <van-cell-group class="intro-cell">
      <van-cell title="商品介绍"/>
      <van-field
        v-model="params.content"
        type="textarea"
        autosize
        placeholder="请输入商品介绍"
        class="intro"
      />
    </van-cell-group>
    <div class="agreement">
      <label for="weuiAgree" class="weui-agree">
        <van-checkbox v-model="isagree"></van-checkbox>
        <span class="weui-agree__text">
          我已阅读并同意
          <a @click="onClick" href="javascript:void(0)">《商品发布协议》</a>
        </span>
      </label>
      <agree title="商品发布协议" ref="agree" :content="saleProtocol"/>
    </div>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="next()">提交审核</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Agree from "$components/Agree";
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
// import protocol from '../api/protocol';

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
    [XUploader.name]: XUploader,
    Agree
  },
  data() {
    return {
      params: {
        goodsTitle: "",
        gameName: "",
        content: "",
        price: "",
        stock: "",
        images: []
      },
      goodsType: "",
      currentMobileType: 0,
      producType: 0,
      value3: 0,
      avatar: [],
      isagree: true,
      saleProtocol: "",
      mobileTypeOption: [
        { text: "苹果端", value: 0 },
        { text: "安卓端", value: 1 },
        { text: "PC端", value: 2 }
      ],
      producTypeOption: [
        { text: "游戏", value: 0 },
        { text: "流量", value: 1 },
        { text: "账号", value: 2 },
        { text: "服务", value: 3 }
      ],
      option3: [
        { text: "1区", value: 0 },
        { text: "2区", value: 1 },
        { text: "3区", value: 2 }
      ]
    };
  },
  created() {
    this.goodsType = this.$route.params.dec;
  },
  methods: {
    onClick() {},
    next() {
      if (this.params.goodsTitle == "") {
        this.$toast({ message: "商品标题不能为空" });
      } else if (this.params.price == "") {
        this.$toast({ message: "商品价格不能为空" });
      } else if (this.params.stock == "") {
        this.$toast({ message: "商品库存不能为空" });
      } else if (this.params.gameName == "") {
        this.$toast({ message: "商品名称不能为空" });
      }
      if (!this.isagree) {
        this.$toast("请勾选《商品发布协议》");
      } else {
        if (!this.saving) {
          this.saving = true;
          // this.$loading.show("商品保存中");
          this.$http
            .post("api/v1/goods", this.param)
            .then(response => {
              this.saving = false;
              this.$loading.hide();
              if (this.hasSpec) {
                let uuid = response.data.data.uuid;
                let url =
                  "/shop/goods_spec_add/" +
                  this.param.game_id +
                  ".html?id=" +
                  uuid +
                  "&server_name=" +
                  this.gameName;
                location.href = url;
              } else {
                let url = "/shop/result/2.html";
                location.href = url;
              }
            })
            .catch(fail => {
              this.$toast(fail.response.data.message);
              this.saving = false;
              this.$loading.hide();
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add {
  /deep/.van-cell-group {
    .van-cell__title {
      font-weight: 600;
      font-size: 0.682667rem;
    }
    .van-dropdown-menu {
      height: 24px;
      .van-dropdown-menu__item {
        display: block;
      }
      .van-hairline--top-bottom::after {
        border-width: 0px;
      }
      .van-dropdown-menu__title {
        font-size: .64rem;
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
      font-size: .64rem;
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
    .weui-uploader__title {
      font-size: 0.682667rem;
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
  /deep/.agreement {
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


