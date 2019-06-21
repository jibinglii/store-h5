<template>
  <div class="navList">
    <ul>
      <li>
        <a href>店铺主页</a>
      </li>
      <li>
        <a href>个人中心</a>
      </li>
      <li>
        <a href>商城首页</a>
      </li>
      <div class="clearBoth"></div>
    </ul>
    <dl>
      <dt>
        <img src="../assets/images/logo.png" alt>
      </dt>
      <dd>专业虚拟商品交易平台</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "navList",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.navList {
  ul {
    text-align: center;
    width: 70%;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      position: relative;
      flex: 1;
      a {
        font-size: 0.9em;
      }
    }
    li:after {
      content: "";
      position: absolute;
      right: 0;
      top: 7px;
      width: 1px;
      height: 15px;
      border-right: 1px #000 solid;
    }
    li:last-of-type::after {
      border-right: none;
    }
  }
  dl {
    font-size: 0.4em;
    color: #999999;
    text-align: center;
    padding: 40px 0 10px;
    img {
      width: 23%;
      padding-bottom: 5px;
    }
  }
}
</style>
