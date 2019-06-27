<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div class="weui-uploader__hd">
          <p class="weui-uploader__title">{{ title }}</p>
          <div class="weui-uploader__info">{{ fileList.length }}/{{ limit }}</div>
        </div>
        <div class="weui-uploader__bd">
          <div>
            <gallery
              ref="gallery"
              @delAction="delFile"
            ></gallery>
          </div>
          <ul
            class="weui-uploader__files"
            id="uploaderFiles"
          >
            <li
              @click="preview(item, index)"
              class="weui-uploader__file"
              :style="{backgroundImage:'url('+item+')'}"
              v-for="(item, index) in previews"
              :key="index"
            ></li>
          </ul>
          <div
            class="weui-uploader__input-box"
            v-if="canUpload"
          >
            <input
              id="uploaderInput"
              class="weui-uploader__input"
              type="file"
              accept="image/*"
              multiple=""
              @change="selectFile"
              :disabled="!canUpload"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SparkMD5 from 'spark-md5'
import Gallery from './Gallery'
export default {
  name: 'uploader',
  components: {
    Gallery
  },
  model: {
    prop: 'fileList',
    event: 'uploadDone'
  },
  props: {
    title: String,
    limit: {
      type: Number,
      default: 15
    },
    previews: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    canUpload () {
      return this.fileList.length < this.limit
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.previews.push(...this.fileList)
    })
  },
  watch: {
    fileList(val) {
      if (this.previews.length == 0) {
        this.previews.push(...val)
      }
    }
  },
  methods: {
    selectFile(e) {
      if (this.fileList.length >= this.limit) {
        return false;
      }
      let len = event.target.files.length;
      let canUploadSize = this.limit - this.fileList.length;
      if (len > canUploadSize) {
        len = canUploadSize
      }
      if (len > 0) {
        this.$toast.loading('正在上传...');
      }
      for (let i = 0;i < len;i++) {
        let file = event.target.files[i];
        this.addFile(file);
        this.upload(file)
      }
    },
    upload(file) {
      let param = new FormData(); //创建form对象
      this.md5(file, (err, md5) => {
        // 请求配置
        this.$http.post('api/v1/upload/policy', { filename: file.name, md5: md5 }).then(({ data }) => {
          let config = data;
          param.append('key', config.key);
          param.append('policy', config.policy);
          param.append('OSSAccessKeyId', config.OSSAccessKeyId);
          param.append('success_action_status', '200'); //让服务端返回200,不然，默认会返回204
          param.append('signature', config.signature);
          param.append('file', file, file.name);//通过append向form对象添加数据

          this.$http.post(config.server, param, { loading: false }).then((response) => {
            this.$toast.clear();
            this.fileList.push(config.site_url);
            this.$emit('uploadDone', this.fileList);
          }).catch((error => {
            this.$toast.clear();
            this.previews.pop();
            this.$toast('上传失败')
          }))
        })
      })
    },
    addFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.previews.push(e.target.result)
      }
    },
    delFile(index) {
      this.previews.splice(index, 1);
      this.fileList.splice(index, 1)
    },
    preview(item, index) {
      this.$refs.gallery.show(item, index)
    },
    md5(file, md5Fn) {
      let currentChunk = 0;
      const blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      const chunkSize = 2097152;
      const chunks = Math.ceil(file.size / chunkSize);
      const spark = new SparkMD5.ArrayBuffer();
      const reader = new FileReader();

      loadNext();

      reader.onloadend = e => {
        spark.append(e.target.result); // Append array buffer
        currentChunk++;
        if (currentChunk < chunks) {
          loadNext()
        } else {
          md5Fn(null, spark.end())
        }
      };

      /////////////////////////
      function loadNext() {
        const start = currentChunk * chunkSize;
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        reader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
    }
  }
}
</script>

<style lang="scss">
$item-size: 64px;
.weui-uploader__file,
.weui-uploader__input-box {
  width: $item-size;
  height: $item-size;
  box-sizing: border-box;
  margin-left: 5px;
  margin-right: 0;
}
.weui-uploader__title {
  font-size: 16px;
  color: #888;
}
.weui-uploader__title,.weui-uploader__info{
  font-size: 14px;
}
</style>
