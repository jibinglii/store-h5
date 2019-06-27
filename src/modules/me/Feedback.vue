<template>
  <div class='feedback'>
    <x-header title="意见反馈"></x-header>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea
            class="weui-textarea"
            placeholder="请输入您的意见或建议"
            rows="3"
            v-model="param.content"
          ></textarea>
          <div class="weui-textarea-counter"><span>{{len}}</span>/200</div>
        </div>
      </div>
    </div>
    <div
      class="op"
      @click="next()"
    >
      <button
        type="primary"
        text="提交"
      >提交反馈</button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import XHeader from "$components/XHeader";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader
  },
  data() {
    //这里存放数据
    return {
      param: {
        content: '',
      }
    };
  },
  //监听属性 类似于data概念
  computed: {
    len () {
      return this.param.content.length || 0
    }
  },
  //监控data中的数据变化
  watch: {
    'param.content' (val) {
      if (val.length > 200) {
        this.$toast('最多输入200个字符')
        this.param.content = val.substr(0, 200)
      }
    }
  },
  //方法集合
  methods: {
    next() {
      if (this.param.content == '') {
        this.$alert('请填写反馈内容');
        return false;
      }
      if (this.param.content.length < 20) {
        this.$alert('反馈内容不少于20个字');
        return false;
      }
      this.$http.post('api/v1/feedback', { 'content': this.param.content }).then(({data}) => {
          this.$toast('你的反馈已提交, 感谢您的帮助')
          this.$router.back()
          // window.soogua.postMessage(JSON.stringify({ "action": "close" }))
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.op {
  width: 100%;
  text-align: center;
  padding-top: 15px;
  button {
    font-size: 16px;
    text-align: center;
    background-color: #000000;
    color: #ffffff;
    width: 95%;
    height: 45px;
    line-height: 45px;
    border: none;
  }
}
</style>
