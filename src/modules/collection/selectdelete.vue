<template>
  <div class="select-content">
    <van-checkbox name="selectall" v-model="isAllSelected" @change="selectCheckBox(isAllSelected)">
      全选
      <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive">
    </van-checkbox>
    <section class="custom-btn">
      <van-button @click="oneKeyClean">一键清除</van-button>
      <van-button @click="onDelete">删除</van-button>
    </section>
  </div>
</template>

<script>
import Button from "vant/lib/button";
import Checkbox from "vant/lib/checkbox";
import "vant/lib/button/style";
import "vant/lib/checkbox/style";
export default {
  props: {
    checkedGoods: {
      type: Array,
      default: []
    },
    goodsLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      _checkedGoods: [],
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      }
    };
  },
  computed: {
    isAllSelected: {
      set: function(checked) {
        let dt = [];
        if (checked) {
          for (let i = 1, l = this.goodsLength; i <= l; i++) {
            dt.push(i);
          }
        }
        this.$emit("updateCheckedGoods", dt);
      },
      get: function() {
        let sL = this.checkedGoods.length;
        return this.goodsLength <= sL;
      }
    }
  },
  methods: {
    selectCheckBox(checked) {},
    oneKeyClean() {
      this.$emit("oneKeyClean");
    },
    onDelete() {
      this.$emit("onDelete");
    }
  },
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox
  }
};
</script>

<style lang="scss" scoped>
.select-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.090667rem /* 98/46.875 */;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  border: 1px solid #ededed;
  /deep/.van-checkbox {
    margin-left: 28px;
    .van-checkbox__icon {
      width: 0.704rem /* 33/46.875 */;
      height: 0.704rem /* 33/46.875 */;
      font-size: 0.704rem;
      line-height: 0.704rem;
      img {
        width: 100%;
        height: auto;
      }
    }
    .van-checkbox__label {
      font-size: 0.597333rem /* 28/46.875 */;
      margin-left: 0.426667rem /* 20/46.875 */;
      color: #323233;
      line-height: 0.426667rem /* 20/46.875 */;
    }
  }

  .custom-btn {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 12px;
    .van-button {
      height: 1.152rem;
      width: 2.773333rem;
      line-height: 1.109333rem /* 52/46.875 */;
      &:first-child {
        margin-right: 0.426667rem;
      }
    }
    .van-button--normal {
      padding: 0;
      font-size: 0.512rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
    }
    .van-button--default {
      color: #fff;
      background-color: #000;
      border: 1px solid #000;
      border-radius: 0.170667rem /* 8/46.875 */;
      &:first-child {
        color: #000;
        background-color: #fff;
      }
    }
  }
}
</style>
