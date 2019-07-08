<template>
  <div>
    <h4>{{ $route.query['code'] }}</h4>
    <p>
      {{ $route.query['reason'] }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  components: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="scss">
</style>
