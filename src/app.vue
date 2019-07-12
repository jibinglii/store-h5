<template>
  <div>
    <router-view />
    <global-fab></global-fab>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArrowUpIcon from '$icons/ArrowUp'
import GlobalFab from '$components/GlobalFab'
export default {
  name: 'app',
  components: {
    ArrowUpIcon, GlobalFab
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
</style>
