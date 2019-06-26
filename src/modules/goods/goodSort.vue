<template>
  <div>
    <x-header title="选择分类" back-url="me.me"></x-header>
    <div class="goods-sort" >
      <dl v-for="(item) in goodSort" :key="item.id" @click="onClick()">
        <dt>
          <img :src="item.img" alt>
        </dt>
        <dd>{{item.dec}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";

export default {
  name: "goods-sort",
  components: {
    XHeader
  },
  data() {
    return {
      goodSort: [
        {
          id: "1",
          img: require("../../assets/images/liuliang.png"),
          dec: "流量"
        },
        {
          id: "2",
          img: require("../../assets/images/zhanghao.png"),
          dec: "账号"
        },
        {
          id: "3",
          img: require("../../assets/images/youxi.png"),
          dec: "游戏"
        },
        {
          id: "4",
          img: require("../../assets/images/fuwu.png"),
          dec: "服务"
        }
      ]
    };
  },
  methods: {
    onClick() {
      this.$router.push({
        name: "goods.add",
        params: {
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-sort {
  padding: 0.426667rem;
  dl {
    background-color: #ffffff;
    text-align: center;
    float: left;
    width: 49%;
    margin-right: 2%;
    font-size: 0.682667rem;
    padding: 1.493333rem 0;
    margin-bottom: 0.426667rem;
    dt {
      img {
        width: 2.986667rem;
      }
    }
  }
  dl:nth-child(2n) {
    margin-right: 0;
  }
}
</style>


