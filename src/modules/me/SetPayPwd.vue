<template>
  <div class="goods">
    <x-header title="设置支付密码"></x-header>
    <x-password
      v-if="!confirming"
      v-model="password"
      title="请输入支付密码"
      info="不要使用登陆密码"
    ></x-password>
    <x-password
      v-if="confirming"
      v-model="confirmPasswd"
      title="请再次输入支付密码"
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
      password: '',
      confirmPasswd: '',
      confirming: false
    }
  },
  created() {
    // 先验证是否设置了支付密码
    user.getUserInfo(true).then(({ data }) => {
      if (data.user.is_set_paypasswd) {
        this.$router.back()
      }
    }).catch(error => {
      this.$router.back()
    })
  },
  watch: {
    password(pwd) {
      if (pwd.length == 6) {
        this.confirming = true;
        this.$toast('请再次输入支付密码')
      }
    },
    confirmPasswd(pwd) {
      if (pwd.length == 6) {
        if (this.password != pwd) {
          this.$toast('两次输入的密码不一致，请重新输入');
          this.confirmPasswd = ''
        } else {
          // 设置
          this.$toast.loading({ mask: true })
          user.setPayPasswd(this.password, true).then(({ data }) => {
            this.$toast({ message: '设置成功' })
            let redirect = this.$route.query['redirect']
            if (redirect != '' && redirect != undefined) {
              redirect = decodeURIComponent(redirect)
              location.replace(redirect);
            } else {
              this.$router.push({name: 'me.accountsetting'})
            }
          }).catch(error => {
            this.$alert('设置失败，请重试');
            this.password = '';
            this.confirmPasswd = '';
            this.confirming = false
          })
  }
}
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}
</style>
