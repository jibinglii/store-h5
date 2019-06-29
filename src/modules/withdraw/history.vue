<template>
  <div>
    <x-header title="提现记录"></x-header>
    <ul class="list">
      <li v-for="item in items" :key="item.id">
        <div class="info_l">
          <p class="bankno">{{ item.bankno }}</p>
        </div>
        <div class="info_r">
          <h3>提现金额：{{ item.amount }}</h3>
          <p>提现日期：{{ item.updated_at }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
export default {
  name: "withdraw-history",
  components: {
    XHeader
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.$http.get("api/v2/user/withdraws").then(({ data }) => {
      this.items = data.withdraws.data;
      console.log(this.items);
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.list {
  background: #ffffff;
  li {
    list-style: none;
    padding: 0.853333rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px #f2f2f2;
    .bankno {
      font-size: 0.64rem;
      letter-spacing: 1px;
    }
    .info_r {
      h3 {
        font-size: 0.682667rem;
        font-weight: 500;
      }
      p {
        font-size: 0.512rem;
        color: #999;
      }
    }
  }
}
</style>
