<template>
    <x-cell :title="title" :is-link="isLink">
        <span @click="show=true">{{ currentServerName }}</span>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker show-toolbar :default-index="defaultIndex" :columns="columns" @confirm="onConfirm" @cancel="onCancel" :loading="isLoading" @change="onChange"/>
        </van-popup>
    </x-cell>
</template>

<script>
import Picker from 'vant/lib/picker';
import Popup from 'vant/lib/popup';
import 'vant/lib/picker/style';
import 'vant/lib/popup/style';
import XCell from './XCell'
export default {
  components: {
    'van-picker': Picker,
    'van-popup': Popup,
    XCell
  },
  model: {
    prop: 'value',
    event: 'confirm'
  },
  props: {
      columns: [Array, Object],
      data: [Array, Object],
      title: String|Number,
      isLink: {
          type: Boolean,
          default: true
      },
      isLoading: {
          type: Boolean,
          default: false
      },
      defaultIndex: {
          type: Number,
          default: 0
      },
      value: [String, Object, Array]
  },
  data () {
    return {
      currentServerName: '请选择',
      show: false
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$emit('open')
      }
    },
    columns(val){
      if(this.defaultIndex!=0){
        this.currentServerName = this.columns[this.defaultIndex];
      }
      this.$emit('confirm', {"value":this.currentServerName, "index":this.defaultIndex})
    }
  },
  methods: {
    onConfirm(value, index) {
      this.show=false;
      this.preview(value);
      this.$emit('confirm', {"value":value, "index":index})
    },
    onCancel() {
      this.show=false;
    },
    onChange(picker, values) {
      if(this.data != undefined){
        picker.setColumnValues(1, this.data[values[0]]);
      }
    },
    preview(value) {
      if (Array.isArray(value)) {
          this.currentServerName = value.join(' ')
      } else {
          this.currentServerName = value
      }
    }
  }
}
</script>

<style lang="scss">

</style>
