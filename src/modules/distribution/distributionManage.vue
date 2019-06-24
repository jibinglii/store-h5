<template>
  <div>
    <x-header
      title="分销员管理"
      back-url="me"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <van-cell-group>
      <van-field v-model="id" label="分销员ID" type="text" input-align="right" placeholder/>
      <van-field v-model="remarks" label="分销员备注" type="text" input-align="right" placeholder/>
      <van-field v-model="commission" label="分销佣金" type="text" input-align="right" placeholder/>
      <van-switch-cell v-model="checked" title="状态"/>
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" hairline size="large">保存</van-button>
    </div>
  </div>
</template>
<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import SwitchCell from "vant/lib/switch-cell";
import "vant/lib/switch-cell/style";

export default {
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-field": Field,
    "van-switch-cell": SwitchCell,
    "van-button": Button
  },
  data() {
    return {
      id: "17261533",
      remarks: "旧人未挽",
      commission: "10%",
      checked: true
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.btn {
  text-align: center;
  .van-button {
    width: 90%;
    margin: 2.133333rem auto;
    background: #000;
    color: #ffffff;
  }
}
.van-switch--on {
  background-color: #47cb7b;
}
</style>
