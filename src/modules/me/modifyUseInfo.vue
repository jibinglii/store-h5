<template>
  <div class="accountSet">
    <x-header
      title="编辑资料"
      back-url="me.me"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>
    <van-cell-group>
      <van-field v-model="useName" label="昵称" type="text" input-align="right" placeholder="请输入昵称"/>
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="signature"
        type="textarea"
        label="个性签名"
        autosize
        input-align="right"
        placeholder="请编辑个性签名"
        class="signature"
      />
      <span class="limit">0/30</span>
    </van-cell-group>
    <van-cell-group class="camera">
      <van-cell title="头像" size="large" label/>
      <van-uploader :before-read="beforeRead" v-model="fileList" :max-count="1">
        <img :src="defaultImg" alt class="defaultImg">
      </van-uploader>
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" hairline size="large">保存</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
export default {
  name: "",
  components: {
    XHeader
  },
  data() {
    return {
      useName: "嗯哼",
      signature: "",
      fileList: [],
      defaultImg: require('../../assets/images/add.png')
    };
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      console.log(file)
      return true;
    }

  }
};
</script>

<style lang="scss">
.accountSet {
  .right-box {
    display: none;
  }
  .van-cell-group {
    .van-field__label{
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
  .camera {
    .defaultImg {
      width: 2.773333rem;
      padding: 0 0.64rem 0.64rem;
    }
    .van-cell:not(:last-child)::after {
      border: none;
    }
    .van-uploader{
      padding: .426667rem;
    }
  }
  .van-cell {
    padding: 0.426667rem 0.64rem;
    .van-cell__title {
      span {
        font-size: 0.682667rem;
        font-weight: 600;
      }
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
}
</style>
