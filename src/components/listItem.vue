<template>
  <div class="listItem">
    <img src="../assets/images/list_01.png" alt>
    <div class="list_bottom">
      <p>PC正版STEAM游戏，全面战争三国Total War THREE...</p>
      <span>￥579.99</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "listItem",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.listItem {
  background: #ffffff;
  width: 49%;
  float: left;
  margin: 0 0 10px 0;

  img {
    width: 100%;
  }
  .list_bottom {
    width: 90%;
    margin: auto;
  }
  p {
    height: 45px;
    line-height: 20px;
    overflow: hidden;
    font-size: 0.7em;
  }
  span {
    font-size: 0.8em;
    color: #ff0000;
    padding: 10px 0;
    font-weight: 600;
  }
}
</style>
