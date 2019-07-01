<template>
  <div class="storeManage">
    <x-header
      title="结算管理"
      url="me.me"
      right-text="提现记录"
      @click-right="$router.push({name: 'withdraw.history'})"
    ></x-header>
    <div class="store_banner">
      <div class="store_banner_t">
        <span>可提现金额</span>
        <p>
          <sup>￥</sup>
          {{ currentUser.wallet.amount|formatMoney }}
        </p>
        <van-button plain hairline type="primary" class="withdraw" @click="withdraw">申请提现</van-button>
      </div>
    </div>
    <div class="settle">
      <div class="total">
        <h6>总金额</h6>
        <span>￥{{ info.settled|formatMoney }}</span>
      </div>
      <!-- <div class="title">
        {{ currentDate }}
        <div class="select">
          <select v-model="month" @change="changeMonth">
            <option value="201906">201906</option>
            <option value="201905">201905</option>
            <option value="201904">201904</option>
          </select>
        </div>
      </div> -->
      <settle-filter @confirm="confirm"></settle-filter>
      <div class="list">
        <distributor-status-item :item="item" v-for="item in items" :key="item.id"></distributor-status-item>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" spinner="spiral">
          <div slot="no-more">没有更多数据啦...</div>
          <div slot="no-results">没有数据</div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import distributorStatusItem from "./components/distributorStatusItem";
import XHeader from "$components/XHeader";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import SettleFilter from './components/SettleFilter'
export default {
  name: "settleManage",
  components: {
    XHeader,
    "van-button": Button,
    "distributor-status-item": distributorStatusItem,
    InfiniteLoading,
    SettleFilter
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  data() {
    return {
      info: {},
      items: [],
      page: 1,
      currentDate: "",
      month: "",
      infiniteId: +new Date()
    };
  },
  created() {
    this.getInfo();
    this.$store.dispatch("loadUser");
  },
  methods: {
    confirm (date) {
      this.month = date
      this.changeMonth()
    },
    changeMonth() {
      this.items = [];
      this.page = 1;
      this.infiniteId += 1;
    },
    withdraw() {
      this.$router.push({
        name: "withdraw.withdraw"
      });
    },
    async getInfo() {
      await this.$http.get("api/v2/user/settles/total").then(({ data }) => {
        this.info = data;
      });
    },
    async infiniteHandler($state) {
      let param = {
        params: {
          month: this.month,
          page: this.page,
          include: "order"
        },
        headers: {
          "X-Store-Id": ""
        }
      };
      this.$http.get("api/v2/user/settles", param).then(({ data }) => {
        if (data.settles.data.length > 0) {
          this.page += 1;
          this.items.push(...data.settles.data);
          $state.loaded();
        }
        if (data.settles.per_page > data.settles.data.length) {
          $state.complete();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.storeManage {
  .right-box {
    display: none;
  }
  .store_banner {
    width: 100%;
    background-image: url(../../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #ffffff;
    .store_banner_t {
      line-height: 1.4;
      padding: 0.426667rem 0;
      span {
        font-size: 0.7rem;
        color: #b7b7b7;
      }
      p {
        font-size: 1.408rem;
        sup {
          font-size: 0.597333rem;
          font-weight: 400;
        }
      }
      .withdraw {
        height: 1.493333rem;
        line-height: 1.493333rem;
        border: solid 1px #b7b7b7;
        background-color: transparent;
        font-size: 0.512rem;
        margin: 0.426667rem 0 0.853333rem;
        border-radius: 0.213333rem;
      }
    }
  }
}
.settle {
  .total {
    background-color: white;
    margin: 0 0 5px 0;
    padding: 10px 15px;
    h6 {
      font-size: 12px;
      font-weight: 200;
      padding-left: 4px;
    }
    span {
      color: #ff0000;
    }
  }
}
.title {
  background-color: white;
  padding: 10px 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .select {
    select {
      padding: 10px;
      border: solid 1px #f2f2f2;
      outline: none;
    }
  }
}
</style>
