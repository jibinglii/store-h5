<template>
  <div class="store">
    <x-header
      title="店铺主页"
      back-url="home"
      back-color="#ffffff"
      color="#000"
      underline-color="#f2f2f2"
    ></x-header>

    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import listItem from "$components/listItem";
import XHeader from "$components/XHeader";
export default {
  name: "store",
  data() {
    return {};
  },

  components: {
    Tab,
    listItem,
    XHeader
  }
};
</script>

<style lang="scss">
@import "../../assets/css/common.css";

.page-home {
  .top {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px #f2f2f2;
    padding: 0 10px;
    background-color: #ffffff;
    h3 {
      font-size: 1.1em;
    }
  }
}
</style>
