<template>
  <div class="page-box">
    <x-header title="修改商品"></x-header>
    <div class="tips">
      <i class="weui-icon-warn"></i>
      客服不会通过其他方式索要账号和密码
    </div>

    <x-cell-group :footer-title="'您当前商品成交后，所需服务费为' + formatMoney(serviceFee) + '元'">
      <input-cell v-model="param.title" title="商品标题" placeholder="一句话介绍下商品吧" :maxlength="20"></input-cell>
      <input-cell
        v-model="param.amount"
        title="发布价格"
        type="number"
        placeholder="5元-100万之间"
        unit="元"
        :min="5"
        :max="1000000"
      ></input-cell>
      <input-cell
        v-model.number="param.store_nums"
        title="发布数量"
        type="number"
        placeholder="请输入数量"
        unit="件"
        :min="1"
      ></input-cell>
    </x-cell-group>

    <x-cell-group footer-title="一次最多可选15张，可以上传你认为有卖点的商品图片，请勿添加联系方式和其他平台信息，否则将导致商品下架。" footer-title-size="12px">
      <text-cell v-model="param.content" text placeholder="在这里描述您的商品" rows="5"/>
      <x-uploader title="商品效果图" v-model="param.images" :limit="15"></x-uploader>
    </x-cell-group>

    <label for="weuiAgree" class="weui-agree">
      <input id="weuiAgree" type="checkbox" v-model="isagree" checked class="weui-agree__checkbox">
      <span class="weui-agree__text">
        我同意
        <a @click="showAgree" href="javascript:void(0)">《商品寄售服务协议》</a>
      </span>
    </label>

    <agree title="商品寄售服务协议" ref="agree" :content="saleProtocol"/>

    <div class="op" @click="next()">
      <x-button type="primary" text="下一步"></x-button>
    </div>

    <div class="footer-tips">本站所有信息经过安全加密，请安心填写</div>
  </div>
</template>

<script>
  import XHeader from "$components/XHeader";
  import XCellGroup from "$components/XCellGroup";
  import InfoCell from "$components/InfoCell";
  import InputCell from "$components/InputCell";
  import TextCell from "$components/TextCell";
  import XUploader from "$components/XUploader";
  import XButton from "$components/XButton";
  import Agree from "$components/Agree";
  import protocol from '$api/protocol';
  import {mapGetters} from 'vuex'
  export default {
    components: {
      XHeader,
      XCellGroup,
      InfoCell,
      InputCell,
      TextCell,
      XUploader,
      Agree,
      XButton
    },
    data() {
      return {
        goods: {},
        isagree: true,
        saving: false,
        saleProtocol: '',
        files: [],
        param: {
          title: '',
          content: '',
          amount: 0,
          store_nums: 1,
          images: [],
        },
        service_fee: 0
      };
    },
    computed: {
      ...mapGetters(['currentUser']),
      serviceFee() {
        return this.param.amount * this.currentUser.service_fee;
      },
      hasSpec() {
        return this.goods.game.specs.length > 0
      }
    },
    created() {
      this.getGoods(this.$route.params.id);
      this.getSaleProtocol();
    },
    methods: {
      getSaleProtocol() {
        protocol.getProtocol('transaction').then(({data}) => {
          this.saleProtocol = data.content
        })
      },
      next() {
        if (!this.isagree) {
          this.$alert("请勾选《商品寄售服务协议》");
        } else {
          if (!this.saving) {
            this.saving = true;
            this.$toast.loading({message: '商品保存中', mask: true});
            this.$http.post('api/v1/goods/update/' + this.goods.uuid, this.param).then((res) => {
              this.saving = false;
              this.$toast.clear()
              if (this.hasSpec) {
                this.$router.push({
                  name: 'goods.edit.game.spec',
                  params: {id: this.goods.game_id},
                  query: {
                    id: this.goods.uuid
                  }
                })
              } else {
                this.$router.back()
              }
            }).catch(fail => {
              this.$alert(fail.response.data.message);
              this.saving = false;
              this.$toast.clear()
            });
          }
        }
      },
      async getGoods(id) {
        this.$toast.loading({mask: true})
        await this.$http.get('api/v1/goods/' + id, {
          loading: true,
          params: {include: 'game.specs'}
        }).then(({data}) => {
          this.$toast.clear()
          this.$nextTick(() => {
            let goods = data.goods;
            this.goods = goods;
            this.files = goods.images;
            this.param = {
              amount: goods.amount,
              title: goods.title,
              store_nums: goods.store_nums,
              content: goods.content,
              images: goods.images
            }
          })
        })
      },
      showAgree() {
        this.$refs.agree.show();
      }
    }
  };
</script>

<style lang="scss">
  .page-box {
    position: relative;
  }

  .tips {
    padding: .3rem 1rem;
    font-size: .65rem;
    color: #f00;
    background-color: rgb(250, 202, 202);

    i {
      font-size: .8rem;
    }
  }

  .first-group {
    .weui-cells {
      margin-top: 0;
    }
  }

  .op {
    padding: 20px 20px;
  }

  .footer-tips {
    padding: 10px;
    text-align: center;
    font-size: 0.64rem;
    color: #888;
  }
</style>
