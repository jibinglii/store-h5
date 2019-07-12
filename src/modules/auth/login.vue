<template>
  <div class="body">
    <x-header title="登录" back-url="home"></x-header>
    <div class="bg">
      <img :src="currentStore.logo" alt />
      <div>
        <h4>{{ currentStore.name }}</h4>
        <!--      <p>{{ currentStore.desc }}</p>-->
      </div>
    </div>
    <div class="login-box">
      <div class="item">
        <div class="icon">
          <img src="/images/shop/login/mobile.png" />
        </div>
        <input type="tel" placeholder="请输入手机号码" v-model="param.username" />
      </div>
      <div class="item" v-if="type == 'code'">
        <div class="icon">
          <img src="/images/shop/login/password.png" />
        </div>
        <input type="tel" placeholder="请输入验证码" v-model="param.code" class="code" />
        <div class="code-btn-box">
          <button
            class="code-btn"
            @click="getCode()"
            :disabled="vCodeButtonDisabled"
          >{{ vCodeLabel }}</button>
        </div>
      </div>
      <div class="item" v-else>
        <div class="icon">
          <img src="/images/shop/login/password.png" />
        </div>
        <input type="password" placeholder="请输入您的密码" v-model="param.password" />
      </div>
      <div class="tips">未注册的手机号验证后自动创建搜瓜账号</div>
      <button type="button" class="login-btn" @click="login()">登 录</button>
    </div>
    <div class="toggle" @click="toggle()">
      <a href="javascript:" v-if="type == 'code'">使用密码登录</a>
      <a href="javascript:" v-else>使用验证码登录</a>
    </div>
    <div class="socail">
      <div class="socail-channel">
        <div class="item wechat" v-show="isWechat()">
          <a href="javascript:void()" @click="wechat">
            微信快捷登录
          </a>
        </div>
        <div class="item qq" v-show="false">
          <a href="javascript:void()" @click="qq">
            QQ快捷登录
          </a>
        </div>
      </div>
    </div>
    <div class="agreement">
      <label for="weuiAgree" class="weui-agree">
        <input
          id="weuiAgree"
          type="checkbox"
          v-model="isagree"
          checked
          class="weui-agree__checkbox"
        />
        <span class="weui-agree__text">
          我已阅读并同意
          <a @click="showAgree" href="javascript:void(0)">《搜瓜用户服务协议》</a>
        </span>
      </label>
    </div>
    <agree title="商品寄售服务协议" ref="agree" :content="registerProtocol" />
    <nav-block></nav-block>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import XHeader from "$components/XHeader";
import Agree from "$components/Agree";
import Tcaptcha from "$utils/tcaptcha";
import protocol from "$api/protocol";
import Nav from "$components/Nav";
export default {
  components: {
    XHeader,
    Agree,
    "nav-block": Nav
  },
  data() {
    return {
      appid: "2056057733",
      registerProtocol: "",
      isagree: true,
      type: "code",
      param: {
        username: "",
        password: "",
        code: ""
      },
      vCount: null,
      defaultCodeSecond: 60,
      vCodeSecond: 60,
      vCodeLabel: "获取验证码",
      vCodeButtonDisabled: false
    };
  },
  computed: {
    ...mapGetters(["currentStore"])
  },
  // components: {  },
  methods: {
    ...mapActions(["attemptLogin", "attemptLoginByCode"]),
    wechat () {
      location.href = window.API_ROOT + '/api/v2/oauth/wechat/' + window.STORE_ID
    },
    qq(){
      location.href = window.API_ROOT + '/api/v2/oauth/qq/' + window.STORE_ID
    },
    getCode() {
      if (this.param.username == "") {
        this.$toast.fail("请填写手机号");
        return;
      }
      let captcha1 = new TencentCaptcha(this.appid, res => {
        if (res.ret == 0) {
          this.$http
            .post("api/v1/tcatpcha", {
              ticket: res.ticket,
              randstr: res.randstr,
              mobile: this.param.username
            })
            .then(({ data }) => {
              this.param.code = data.code;
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
    showAgree() {
      this.$refs.agree.show();
    },
    toggle() {
      if (this.type == "code") {
        this.type = "";
        location.hash = "#login";
      } else {
        this.type = "code";
        location.hash = "#code";
      }
    },
    login() {
      if (!this.isagree) {
        this.$alert("您必须同意《搜瓜用户服务协议》才能继续登录");
      } else {
        this.$toast.loading({mask: true})
        if (this.type == 'code') {
          this.loginByCode();
        } else {
          this.loginByPassword();
        }
      }
    },
    async loginByPassword() {
      if (this.param.username == "") {
        this.$toast("请填写手机号码");
        return;
      }
      if (this.param.password == "") {
        this.$toast("请输入您的密码");
        return;
      }
      const { username, password } = this.param;
      try {
        this.$toast.loading('登录中...');
        await this.attemptLogin({ username, password })
        this.loginSuccess()
      } catch (e) {
        if (e.status !== 422) {
          this.$toast.fail("账号密码错误！");
        }
      }
    },
    async loginByCode() {
      if (this.param.username == "") {
        this.$toast("请填写手机号码");
        return;
      }
      if (this.param.code == "") {
        this.$toast("请输入验证码");
        return;
      }
      const { username, code } = this.param;
      try {
        this.$toast.loading('登录中...');
        await this.attemptLoginByCode({ username, code })
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
  },
  created() {
    protocol.getProtocol("register").then(({ data }) => {
      this.registerProtocol = data.content;
    });
  }
};
</script>

<style lang="scss" scoped>
.body {
  background-color: white;
}
.bg {
  height: 10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    width: 90px;
    height: 90px;
  }
}
.login-box {
  padding: 10px 30px;
  margin-top: 10px;
  .tips {
    font-size: 12px;
    color: gray;
    padding: 3px;
  }
  .item {
    position: relative;
    height: 50px;
    margin-top: 15px;
    background: url("/images/shop/login/line.png") no-repeat;
    background-size: contain;
    background-position-y: bottom;
    display: flex;
    align-items: center;
    .icon {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 30px;
        height: auto;
      }
    }
    input {
      display: inline-flex;
      flex: 11;
      height: 50px;
      box-sizing: border-box;
      border: none;
      background: rgba(0, 0, 0, 0);
      padding-left: 10px;
      font-size: 16px;
    }
    .code-btn-box {
      position: absolute;
      right: 0;
      .code-btn {
        display: inline-block;
        width: 100%;
        background: none;
        border: none;
        padding: 5px 8px;
        box-sizing: border-box;
        background-image: url("/images/shop/login/code_btn.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 12px;
      }
    }
  }
  .login-btn {
    width: 100%;
    height: 50px;
    background: none;
    border: none;
    margin-top: 44px;
    color: white;
    background-image: url("/images/shop/login/login_btn.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.toggle {
  text-align: center;
  a {
    font-size: 14px;
    color: gray;
  }
}
.agreement {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.socail{
  width: 100%;
  .title{
    text-align: center;
    color: #999;
    font-size: 12px;
  }
  .socail-channel{
    display: block;
    justify-content: center;
    margin: 15px 0;
    .item{
      text-align: center;
      margin: 6px 0;
      padding:0px 30px;
      a{
        display: block;
        width: 100%;
        line-height:50px;
        background: #000;
        color:#fff;
        font-size:.9rem;
      }
    }

    .wechat a{
      background: #6ac57a;
    }
    .qq a{
      background: #3399ff;
    }
  }
}
</style>
