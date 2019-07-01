<template>
  <div class="add">
    <x-header title="添加商品"></x-header>
    <van-cell-group>
      <van-cell title="商品类型">{{$route.query.desc}}</van-cell>
      <van-cell title="交易类型" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="param.type2" :options="typeOptions"/>
        </van-dropdown-menu>
      </van-cell>
      <van-cell title="Game" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="param.game_id" :options="gamesOptions" @change="loadServer"/>
        </van-dropdown-menu>
      </van-cell>
      <van-cell title="Server" is-link v-show="param.game_id != 0" @click="show=true">
        {{ serverName }}
      </van-cell>
    </van-cell-group>
    <x-cell-group :footer-title="'您当前商品成交后，所需服务费为' + formatMoney(serviceFee) + '元'" title="基本信息">
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
      <uploader title="商品效果图" v-model="param.images" :limit="15"></uploader>
    </x-cell-group>

    <label for="weuiAgree" class="weui-agree">
      <input id="weuiAgree" type="checkbox" v-model="isagree" checked class="weui-agree__checkbox">
      <span class="weui-agree__text">
        我同意
        <a @click="showAgree" href="javascript:void(0)">《商品寄售服务协议》</a>
      </span>
    </label>
    <agree title="商品寄售服务协议" ref="agree" :content="saleProtocol"/>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="next()">提交审核</van-button>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true" :style="{ height: '100%' }">
      <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="param.server_id"
        @itemclick="checkServer"
        @navclick="onNavClick"
      >

      </van-tree-select>
    </van-popup>
  </div>
</template>

<script>
  import XHeader from "$components/XHeader";
  import XPicker from "$components/XPicker";
  import Agree from "$components/Agree";
  import CellGroup from "vant/lib/cell-group";
  import Cell from "vant/lib/cell";
  import "vant/lib/cell/style";
  import DropdownMenu from "vant/lib/dropdown-menu";
  import "vant/lib/dropdown-menu/style";
  import DropdownItem from "vant/lib/dropdown-item";
  import "vant/lib/dropdown-item/style";
  import Button from "vant/lib/button";
  import "vant/lib/button/style";
  import XUploader from "$components/XUploader";
  import protocol from '$api/protocol'
  import XCellGroup from "$components/XCellGroup";
  import InputCell from "$components/InputCell";
  import TextCell from "$components/TextCell";
  import {mapGetters} from 'vuex'
  import Popup from 'vant/lib/popup';
  import 'vant/lib/popup/style';

  import TreeSelect from 'vant/lib/tree-select'
  import 'vant/lib/tree-select/style'
  export default {
    name: "goods-sort",
    components: {
      XHeader,
      "van-button": Button,
      "van-cell-group": CellGroup,
      "van-cell": Cell,
      "van-dropdown-menu": DropdownMenu,
      "van-dropdown-item": DropdownItem,
      [XUploader.name]: XUploader,
      Agree,
      XPicker, XCellGroup, InputCell, TextCell,
      [Popup.name]: Popup,
      [TreeSelect.name]: TreeSelect
    },
    computed: {
      ...mapGetters(['currentUser']),
      serviceFee() {
        return this.param.amount * this.currentUser.service_fee;
      },
      typeOptions() {
        return this.types[this.$route.query.id]
      },
      gamesOptions() {
        let re = []
        this.games.forEach(item => {
          re.push({text: item.name, value: item.id})
        })
        return re
      },
      hasSpec() {
        return this.spec.length > 0
      },
      items () {
        let items = []
        Object.keys(this.servers).forEach(top => {
          let item = {text: top, children: []}
          Object.keys(this.servers[top]).forEach(sec => {
            item.children.push(
              {
                id: this.servers[top][sec],
                text: sec
              }
            )
          })
          items.push(item)
        })
        return items
      }
    },
    data() {
      return {
        serverName: '点击选择',
        mainActiveIndex: 0,
        types: {
          "2": [
            {"value": "301", "text": "社群流量"},
            {"value": "300", "text": "媒体流量"},
            {"value": "302", "text": "站点流量"}
          ],
          "3": [
            {"value": "401", "text": "自媒体账号"},
            {"value": "400", "text": "网店账号"},
            {"value": "402", "text": "社交账号"},
            {"value": "403", "text": "视频账号"}
          ]
        },
        games: [],
        serversColumns: {},
        saleProtocol: '',
        param: {
          game_id: '',
          title: "",
          content: "",
          amount: "",
          store_nums: 1,
          images: [],
          server_id: 0,
          type2: '',
        },
        isagree: true,
        saving: false,
        service_fee: 0,
        game: {},
        spec: [],
        servers: [],
        show: false,
      };
    },
    created() {
      if (this.$route.query.id == undefined) {
        this.$router.back()
      }
      this.loadGame()
      this.getSaleProtocol();
    },
    methods: {
      onNavClick(index) {
        this.mainActiveIndex = index;
      },
      checkServer (data) {
        this.param.server_id = data.id
        this.show = false
        this.serverName = data.text
      },
      showAgree() {
        this.$refs.agree.show();
      },
      getSaleProtocol() {
        protocol.getProtocol('transaction').then(({data}) => {
          this.saleProtocol = data.content
        })
      },
      loadGame() {
        this.$http.get('api/v1/games', {params: {type: this.$route.query.id}}).then(({data}) => {
          this.games = data.games.data
        })
      },
      loadServer(game_id) {
        this.$http.get('api/v1/game/' + game_id).then(({data}) => {
          this.servers = data.gameServer
          this.game = data.game
          this.spec = data.spec
        })
      },
      next() {
        let params = this.param
        // 参数验证
        if (this.param.type2 == ""){
          this.$toast.fail('请选择交易类型')
          return
        }
        if (this.param.game_id == ""){
          this.$toast.fail('请选择Game')
          return
        }
        if (!this.isagree) {
          this.$alert("请勾选《商品寄售服务协议》");
        } else {
          if (!this.saving) {
            this.saving = true;
            this.$toast.loading({message: '商品保存中', mask: true});
            this.$http
              .post("api/v1/goods", params)
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  .add {
    /deep/ .van-cell-group {
      .van-cell__title {
        font-weight: 600;
      }

      .van-dropdown-menu {
        height: 24px;

        .van-dropdown-menu__item {
          display: inline-block;
        }

        .van-hairline--top-bottom::after {
          border-width: 0px;
        }

        .van-dropdown-menu__title::after {
          display: none;
        }

        .van-cell__title {
          text-align: left;
          font-weight: normal;
        }
      }

      .van-hairline--top-bottom::after {
        border-width: 0px;
      }

      .van-cell__value {
        color: #000;
      }

      .van-field__control {
        text-align: right;
      }

      .van-field__label {
        font-weight: 600;
      }

      .weui-uploader__title {
        color: #000;
        font-weight: 600;
      }
    }

    /deep/ .intro-cell {
      .van-cell:not(:last-child)::after {
        border: none;
      }

      .intro {
        .van-field__control {
          text-align: left;
        }
      }
    }

    .btn {
      text-align: center;

      .van-button {
        width: 90%;
        margin: 2.133333rem auto;
        background: #000;
        color: #ffffff;
      }
    }
  }
</style>


