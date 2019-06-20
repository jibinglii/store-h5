<template>
  <div class="page-home">
    <div class="user">
      <div class="store" style="display: flex;">
        <img :src="store.logo" alt="">
        <div>
          <h1>{{ store.name }}</h1>
          <address>{{ store.desc }}</address>
        </div>
      </div>
      <div>
        <button @click="logout()" v-if="isLogged">推出</button>
        <router-link :to="{ name: 'auth.login' }" tat="button" v-else><a href="javascript:void(0);">去登录</a></router-link>
      </div>
    </div>
    <div class="goods">
      <div class="goods-item" v-for="item in goodsList" :key="item.uuid">
        <h1>{{ item.title }}</h1>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as services from '$modules/home/services'
import Tab from '$components/Tab'

export default {
  data () {
    return {
      goodsList: []
    }
  },
  computed: {
    ...mapGetters(['isLogged', 'currentUser', 'store'])
  },
  components: {
    Tab
  },
  methods: {
    ...mapActions(['logout']),
    getGoods () {
      services.goods().then(({data}) => {
        this.goodsList = data.goods.data
      })
    }
  },
  created () {
    this.getGoods()
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.user {
  display: flex !important;
  justify-content: space-evenly;
  align-items: center;
  border: 1px dashed red;
  box-sizing: border-box;
  .logo {
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

  }
}
</style>
