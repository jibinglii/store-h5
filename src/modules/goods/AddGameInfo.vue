<template>
  <div class="page-box">
    <x-header title="添加商品信息"></x-header>
    <div class="tips">
      <i class="weui-icon-warn"></i>
      客服不会通过其他方式索要账号和密码
    </div>

    <x-cell-group class="first-group">
      <info-cell title="商品类别">{{ serverName }}</info-cell>
    </x-cell-group>

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
    name: "add-game-info",
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
        serverName: "...",
        param: {
          title: "Test",
          content: "Test",
          game_id: this.$route.params.id,
          amount: "5",
          store_nums: 1,
          images: ['https://aixuexue-back.oss-cn-beijing.aliyuncs.com/20190523/722a5a8732820bf4/df7de331dbfa9b17.jpeg'],
          server_id: 0,
          type2: 0,
          device: 0
        },
        hasSpec: 0,
        isagree: true,
        saving: false,
        saleProtocol: '',
        service_fee: 0
      };
    },

    computed: {
      ...mapGetters(['currentUser']),
      serviceFee() {
        return this.param.amount * this.currentUser.service_fee;
      }
    },
    mounted() {
      this.initParam();
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
            this.$http
              .post("api/v1/goods", this.param)
              .then(response => {
                this.saving = false;
                this.$toast.clear()
                if (this.hasSpec) {
                  let uuid = response.data.uuid;
                  this.$router.replace({
                    name: 'goods.add.game.spec',
                    params: {id: this.param.game_id},
                    query: {
                      id: uuid,
                      server_name: this.serverName
                    }
                  })
                } else {
                  this.$router.replace({
                    name: 'result',
                    params: {
                      'status': 2
                    }
                  })
                }
              })
              .catch(fail => {
                this.$alert(fail.response.data.message);
                this.saving = false;
                this.$toast.clear()
              });
          }

        }
      },
      initParam() {
        this.serverName = this.getQueryString("server_name");
        this.param.server_id = this.getQueryString("server_id");
        this.param.type2 = this.getQueryString("type");
        this.param.device = this.getQueryString("device");
        this.hasSpec = this.getQueryString("spec");
      },
      showAgree() {
        this.$refs.agree.show();
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    font-size: 0.6rem;
    color: #888;
  }
</style>
