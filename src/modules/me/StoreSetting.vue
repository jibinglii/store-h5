<template>
  <div>
    <x-header title="店铺设置" />
    <van-cell-group>
      <van-field
        v-model="name"
        label="店铺名称"
        type="text"
        input-align="right"
        placeholder="请输入店铺名称"
        readonly
      />
      <van-field
        v-model="desc"
        type="textarea"
        label="店铺简介"
        autosize
        input-align="right"
        placeholder="请编辑店铺简介"
        class="signature"
      />
      <span class="limit">{{len}}/30</span>
    </van-cell-group>
    <van-cell-group>
      <uploader
        title="店铺 LOGO"
        :limit=1
        v-model="logo"
      ></uploader>
    </van-cell-group>
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="submit"
      >保存</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader"
import CellGroup from 'vant/lib/cell-group'
import Button from 'vant/lib/button'
import Field from 'vant/lib/field'
import 'vant/lib/button/style'
import 'vant/lib/cell/style'
import 'vant/lib/field/style'
import XUploader from '$components/XUploader'

export default {
  components: {
    XHeader,
    'van-button': Button,
    'van-cell-group': CellGroup,
    'van-field': Field,
    [XUploader.name]: XUploader
  },
  computed: {
    len () {
      return this.desc.length || 0
    }
  },
  watch: {
    desc(val){
      if (val.length > 30) {
        this.desc = val.substr(0, 30)
      }
    }
  },
  data () {
    return {
      name: this.$currentStore().name,
      desc: this.$currentStore().desc,
      logo: [this.$currentStore().logo]
    }
  },
  methods: {
    submit(){
      let param = {name: this.name, desc: this.desc}
      if (this.logo.length > 0){
        param['logo'] = this.logo[0]
      }
      this.$toast.loading({mask: true, message: '请稍候...'})
      this.$http.post('api/v2/store/update', param).then(({data})=>{
        this.$toast.success('店铺信息修改成功')
        this.$store.dispatch('storeInfo')
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  .van-field__label {
    width: 3.84rem;
  }
  span.limit {
    display: block;
    text-align: right;
    padding: 0 0.64rem 0.426667rem 0;
    font-size: 0.512rem;
    color: #999;
  }
  .signature:not(:last-child)::after {
    border: none;
  }
}
.btn {
  text-align: center;
  .van-button {
    width: 90%;
    margin: 2.133333rem auto;
    background: #000;
    color: #ffffff;
  }
}
</style>
