<template>
  <div>
    <x-header title="提现记录"></x-header>
    <div class="list">
      <div v-for="item in items" :key="item.id">
        <h6>{{ item.id }}</h6>
        <p>{{ item.amount }}</p>
        <p>{{ item.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import XHeader from '$components/XHeader'
export default {
  name: 'withdraw-history',
  components:{
    XHeader
  },
  data () {
    return {
      items: []
    }
  },
  created () {
    this.$http.get('api/v2/user/withdraws').then(({data}) => {
      this.items = data.withdraws.data
    })
  },
  methods: {

  }
}
</script>

