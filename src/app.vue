<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArrowUpIcon from '$icons/ArrowUp'
export default {
  name: 'app',
  components: {
    ArrowUpIcon
  },
  computed: {

  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="scss">
body {
  background: #F2F2F2;
}
</style>
