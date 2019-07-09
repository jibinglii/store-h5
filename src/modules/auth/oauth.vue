<template>
  <div class="oauth">
    <x-header title="绑定用户" :allow-back="false"></x-header>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="手机号"
        type="tel"
        placeholder="请输入手机号码"
      />

      <van-field
        v-model="code"
        type="number"
        label="验证码"
        placeholder="请输入验证码"
        required
      >
      <van-button slot="button" size="small" type="primary"
      @click="getCode()"
      :disabled="vCodeButtonDisabled"
      >{{ vCodeLabel }}</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" size="large" @click="loginByCode">绑 定</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from 'vant/lib/cell-group'
import Button from 'vant/lib/button'
import Field from 'vant/lib/field'
import 'vant/lib/cell-group/style'
import 'vant/lib/field/style'
import 'vant/lib/button/style'

import { mapActions } from "vuex";

import Tcaptcha from "$utils/tcaptcha";

export default {
  components: {
    XHeader,
    'van-cell-group': CellGroup,
    'van-field': Field,
    'van-button': Button
  },
  data () {
    return {
      oauth_id: '',
      username: '17693355155',
      code: '',
      appid: "2056057733",
      vCount: null,
      defaultCodeSecond: 60,
      vCodeSecond: 60,
      vCodeLabel: "获取验证码",
      vCodeButtonDisabled: false
    }
  },
  created () {
    this.oauth_id = this.$route.query['oauth_id']
    if (this.$route.query['need-bind'] == undefined){
      let token = this.$route.query['token']
      if (undefined == token || token == ''){
        this.$toast.fail('登录失败，请重试')
        this.$router.push({'name': 'auth.login'})
      } else {
        this.$store.dispatch('setToken', token)
        this.$store.dispatch('loadUser')
        this.$router.push({'name': 'me.me'})
      }
    }
  },
  methods: {
    ...mapActions(["attemptLoginByCode"]),
    async loginByCode() {
      if (this.username == "") {
        this.$toast("请填写手机号码");
        return;
      }
      if (this.code == "") {
        this.$toast("请输入验证码");
        return;
      }
      const { username, code, oauth_id } = this;
      try {
        this.$toast.loading('登录中...');
        await this.attemptLoginByCode({ username, code, oauth_id })
        this.loginSuccess()
      } catch (e) {
        console.log(e)
      }
    },
    loginSuccess () {
      let redirect = this.$route.query['redirect']
      if(redirect != '' && redirect != undefined) {
        redirect = decodeURIComponent(redirect)
        location.replace(redirect);
      } else {
        this.$router.push({ name: 'home', params: {store: window.STORE_ID} })
      }
      this.$toast.success('欢迎回来~')
    },
    getCode() {
      if (this.username == "") {
        this.$toast.fail("请填写手机号");
        return;
      }
      let captcha1 = new TencentCaptcha(this.appid, res => {
        if (res.ret == 0) {
          this.$http
            .post("api/v1/tcatpcha", {
              ticket: res.ticket,
              randstr: res.randstr,
              mobile: this.username
            })
            .then(({ data }) => {
              this.code = data.code;
              this.$toast.success("验证发送成功");
              this.vCount = setInterval(this.countDown, 1000);
            })
            .catch(fail => {
              this.$toast.fail(fail.response.message);
            });
        }
      });
      captcha1.show();
    },
    countDown() {
      if (this.vCodeSecond === 0) {
        this.vCodeLabel = "重新获取";
        this.vCodeSecond = this.defaultCodeSecond;
        this.vCodeButtonDisabled = false;
        clearInterval(this.vCount);
      } else {
        this.vCodeButtonDisabled = true;
        this.vCodeLabel = this.vCodeSecond + " s";
        this.vCodeSecond = this.vCodeSecond - 1;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.oauth{
  .van-button--primary{
    background-color: #020202;
    border: none;
  }
}
.btn{
  padding: 15px;
}
</style>

