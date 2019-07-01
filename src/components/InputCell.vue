<template>
  <div class="input-cell">
    <label class="title">{{ title }}</label>
    <span v-if="unit!=''">{{unit}}</span>
    <div class="content input">
      <input :type="type" :placeholder="placeholder" @input="handleInput" v-model="inputvalue"
             :maxlength="maxlength"
             :min="min" :max="max">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: [String, Boolean],
      type: {
        type: String,
        default: 'text'
      },
      unit: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入...'
      },
      value: [String, Number],
      maxlength: Number,
      min: Number,
      max: Number
    },
    data() {
      return {
        inputvalue: this.value
      }
    },
    watch: {
      value(val) {
        this.inputvalue = val
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', this.inputvalue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-cell {
    height: 50px;
    line-height: 50px;
    display: flex;
    position: relative;

    .title {
      flex: 4;
      text-align: left;
      padding-left: .75rem;
      font-size: 16px;
      color: #020202;
      font-weight: 400;
    }

    span {
      position: absolute;
      right: 8px;
      z-index: 1;
      font-size: 14px;
      font-weight: normal;
    }

    .content {
      flex: 8;
      text-align: right;
      padding-right: 1.8rem;
      font-size: 14px;
      color: #020202;

      input {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-size: 14px;
        line-height: 14px;
        text-align: right;
      }
    }

    &::after {
      content: '';
      background-color: #ededed;
      height: 1px;
      position: absolute;
      left: .75rem;
      right: 0;
      bottom: 0;
    }

    &:last-child::after {
      display: none;
    }
  }
</style>
