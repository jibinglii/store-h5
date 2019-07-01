<template>
  <div>
    <x-header title="提现记录"></x-header>
    <div class="withdraw-list">
      <div class="item" v-for="item in items" :key="item.id">
        <div class="amount">
          <p class="p">{{ item.amount|formatMoney}}</p>
          <p class="time">{{ item.created_at}}</p>
        </div>
        <div class="info">
          <div class="status" v-html="item.status_label">
          </div>
        </div>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>
  </div>
</template>

<script>
  import XHeader from "$components/XHeader";
  import InfiniteLoading from "vue-infinite-loading";

  export default {
    name: "withdraw-history",
    components: {
      XHeader, InfiniteLoading
    },
    data() {
      return {
        items: [],
        page: 1
      };
    },
    created() {
    },
    methods: {
      async infiniteHandler($state) {
        let param = {
          params: {
            page: this.page,
          }
        };
        this.$http.get("api/v2/user/withdraws", param).then(({data}) => {
          if (data.withdraws.data.length > 0) {
            this.page += 1;
            this.items.push(...data.withdraws.data);
            $state.loaded();
          }
          if (data.withdraws.per_page > data.withdraws.data.length) {
            $state.complete();
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  .withdraw-list {
    background: #ffffff;
    .item {
      border-bottom: 1px #f2f2f2 solid;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .amount {
        padding-left: 15px;

        .p {
          font-size: 18px;

        }

        .time {
          font-size: 15px;
        }
      }

      .info {
        padding-right: 15px;
        font-size: 16px;
        .status {
          .text-blue {
            color: #3490dc;
          }
          .text-red {
            color: #e3342f;
          }
          .text-success {
            color: #38c172;
          }
        }
      }
    }
  }
</style>
