<template>
  <nav-bar
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    left-arrow
    @click-left="back"
    @click-right="onClickRight"
    :style="{backgroundColor: backColor, color: color, borderBottom: '1px solid ' + underlineColor}"
  >
    <div slot="right">
      <slot name="right"></slot>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'vant/lib/nav-bar'
import 'vant/lib/nav-bar/style'
export default {
  name: 'x-header',
  components: {
    NavBar
  },
  props: {
    title: {
      type: String
    },
    url: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    backColor: {
      type: String,
      default: '#ffffff'
    },
    color: {
      type: String,
      default: '#020202'
    },
    underlineColor: {
      type: String,
      default: '#ededed'
    }
  },
  methods: {
    back() {
      if (this.url == '') {
        this.$router.back()
      } else {
        this.$router.push({ name: this.url })
      }
    },
    onClickRight () {
      this.$emit('click-right')
    }
  },
  mounted() {
    window.document.title = this.title
  }
}
</script>

<style lang="scss">
.van-nav-bar .van-icon{
  color: #020202;
}
</style>
