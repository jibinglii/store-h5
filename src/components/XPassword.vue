<template>
  <div class="pwd-box">
    <div class="title">{{title}}</div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="showValue"
      :info="info"
      :mask="mask"
      @focus="showKeyboard = true"
    />

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import PasswordInput from 'vant/lib/password-input'
import NumberKeyBoard from 'vant/lib/number-keyboard'
import 'vant/lib/password-input/style';
import 'vant/lib/number-keyboard/style';

export default {
  components: {
    'van-password-input': PasswordInput,
    'van-number-keyboard': NumberKeyBoard
  },
  props: {
    value: String,
    title: String,
    info: String,
    mask: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'value',
    event: 'confirm'
  },
  data() {
    return {
      showKeyboard: true,
      showValue: ''
    }
  },
  watch: {
    value(val) {
      this.showValue = val
    }
  },
  methods: {
    onInput(key) {
      this.showValue = (this.showValue + key).slice(0, 6);
      this.$emit('confirm', this.showValue);
    },
    onDelete() {
      this.showValue = this.showValue.slice(0, this.showValue.length - 1);
      this.$emit('confirm', this.showValue);
    }
  }
}
</script>

<style lang="scss">
.pwd-box {
  .title {
    position: relative;
    padding: 120px 0;
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>
