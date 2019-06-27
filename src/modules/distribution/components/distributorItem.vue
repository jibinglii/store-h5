<template>
  <div class="item">
    <div class="img">
      <van-image slot="thumb" :src="item.avatar" fit="cover" width="100%" height="100%"></van-image>
    </div>
    <div class="info">
      <h4>{{ item.nickname }}</h4>
      <p>ID: {{ item.id }} / 分润比例: {{ item.sellers.profit_rate }}</p>
    </div>
  </div>
</template>

<script>
import Image from "vant/lib/image"
import "vant/lib/image/style"
export default {
  name: "distributorItem",
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      result: ["1", "2"]
    };
  },
  components: {
    [Image.name]: Image
  },
  methods: {
    click () {
      this.$router.push('./distributionStatus')
    }
  }
};
</script>

<style lang="scss" scoped>
.item{
  display: flex;
  background-color: white;
  padding: 10px;
  align-items: center;
  border-bottom: 1px #f2f2f2 solid;
  .img{
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .info{
    padding-left: 10px;
    h4{
      font-size: 14px;
      font-weight: 400;
    }
    p{
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
