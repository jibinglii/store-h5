<template>
  <transition name="fade">
    <div class="select-content">
      <van-checkbox name="selectall" v-model="isAllSelected">
        全选
        <i
          slot="icon"
          slot-scope="props"
          class="iconfont"
          :class="props.checked ? 'icon-check' : 'icon-radio'"
        />
      </van-checkbox>
      <section class="custom-btn">
        <van-button @click="oneKeyClean">一键清除</van-button>
        <van-button @click="onDelete">删除</van-button>
      </section>
    </div>
  </transition>
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
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      }
    };
  },
  computed: {
    isAllSelected: {
      set: function(checked) {
        this.$emit("updateCheckedGoods", checked);
      },
      get: function() {
        let sL = this.checkedGoods.length;
        return this.goodsLength <= sL;
      }
    }
  },
  methods: {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.select-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.45rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  border: 1px solid #ededed;
  /deep/.van-checkbox {
    margin-left: 0.7rem;
    .van-checkbox__icon {
      width: 0.825rem;
      height: 0.825rem;
      font-size: 0.825rem;
      line-height: 0.825rem;
    }
    .van-checkbox__label {
      font-size: 0.7rem;
      margin-left: 0.5rem;
      color: #323233;
      line-height: 0.5rem;
    }
  }

  .custom-btn {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 0.6rem;
    .van-button {
      height: 1.35rem;
      width: 3.25rem;
      line-height: 1.25rem;
      &:first-child {
        margin-right: 0.5rem;
      }
    }
    .van-button--normal {
      padding: 0;
      font-size: 0.6rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
    }
    .van-button--default {
      color: #fff;
      background-color: #000;
      border: 1px solid #000;
      border-radius: 0.2rem;
      &:first-child {
        color: #000;
        background-color: #fff;
      }
    }
  }
}
</style>
