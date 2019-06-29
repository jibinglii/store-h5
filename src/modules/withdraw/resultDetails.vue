
<template>
  <div>
    <x-header title="结果详情"></x-header>
    <van-steps direction="vertical" :active="active" active-color="#007bff">
      <van-step>
        <h3>提现申请已提交，等待银行处理</h3>
        <p>
          招商银行（5241）
          <br>
          <span>2000.00元</span>
        </p>
      </van-step>
      <van-step>
        <h3>预计24小时内到账</h3>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
import XHeader from "$components/XHeader";
import Steps from "vant/lib/steps";
import "vant/lib/steps/style";
import Step from "vant/lib/step";
import "vant/lib/step/style";
export default {
  name: "withdraw",
  components: {
    XHeader,
    "van-steps": Steps,
    "van-step": Step
  },
  data() {
    return {
      active: 1
    };
  }
};
</script>
<style lang="scss" scoped>
/deep/.van-steps {
  .van-icon-checked:before {
    color: #007bff;
    font-size: 0.853333rem;
  }
  .van-step__title {
    h3{
      font-size: .682667rem;
      color: #000;
    }
    p{
      font-size: .554667rem;
      color:#999;
      padding-top: .64rem;
    }
  }
  .van-step--vertical{
    padding: .426667rem .426667rem .426667rem 0;
    line-height: 1.6;
  }
  .van-step--finish .van-step__circle, .van-step--finish .van-step__line{
    background-color: #007bff;
  }
}
</style>
