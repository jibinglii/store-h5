<template>
  <div class="goods">
    <x-header
      title="我的银行卡"
    />
    <div class="card-header">
      <div class="icon">
        <i
          class="iconfont"
          :class="'icon-' + item.bank"
        ></i>
      </div>
      <div class="name">
        {{item.bank_info.bankName}}
        <span v-show="item.is_default">默认</span>
      </div>
      <div class="no">{{item.bankno}}</div>
    </div>
    <x-cell-group>
      <div
        v-if="item.is_default!=1"
        @click="bind"
        class="underline"
      >
        <x-cell
          title="设为默认银行卡"
          :is-link="true"
          link="javascript:void(0)"
        ></x-cell>
      </div>
      <div @click="del">
        <x-cell
          title="解绑该银行卡"
          :is-link="true"
          link="javascript:void(0)"
        ></x-cell>
      </div>
    </x-cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCellGroup from "$components/XCellGroup";
import XCell from "$components/XCell";

export default {
  components: {
    XHeader,
    XCellGroup,
    XCell
  },
  data() {
    return {
      id: '',
      item: {
        is_default: 1,
        bank_info: {}
      }
    };
  },
  created () {
    this.id = this.$route.params.id
  },
  mounted() {
    this.getBankCard();
  },
  methods: {
    getBankCard() {
      this.$toast.loading()
      this.$http
        .get("/api/v1/bankcard/" + this.id, { loading: true })
        .then(({ data }) => {
          this.item = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    bind() {
      this.$confirm({
        title: "温馨提示",
        content: "您确定将此卡设置成默认吗？",
        yesText: "否", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "是", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      })
        .then(function () {
          console.log('cancel');
        })
        .catch(() => {
          this.$toast.loading()
          this.$http
            .put("/api/v1/bankcard/set-default/" + this.id)
            .then(({ data }) => {
              this.item.is_default = 1;
              this.$alert({
                title: "提示",
                content: "设为默认银行卡成功"
              }).then(() => {
                this.$router.back()
              });
            });
        });
    },
    del() {
      this.$confirm({
        title: "温馨提示",
        content: "您确定要解除该银行卡吗？",
        yesText: "否", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "是", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
        console.log('“cancel”');
      })
        .catch(() => {
          this.$http
            .delete("/api/v1/bankcard/" + this.id, { loading: true })
            .then(({ data }) => {
              this.$router.back()
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
}

.card-header {
  position: relative;
  background: #000 url(/images/shop/account-bg.png) no-repeat center bottom;
  background-size: 100% 100%;
  width: 100%;
  height: 200px;
  color: #fff;
  text-align: center;
  padding-top: 20px;

  .icon {
    margin: auto;
    min-height: 40px;

    i.iconfont {
      font-size: 55px;
    }
  }
  .name {
    margin: auto;
    font-size: 1.2rem;
    span {
      position: relative;
      background-color: #fff;
      color: #000;
      font-size: 0.7rem;
      padding: 0px 5px;
    }
  }
  .type {
    margin: 5px auto;
    font-size: 0.8rem;
  }
  .no {
    margin: 10px auto;
    letter-spacing: 2.5px;
  }
}

.underline {
  border-bottom: solid 1px #f2f2f2;
}
</style>
