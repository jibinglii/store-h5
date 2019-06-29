<template>
  <div class="goods">
    <x-header title="支付密码"></x-header>
    <x-password v-if="step == 1" v-model="oldpassword" title="请输入支付密码，以验证身份" info></x-password>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XPassword from "$components/XPassword";
import user from "$api/user";

export default {
  components: {
    XHeader,
    XPassword
  },
  data() {
    return {
      oldpassword: "",
      step: 1
    };
  },
  watch: {
    oldpassword(pwd) {
      if (pwd.length == 6) {
        this.$toast.loading({ mask: true, message: "验证密码中..." });
        user
          .veryPPwd(pwd, true)
          .then(({ data }) => {
            // 密码输入正确，继续修改密码
            // this.step = 2
          })
          .catch(error => {
            console.log(error);
            this.oldpassword = "";
          });
        this.$router.push({
          name: "withdraw.resultdetails"
        });
      }
    }
  },
  methods: {},
  created() {
    // 先验证是否设置了支付密码
    this.$toast.loading({ mask: true });
    user.getUserInfo(true).then(({ data }) => {
      this.$toast.clear();
      if (!data.user.is_set_paypasswd) {
        this.$alert("您还没有设置支付密码，点击【是】前往设置", {
          title: "温馨提示",
          btn: {
            text: "去设置",
            style: { overflow: "inherit" }
          }
        }).then(() => {
          this.$router.push({ name: "me.set-pay-pwd" });
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}
</style>
