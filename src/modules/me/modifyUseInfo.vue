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
      <van-field
        v-model="nickname"
        label="昵称"
        type="text"
        input-align="right"
        placeholder="请输入昵称"
      />
      <van-field
        v-model="sign"
        type="textarea"
        label="个性签名"
        autosize
        input-align="right"
        placeholder="请编辑个性签名"
        class="signature"
      />
      <span class="limit">{{len}}/30</span>
    </van-cell-group>
    <van-cell-group>
      <uploader title="头像" :limit=1 v-model="avatar"></uploader>
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
import XHeader from "$components/XHeader";
import CellGroup from 'vant/lib/cell-group';
import Cell from 'vant/lib/cell';
import Button from 'vant/lib/button';
import Field from 'vant/lib/field';
import 'vant/lib/button/style';
import 'vant/lib/cell/style'
import 'vant/lib/field/style'
import XUploader from '$components/XUploader'
export default {
  components: {
    XHeader,
    'van-button': Button,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-field': Field,
    [XUploader.name]: XUploader
  },
  data(){
    return {
      nickname: this.$user().nickname,
      sign: this.$user().sign,
      avatar: [this.$user().avatar],
    }
  },
  computed: {
    len () {
      return this.sign.length || 0
    }
  },
  watch: {
    sign(val){
      if (val.length > 30) {
        this.sign = val.substr(0, 30)
      }
    }
  },
  methods: {
    submit () {
      let param = {nickname: this.nickname, sign: this.sign}
      if (this.avatar.length > 0){
        param['avatar'] = this.avatar[0]
      }

      this.$toast.loading({mask: true, message: '请稍候...'})

      this.$http.post('api/v1/user/update-user', param).then(({data})=>{
        this.$store.dispatch('loadUser')
        this.$router.back()
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.accountSet {
  .right-box {
    display: none;
  }
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
}
</style>
