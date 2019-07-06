<template>
  <div>
    <x-header title="选择分类" back-url="me.me"></x-header>
    <van-row class="goods-sort">
      <van-col span="12" v-for="(item) in goodSort" :key="item.id">
        <dl  @click="onClick(item)">
          <dt>
            <img :src="item.img" alt>
          </dt>
          <dd>
            {{item.title}}<br>
            <span>{{item.desc}}</span>
          </dd>
        </dl>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Row from "vant/lib/row";
import "vant/lib/row/style";
import Col from "vant/lib/col";
import "vant/lib/col/style";

export default {
  name: "goods-sort",
  components: {
    XHeader,
    "van-row":Row,
    "van-col":Col,
  },
  data() {
    return {
      goodSort: [
        {
          id: "2",
          img: require("../../assets/images/liuliang.png"),
          title: "流量",
          desc: "群、自媒体、网站流量等",
        },
        {
          id: "3",
          img: require("../../assets/images/zhanghao.png"),
          title: "账号",
          desc: "网店、自媒体、社交账号等"
        },
        {
          id: "4",
          img: require("../../assets/images/youxi.png"),
          title: "游戏",
          desc: "账号、装备、金币、材料等"
        },
        {
          id: "5",
          img: require("../../assets/images/fuwu.png"),
          title: "服务",
          desc: "代练、租号、陪玩等"
        }
      ]
    };
  },
  methods: {
    onClick(item) {
      if (_.indexOf(["4", "5"], item.id) !== -1){
        this.$router.push({
          name: "goods.add.game"
        });
      } else {
        this.$router.push({
          name: "goods.add",
          query: {
            id: item.id,
            desc: item.title
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-sort {
  padding: 0.426667rem;
  .van-col{
    &:nth-child(odd){
      padding-right: 10px;
    }
  }
  dl {
    background-color: #ffffff;
    text-align: center;
    font-size: 0.682667rem;
    padding: 1.493333rem 0;
    margin-bottom: 0.426667rem;
    dt {
      img {
        width: 2.986667rem;
      }
    }
    dd{
      font-size: 1rem;

      span{
        color:#888;
        font-size: .6rem;
      }
    }
  }
  dl:nth-child(2n) {
    margin-right: 0;
  }
}
</style>


