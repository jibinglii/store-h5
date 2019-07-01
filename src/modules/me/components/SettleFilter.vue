<template>
  <div class="settle-filter">
    <div class="label">
      <label class="title">{{datelabel}}</label>
    </div>
    <div class="select" @click="show=!show">
      <i class="iconfont icon-date"></i>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate1"
        type="year-month"
        :max-date="new Date()"
        :formatter="formatter"
        @confirm="confirm"
        @cancel="show=false"
      />
    </van-popup>
  </div>
</template>

<script>
  import Popup from 'vant/lib/popup'
  import DatetimePicker from 'vant/lib/datetime-picker'
  import 'vant/lib/popup/style'
  import 'vant/lib/datetime-picker/style'

  export default {
    name: "settle-filter",
    components: {
      [Popup.name]: Popup,
      [DatetimePicker.name]: DatetimePicker,
    },
    data() {
      return {
        show: false,
        currentDate1: new Date(),
        currentDate: new Date(),
      }
    },
    computed: {
      datelabel () {
        return this.dateFormat(this.currentDate, 'YYYY年MM月')
      }
    },
    methods: {
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      confirm(value) {
        this.currentDate = value
        this.$emit('confirm', this.dateFormat(value, 'YYYYMM'))
        this.show = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settle-filter {
    height: 2rem;
    width: 100%;
    /*border: 1px dashed red;*/
    /*box-sizing: border-box;*/
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    background-color: white;
    justify-content: space-between;

    .label {
      padding-left: 15px;

      .title {
        font-size: 16px;
      }
    }

    .select {
      width: 2rem;
      text-align: center;
    }
  }
</style>
