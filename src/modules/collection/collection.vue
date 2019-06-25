<template>
  <div class="collection">
    <x-header title="我的收藏" :rightText="manageText" @click-right="onClickRight"></x-header>
    <van-checkbox-group class="container" v-model="checkedGoods" :max="100">
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
    <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId">
      <div slot="spinner">
        <van-loading type="spinner">加载中...</van-loading>
      </div>
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>
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
import Slide from "./components/slide";
import GoodsCard from "./components/goodscard";
import SelectDelete from "./components/selectdelete";
import InfiniteLoading from "vue-infinite-loading";
import Loading from "vant/lib/loading";
import * as service from "$modules/collection/services";
export default {
  data() {
    return {
      page: 1,
      goods: [],
      checkedGoods: [],
      manageState: false,
      slideDirection: "",
      infiniteId: +new Date()
    };
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
    infiniteHandler($state) {
      let param = {
        params: {
          page: this.page
        }
      };
      service.getCollectionGoods(param).then(({ data }) => {
        console.log("TCL: infiniteHandler -> data", data);
        if (data.data.data.length > 0) {
          this.page += 1;
          this.goods.push(...data.data.data);
          $state.loaded();
        }
        if (data.data.per_page > data.data.data.length) {
          $state.complete();
        }
      });
    },
    onClickRight() {
      if (!this.goods || this.goods.length === 0) return;
      this.manageState = !this.manageState;
      this.slideDirection = this.manageState ? "slide-right" : "slide-left";
    },
    updateCheckedGoods(checked) {
      let dt = [];
      if (checked) {
        let l = this.goods.length;
        if (l >= 100) {
          this.$toast.fail("一次最多只能删除100条");
          l = 100;
        }
        for (let i = 0; i < l; i++) {
          const e = this.goods[i];
          dt.push(e.uuid);
        }
      }
      this.checkedGoods = dt;
    },
    onReset() {
      this.page = 1;
      this.goods = [];
      this.checkedGoods = [];
      this.manageState = false;
      this.slideDirection = "";
      this.infiniteId += 1;
    },
    oneKeyClean() {
      let self = this,
        l = self.goods.length,
        msgStr = "";
      if (l >= 100) {
        l = 100;
        msgStr = "一次最多只能删除100条,";
      }
      Dialog.confirm({
        title: "温馨提示",
        message: msgStr + "您确定要一键清除商品？",
        cancelButtonText: "否",
        cancelButtonColor: "#007AFF",
        confirmButtonText: "是",
        confirmButtonColor: "#007AFF"
      })
        .then(() => {
          const cb = function() {
            self.onReset();
            self.$toast.success("删除成功");
          };
          let waitDeleteArr = [];
          let l = self.goods.length;
          l = l < 1 ? l : 1;
          for (let index = 0; index < l; index++) {
            const element = self.goods[index];
            waitDeleteArr.push(element.uuid);
          }
          self.deleteInterface(waitDeleteArr, cb);
        })
        .catch(() => {});
    },
    onDelete(id) {
      let self = this;
      let waitDeleteArr = id ? [id] : self.checkedGoods;
      if (waitDeleteArr.length == 0) return;
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
            self.onReset();
            self.$toast.success("删除成功");
          };
          self.deleteInterface(waitDeleteArr, cb);
        })
        .catch(() => {});
    },
    deleteInterface(waitDeleteArr, cb) {
      let self = this;

      if (waitDeleteArr.length === 1) {
        service
          .deleteCollectionGoods(waitDeleteArr[0])
          .then(data => {
            if (data.status == "success" && data.code == 200) {
              cb && cb();
            }
          })
          .catch(() => {
            self.$toast.fail("删除失败");
          });
      } else {
        service
          .deleteAllCollectionGoods(waitDeleteArr)
          .then(data => {
            if (data.status == "success" && data.code == 200) {
              cb && cb();
            }
          })
          .catch(() => {
            self.$toast.fail("删除失败");
          });
      }
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Loading.name]: Loading,
    vSlide: Slide,
    GoodsCard,
    SelectDelete,
    XHeader,
    InfiniteLoading
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
