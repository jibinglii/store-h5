<template>
  <div>
    <x-header title="添加广告" back-url="ad.list">
    </x-header>
    <x-cell-group>
      <input-cell type="text" v-model="title" title="标题" placeholder="请输入标题" />
      <text-cell v-model="content" placeholder="在这里输入您的广告内容" rows="2"/>

    </x-cell-group>

    <x-cell-group footer-title="请上传优质图片，图片将在店铺首页顶部区域显示，建议分辨率 750x375" footer-title-size="12px">
      <input-cell type="text" v-model="url" title="跳转地址" placeholder="请输入广告点击跳转地址" />
      <x-uploader title="广告效果图" v-model="nimg" :limit="1"></x-uploader>
    </x-cell-group>
    <div class="op" @click="save()">
      <x-button type="primary" text="保 存"></x-button>
    </div>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import XCellGroup from '$components/XCellGroup'
import InputCell from '$components/InputCell'
import TextCell from '$components/TextCell'
import XUploader from '$components/XUploader'
import XButton from '$components/XButton'

export default {
  name: 'ads-add',
  components: {
    XHeader, XCellGroup, InputCell, TextCell, XUploader, XButton
  },
  data () {
    return {
      title:'',
      content: '',
      nimg: [],
      url: ''
    }
  },
  created () {

  },
  methods: {
    save () {
      this.$toast.loading({mask: true})
      const {title, content, nimg, url} = this
      let img = nimg[0]

      this.$http.post('api/v2/store/ads', {title, content, img, url}).then(data => {
        this.$toast.success('保存成功')
        this.$router.push({name: 'ad.list'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.op {
  padding: 20px 20px;
}
</style>
