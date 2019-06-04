<template>
  <div class="row pt-3">
    <h4 class="text-center font-weight-normal mt-2">用户登录</h4>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label>用户名</label>
            <input type="text" class="form-control" v-model="username" required>
          </div>
          <div class="form-group">
            <label>密码</label>
            <input type="text" class="form-control" v-model="password" required>
          </div>
          <button type="submit" class="my-2 btn btn-primary w-100">登录</button>
        </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '17693355155',
      password: '123456a.'
    }
  },
  // components: {  },
  methods: {
    ...mapActions(['attemptLogin']),

    async submit () {
      const { username, password } = this

      try {
        await this.attemptLogin({ username, password })
        this.$message.success('欢迎回来~')
        this.$router.push({ name: 'home' })
      } catch (e) {
        if (e.status !== 422) {
          this.$message.error('账号密码错误！')
        }
      }
    }
  },
  created () {
  }
}
</script>
