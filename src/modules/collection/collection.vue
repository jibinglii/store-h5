<template>
  <div class="collection">
    <x-header title="我的收藏" :rightText="manageText" @click-right="onClickRight"></x-header>
    <van-checkbox-group class="container" v-model="checkedGoods">
      <section class="card-goods" v-for="(item, key) in goods" :key="key">
        <v-slide :id="item.uuid" :disabledSlide="disabledSlide" @onDelete="onDelete">
          <section class="custom-cell" :class="slideDirection" slot="center">
            <div class="custom-checkbox">
              <van-checkbox :name="item.uuid"/>
            </div>
            <goods-card :item="item"></goods-card>
          </section>
        </v-slide>
      </section>
    </van-checkbox-group>
    <select-delete
      v-if="manageState"
      :goodsLength="goods.length"
      :checkedGoods="checkedGoods"
      @updateCheckedGoods="updateCheckedGoods"
      @oneKeyClean="oneKeyClean"
      @onDelete="onDelete"
    />
  </div>
</template>

<script>
import NavBar from "vant/lib/nav-bar";
import Checkbox from "vant/lib/checkbox";
import CheckboxGroup from "vant/lib/checkbox-group";
import Dialog from "vant/lib/dialog";
import "vant/lib/nav-bar/style";
import "vant/lib/checkbox/style";
import "vant/lib/checkbox-group/style";
import "vant/lib/dialog/style";
import XHeader from "$components/XHeader";
import Slide from "./slide";
import GoodsCard from "./goodscard.vue";
import SelectDelete from "./selectdelete.vue";
import * as service from "$modules/collection/services";
export default {
  data() {
    return {
      goods: [],
      checkedGoods: [],
      manageState: false,
      slideDirection: ""
    };
  },
  created() {
    this.getCollectionGoods();
  },
  computed: {
    manageText() {
      return this.manageState ? "完成" : "管理";
    },
    disabledSlide() {
      return this.manageState;
    }
  },
  methods: {
    async getCollectionGoods() {
      service
        .getCollectionGoods()
        .then(({ data }) => {
          console.log(data.data);
          this.goods = data.data.data;
        })
        .catch(() => {});
    },
    onClickRight() {
      if (!this.goods || this.goods.length === 0) return;
      this.manageState = !this.manageState;
      this.slideDirection = this.manageState ? "slide-right" : "slide-left";
    },
    updateCheckedGoods(checked) {
      let dt = [];
      if (checked) {
        for (let i = 0, l = this.goods.length; i < l; i++) {
          const e = this.goods[i];
          dt.push(e.uuid);
        }
      }
      this.checkedGoods = dt;
    },
    oneKeyClean() {
      let self = this;
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要一键清除商品？",
        cancelButtonText: "否",
        cancelButtonColor: "#007AFF",
        confirmButtonText: "是",
        confirmButtonColor: "#007AFF"
      })
        .then(() => {
          const cb = function() {
            self.goods = [];
            self.checkedGoods = [];
            self.manageState = false;
            self.$toast.success("删除成功");
          };
          self.deleteInterface(arr, cb);
        })
        .catch(() => {});
    },
    onDelete(id) {
      let self = this;
      let arr = id ? [id] : self.checkedGoods;
      if (arr.length == 0) return;
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要取消收藏？",
        cancelButtonText: "否",
        cancelButtonColor: "#007AFF",
        confirmButtonText: "是",
        confirmButtonColor: "#007AFF"
      })
        .then(() => {
          const cb = function() {
            arr.some(function(item, index, array) {
              for (let i = 0; i < self.goods.length; i++) {
                let element = self.goods[i];
                if (element.uuid == item) {
                  self.goods.splice(i, 1);
                }
              }
            });
            self.checkedGoods = [];
            if (!id) {
              self.manageState = self.manageState
                ? self.goods.length > 0
                : false;
            }
            self.$toast.success("删除成功");
          };
          self.deleteInterface(arr, cb);
        })
        .catch(() => {});
    },
    deleteInterface(arr, cb) {
      console.log("TCL: deleteInterface -> arr", arr);
      let self = this;

      if (arr.length === 1) {
        service
          .deleteCollectionGoods(arr[0])
          .then(data => {
            if (data.status == "success" && data.code == 200) {
              cb && cb();
            }
          })
          .catch(() => {});
      } else {
        service
          .deleteAllCollectionGoods(arr)
          .then(data => {
            if (data.status == "success" && data.code == 200) {
              ca && cb();
            }
          })
          .catch(() => {});
      }
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    vSlide: Slide,
    GoodsCard,
    SelectDelete,
    XHeader
  }
};
</script>

<style lang="scss" scoped>
.collection {
  width: 100%;
  background: #f2f2f2;
  .card-goods:not(:first-child) {
    margin-top: 0.5rem;
  }
  .custom-cell {
    position: relative;
    .custom-checkbox {
      position: absolute;
      top: 0;
      left: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      height: 100%;
      line-height: 100%;
      width: 3.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      /deep/.van-checkbox__icon {
        margin-left: 0.375rem;
      }
    }
  }
  .slide-right {
    transform: translate3d(3.1rem, 0px, 0px);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }
  .slide-left {
    transform: translate3d(0px, 0px, 0px);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }
}
/deep/.van-nav-bar {
  height: 2.45rem;
  line-height: 2.45rem;
  border-bottom: 1px solid #ededed;
  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #000;
    font-weight: bold;
    font-size: 0.9rem;
    font-family: PingFang-SC-Bold;
  }
  .van-icon {
    color: #000;
  }
  .van-nav-bar__arrow {
    min-width: 1em;
    font-size: 0.65rem;
  }
  .van-nav-bar__text {
    font-size: 0.65rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #000;
  }
}
</style>
