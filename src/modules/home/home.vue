<template>
  <div class="page-home">
    <div class="user">
      <div class="logo">
        <img :src="currentUser.avatar">
      </div>
      <div class="info">
        <p>{{ currentUser.id }}</p>
        <p>{{ currentUser.username }}</p>
        <p>{{ currentUser.nickname }}</p>
      </div>
      <div>
        <button @click="logout()" v-if="isLogged">推出</button>
        <router-link :to="{ name: 'auth.login' }" tat="button" v-else><a href="javascript:void(0);">去登录</a></router-link>
      </div>
    </div>
    
    <goods-item :goods="item" v-for="item in goodsList.data" :key="item.id"></goods-item>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as services from '$modules/home/services'
import GoodsItem from '$components/goods-item'
export default {
  data () {
    return {
      goodsList: []
    }
  },
  computed: {
    ...mapGetters(['isLogged', 'currentUser'])
  },
  components: {
    GoodsItem
  },
  methods: {
    ...mapActions(['logout']),
    getGoods () {
      services.goods().then(data => {
        this.goodsList = data.data.goods
      })
    }
  },
  created () {
    this.getGoods()
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
