<template>
  <div class="goods">
    <x-header title="修改支付密码" url="me.accountsetting"></x-header>
    <x-password
      v-if="step == 1"
      v-model="oldpassword"
      title="请输入支付密码"
      info="不要使用登陆密码"
    ></x-password>
    <x-password
      v-if="step == 2"
      v-model="password"
      title="请输入新支付密码"
      info="不要使用登陆密码"
    ></x-password>
    <x-password
      v-if="step == 3"
      v-model="confirmPasswd"
      title="请再次输入新支付密码"
      info="不要使用登陆密码"
    ></x-password>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import XPassword from '$components/XPassword'
import user from '$api/user'

export default {
  components: {
    XHeader, XPassword
  },
  data() {
    return {
      oldpassword: '',
      password: '',
      step: 1,
      confirmPasswd: ''
    }
  },
  watch: {
    oldpassword(pwd) {
      if (pwd.length == 6) {
        this.$toast.loading({ mask: true, message: '验证密码中...' })
        user.veryPPwd(pwd, true).then(({ data }) => {
          // 密码输入正确，继续修改密码
          this.step = 2
        }).catch(error => {
          console.log(error)
          this.oldpassword = ''
        })
      }
    },
    password(pwd) {
      if (pwd.length == 6) {
        this.step = 3;
        this.$toast('请再次输入新支付密码')
      }
    },
    confirmPasswd(pwd) {
      if (pwd.length == 6) {
        if (this.password != pwd) {
          this.$toast('两次输入的密码不一致，请重新输入');
          this.confirmPasswd = ''
        } else {
          // 设置
          user.modifyPPwd(this.oldpassword, this.password, true).then(({ data }) => {
            this.$toast({ message: '支付密码修改成功，请使用新密码' })
            this.$router.push({ name: 'me.accountsetting' })
          }).catch(error => {
            this.$alert('设置失败，请重试');
            this.password = '';
            this.confirmPasswd = '';
            this.step = 2
          })
        }
      }
    }
  },
  methods: {

  },
  created() {
    // 先验证是否设置了支付密码
    this.$toast.loading({mask: true})
    user.getUserInfo(true).then(({ data }) => {
      this.$toast.clear()
      if (!data.user.is_set_paypasswd) {
        this.$alert('您还没有设置支付密码，点击【是】前往设置', {
          title: "温馨提示",
          btn: {
            text: '去设置',
            style: { overflow: "inherit" },
          }
        }).then(() => {
          this.$router.push({ name: 'me.set-pay-pwd' })
        });
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}
</style>
