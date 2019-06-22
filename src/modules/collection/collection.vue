<template>
  <div class="collection">
    <van-nav-bar
      title="我的收藏"
      fixed
      :right-text="manageText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-checkbox-group class="container" v-model="checkedGoods">
      <section class="card-goods" v-for="item in goods" :key="item.id">
        <v-slide :id="item.id" :disabledSlide="disabledSlide" @onDelete="onDelete">
          <section class="custom-cell" :class="slideDirection" slot="center">
            <div class="custom-checkbox">
              <van-checkbox :name="item.id"/>
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
// import { mapMutations, mapState } from 'vuex'
import NavBar from "vant/lib/nav-bar";
import Checkbox from "vant/lib/checkbox";
import CheckboxGroup from "vant/lib/checkbox-group";
import Dialog from "vant/lib/dialog";
import "vant/lib/nav-bar/style";
import "vant/lib/checkbox/style";
import "vant/lib/checkbox-group/style";
import "vant/lib/dialog/style";
import Slide from "./slide";
import GoodsCard from "./goodscard.vue";
import SelectDelete from "./selectdelete.vue";
export default {
  data() {
    return {
      goods: [
        {
          id: 1,
          title: "火影忍者超级无敌号",
          desc: "网店账号",
          price: 200,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
        },
        {
          id: 2,
          title: "火影忍者超级无敌号",
          desc: "网店账号",
          price: 690,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: 3,
          title: "火影忍者超级无敌号",
          desc: "网店账号/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        },
        {
          id: 4,
          title: "火影忍者超级无敌号",
          desc: "网店账号/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        },
        {
          id: 5,
          title: "火影忍者超级无敌号",
          desc: "网店账号/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        },
        {
          id: 6,
          title: "火影忍者超级无敌号",
          desc: "网店账号/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        },
        {
          id: 7,
          title: "火影忍者超级无敌号",
          desc: "网店账号/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        }
      ],
      checkedGoods: [],
      manageState: false,
      slideDirection: ""
    };
  },
  created() {},
  computed: {
    manageText() {
      return this.manageState ? "完成" : "管理";
    },
    disabledSlide() {
      return this.manageState;
    }
  },
  methods: {
    onClickLeft() {
      console.log("TCL: onClickLeft -> 返回");
    },
    onClickRight() {
      if (!this.goods || this.goods.length === 0) return;
      this.manageState = !this.manageState;
      this.slideDirection = this.manageState ? "slide-right" : "slide-left";
    },
    updateCheckedGoods(data) {
      this.checkedGoods = data;
    },
    oneKeyClean() {
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要一键清除商品？"
      })
        .then(() => {
          this.goods = [];
          this.checkedGoods = [];
          this.manageState = false;
          this.$toast.success("删除成功");
        })
        .catch(() => {});
    },
    onDelete(id) {
      let arr = id ? [id] : this.checkedGoods;
      if (arr.length == 0) return;
      let self = this;
      arr.some(function(item, index, array) {
        for (let i = 0; i < self.goods.length; i++) {
          let element = self.goods[i];
          if (element.id == item) {
            self.goods.splice(i, 1);
          }
        }
      });
      this.checkedGoods = [];
      if (!id) {
        this.manageState = this.manageState ? this.goods.length > 0 : false;
      }
      this.$toast.success("删除成功");
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    vSlide: Slide,
    GoodsCard,
    SelectDelete
  }
};
</script>

<style lang="scss" scoped>
.collection {
  width: 100%;
  background: #f2f2f2;
  .container {
    margin-top: 2.090667rem /* 98/46.875 */;
  }
  .card-goods:not(:first-child) {
    margin-top: 0.426667rem;
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
      width: 2.645333rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      /deep/.van-checkbox__icon {
        margin-left: 0.32rem /* 15/46.875 */;
      }
    }
  }
  .slide-right {
    transform: translate3d(2.645333rem, 0px, 0px);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }
  .slide-left {
    transform: translate3d(0px, 0px, 0px);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }
}
/deep/.van-nav-bar {
  height: 2.090667rem /* 98/46.875 */;
  line-height: 2.090667rem /* 98/46.875 */;
  border-bottom: 1px solid #ededed;
  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #000;
    font-weight: bold;
    font-size: 0.768rem; /* 36/46.875 */
    font-family: PingFang-SC-Bold;
  }
  .van-icon {
    color: #000;
  }
  .van-nav-bar__arrow {
    min-width: 1em;
    font-size: 0.554667rem /* 26/46.875 */;
  }
  .van-nav-bar__text {
    font-size: 0.554667rem /* 26/46.875 */;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #000;
  }
}
</style>
