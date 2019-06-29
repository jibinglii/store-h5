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
      >保存
      </van-button>
      <van-button
        type="primary"
        hairline
        size="large"
        @click="update"
        v-else
      >保存
      </van-button>

      <van-cell-group title="分销商品">
        <van-swipe-cell v-for="item in sellerGoods" :key="item.uuid">
          <div class="goods">
            <div class="image">
              <img :src="item.logo" alt="">
            </div>
            <div class="info">
              <h3 class="title">{{ item.title }}</h3>
              <h6>{{ item.amount }}</h6>
              <span>分润比例：{{ item.seller.profit_rate }}</span>
            </div>
          </div>
          <div slot="right" class="btns">
            <van-button
              square
              type="danger"
              text="删除"
              @click="deleteGoods(item.uuid)"
            />
            <van-button
              square
              type="info"
              text="修改"
              @click="updateGoods(item)"
            />
          </div>

        </van-swipe-cell>
      </van-cell-group>
    </div>
    <van-action-sheet
      v-model="showUpdate"
      title="修改分润比例"
    >
      <van-cell-group>
        <van-field
          v-model="profit_rate_goods"
          type="number"
          label="推广费用比例"
          autosize
          input-align="right"
          placeholder="请编辑推广费用比例"
        />
      </van-cell-group>
      <div class="btn">
        <van-button
          type="primary"
          hairline
          size="large"
          @click="save"
        >保存</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
  import XHeader from "$components/XHeader";
  import CellGroup from "vant/lib/cell-group";
  import Field from "vant/lib/field";
  import "vant/lib/field/style";
  import Button from "vant/lib/button";
  import "vant/lib/button/style";
  import SwipeCell from 'vant/lib/swipe-cell'
  import "vant/lib/swipe-cell/style";
  import ActionSheet from 'vant/lib/action-sheet'
  import 'vant/lib/action-sheet/style'
  export default {
    components: {
      XHeader,
      "van-cell-group": CellGroup,
      "van-field": Field,
      "van-button": Button,
      'van-swipe-cell': SwipeCell,
      [ActionSheet.name]: ActionSheet,
    },
    data() {
      return {
        spread_id: "",
        profit_rate: "0.08",
        isAdd: true,
        sellerGoods: [],
        profit_rate_goods: '',
        showUpdate: false,
        current: {}
      }
    },
    mounted() {
      let id = this.$route.params.id
      if (undefined != id) {
        this.isAdd = false
        this.spread_id = id
        this.profit_rate = this.$route.query['profit_rate']
        this.getSellerGoods()
      }
      console.log(this.$refs)
    },
    methods: {
      async getSellerGoods(){
        await this.$http.get('api/v2/store/sellers/my-drp-goods/' + this.spread_id).then(({data})=>{
          this.sellerGoods = data.goods
        })
      },
      updateGoods(item){
        this.current = item
        this.profit_rate_goods = item.seller.profit_rate
        this.showUpdate = true
      },
      save(){
        this.$toast.loading({mask: true})
        this.$http.post('api/v2/store/sellers/my-drp-goods/update', {spread_id: this.spread_id, goods_id: this.current.uuid, profit_rate: this.profit_rate_goods}).then(({data}) => {
          this.$toast.clear()
          this.current = {}
          this.profit_rate_goods = ''
          this.showUpdate = false
          this.getSellerGoods()
        })
      },
      deleteGoods(uuid){
        this.$confirm({
          title: "温馨提示",
          content: "您确定要取消分销改商品吗？",
          yesText: "否",
          yesStyle: {overflow: "inherit"},
          noText: "是",
          noStyle: {overflow: "inherit"}
        })
          .then(() => {
          })
          .catch(() => {
            const {spread_id} = this
            this.$toast.loading({mask: true})
            this.$http.post('api/v2/store/sellers/my-drp-goods/delete', {spread_id, goods_id: uuid}).then(({data}) => {
              this.$toast.clear()
              this.getSellerGoods()
            })
          });
      },
      del() {
        this.$confirm({
          title: "温馨提示",
          content: "您确定要删除该分销员吗？",
          yesText: "否",
          yesStyle: {overflow: "inherit"},
          noText: "是",
          noStyle: {overflow: "inherit"}
        })
          .then(() => {
          })
          .catch(() => {
            const {spread_id} = this
            this.$toast.loading({mask: true})
            this.$http.post('api/v2/store/sellers/destroy', {spread_id}).then(({data}) => {
              this.$toast.clear()
              this.$router.back()
            })
          });
      },
      update() {
        const {spread_id, profit_rate} = this
        this.$toast.loading({mask: true})
        this.$http.post('api/v2/store/sellers/update', {spread_id, profit_rate}).then(({data}) => {
          this.$toast.clear()
          this.$router.back()
        })
      },
      add() {
        const {spread_id, profit_rate} = this
        this.$toast.loading({mask: true})
        this.$http.post('api/v2/store/sellers/add', {spread_id, profit_rate}).then(({data}) => {
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

    .van-button--primary {
      width: 90%;
      margin: 1rem auto;
      background: #000;
      color: #ffffff;
    }
  }
  .van-swipe-cell {
    border-bottom: 1px solid #f2f2f2;
    &:last-child{
      border-bottom: none;
    }
  }
  .goods{
    position: relative;
    height: 110px;
    .image{
      height: 90px;
      width: 90px;
      padding: 10px;
      position: absolute;
      left: 0;
      img{
        object-fit: cover;
        display: block;
        width: 90px;
        height: 100%;
      }
    }
    .info{
      position: absolute;left: 110px;
      text-align: left;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 100%;
      right: 10px;
      .title{
        font-size: 15px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
      }
      h6{
        font-size: 14px;
        font-weight: 400;
        color: red;
      }
      span{
        font-size: 12px;
      }
    }

  }
  .van-swipe-cell__right{
    .btns{
      height: 100%;
      line-height: 100%;
      .van-button {
        height: 100%;
        line-height: 100%;
        width: 3.1rem;
      }
      .van-button--square {
        border-radius: 0;
      }
      .van-button--normal {
        padding: 0 0.75rem;
        font-size: 0.75rem;
        line-height: 0.65rem;
      }
      .van-button--danger {
        color: #fff;
        background-color: #c22727;
        border: 1px solid #c22727;
      }
    }

  }
</style>
