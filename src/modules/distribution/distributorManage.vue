<template>
  <div>
    <x-header title="分销员管理">
      <div
        slot="right"
        v-if="!isAdd"
        style="color: red;"
        @click="del"
      >
        删除
      </div>
    </x-header>
    <van-cell-group>
      <van-field
        v-model="spread_id"
        label="分销员ID"
        type="text"
        input-align="right"
        placeholder="请输入分销员ID"
        autofocus
        :disabled="!isAdd"
      />
      <van-field
        v-model="profit_rate"
        label="分销佣金"
        type="number"
        input-align="right"
        placeholder="请输入分润比例"
      >
        <div slot="right-icon">%</div>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="add"
        v-if="isAdd"
      >保存</van-button>
      <van-button
        type="primary"
        hairline
        size="large"
        @click="update"
        v-else
      >保存</van-button>
    </div>
  </div>
</template>
<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button
  },
  data() {
    return {
      spread_id: "",
      profit_rate: "0.08",
      isAdd: true
    }
  },
  mounted() {
    let id = this.$route.params.id
    if (undefined != id) {
      this.isAdd = false
      this.spread_id = id
      this.profit_rate = this.$route.query['profit_rate']
    }
  },
  methods: {
    del() {
      this.$confirm({
        title: "温馨提示",
        content: "您确定要删除该分销员吗？",
        yesText: "否",
        yesStyle: { overflow: "inherit" },
        noText: "是",
        noStyle: { overflow: "inherit" }
      })
        .then(() => { })
        .catch(() => {
          const { spread_id } = this
          this.$toast.loading({ mask: true })
          this.$http.post('api/v2/store/sellers/destroy', { spread_id }).then(({ data }) => {
            this.$toast.clear()
            this.$router.back()
          })
        });
    },
    update() {
      const { spread_id, profit_rate } = this
      this.$toast.loading({ mask: true })
      this.$http.post('api/v2/store/sellers/update', { spread_id, profit_rate }).then(({ data }) => {
        this.$toast.clear()
        this.$router.back()
      })
    },
    add() {
      const { spread_id, profit_rate } = this
      this.$toast.loading({ mask: true })
      this.$http.post('api/v2/store/sellers/add', { spread_id, profit_rate }).then(({ data }) => {
        this.$toast.clear()
        this.$router.back()
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  text-align: center;
  .van-button {
    width: 90%;
    margin: 1rem auto;
    background: #000;
    color: #ffffff;
  }
}
</style>
