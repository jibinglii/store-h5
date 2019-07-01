<template>
  <div class="page-box">
    <x-header title="添加商品"></x-header>
    <div class="tips">
      <i class="weui-icon-warn"></i>
      客服不会通过其他方式索要账号和密码
    </div>

    <x-cell-group class="first-group">
      <we-info-cell title="游戏名称" :desc="gameName"></we-info-cell>
      <x-picker :data="serversColumns" :columns="server.columns" title="所在区服" v-model="server.value"></x-picker>
    </x-cell-group>

    <x-cell-group>
      <x-checkbox title="交易类型" :data="goodsTypes" v-model="currentGoodType"></x-checkbox>
    </x-cell-group>

    <x-cell-group>
      <x-checkbox title="平台类型" :data="MobileTypes" v-model="currentMobileType"></x-checkbox>
    </x-cell-group>

    <div class="op" @click="next()">
      <x-button type="primary" text="下一步"></x-button>
    </div>
  </div>
</template>

<script>
  import XHeader from '$components/XHeader'
  import XCellGroup from '$components/XCellGroup'
  import WeInfoCell from '$components/WeInfoCell'
  import XPicker from '$components/XPicker'
  import XButton from '$components/XButton'
  import XCheckbox from './components/XCheckbox'
  import user from '$api/user'

  export default {
    name: "add-game-basic",
    components: {XHeader, XCellGroup, WeInfoCell, XPicker, XButton, XCheckbox},
    data() {
      return {
        gameId: this.$route.params.id,
        gameName: '-',
        currentGoodType: -1,
        currentMobileType: -1,
        currentServerId: null,
        currentServerName: '',
        goodsTypes: {},
        server: {
          isLoading: true,
          columns: [],
          value: {},
        },
        servers: undefined,
        serversColumns: {},
        hasSpec: 0,
        config_game: {
          "base_type": {
            "101": {"id": "101", "title": "游戏账号"},
            "100": {"id": "100", "title": "游戏币"},
            "102": {"id": "102", "title": "游戏装备"},
            "103": {"id": "103", "title": "代练"}
          },
          "ext_type": {"201": {"id": "201", "title": "材料"}, "999": {"id": "999", "title": "其他"}},
          "platform": [{"id": "0", "title": "苹果端"}, {"id": "1", "title": "安卓端"}, {"id": "2", "title": "PC端"}]
        }
      }
    },
    computed: {
      MobileTypes() {
        let temp = {};
        this.config_game.platform.forEach(item => {
          temp[item.id] = item.title
        });
        return temp
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      next() {
        let pass = true;
        let message = "";
        if (this.server.value.index == 0) {
          message = "请选择所在区服"
        } else if (this.currentGoodType == -1) {
          message = "请选择交易类型"
        } else if (this.currentMobileType == -1) {
          message = "请选择平台类型"
        }
        if (message != "") pass = false;
        if (!pass) {
          this.$alert({
            title: '提示',
            content: message
          })
        } else {
          this.currentServerId = this.servers[this.server.value.value[0]][this.server.value.value[1]];
          this.currentServerName = this.gameName + "/" + this.server.value.value[0] + "/" + this.server.value.value[1];
          this.$router.push({
            name: 'goods.add.game.info',
            params: {'id': this.gameId},
            query: {
              server_id: this.currentServerId,
              spec: this.hasSpec,
              type: this.currentGoodType,
              device: this.currentMobileType,
              server_name: this.currentServerName
            }
          })
        }
      },
      async initData() {
        await this.$http.get('/api/v1/game/' + parseInt(this.gameId), {loading: true}).then(({data}) => {
          let res = data;
          this.gameName = res.game.name;
          this.servers = res.gameServer;
          this.goodsTypes = res.game.types_label;
          if (res.spec.length > 0) this.hasSpec = 1;
        })
      },
      transformServer() {
        let top = Object.keys(this.servers);
        top.forEach((value) => {
          this.serversColumns[value] = Object.keys(this.servers[value])
        });
        this.server.columns.push({
          values: top
        });
        this.server.columns.push({
          values: this.serversColumns[top[0]]
        })
      }
    },
    watch: {
      servers(val) {
        this.transformServer()
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

  .input-cell {
    height: 50px;
    line-height: 50px;
    display: flex;
    position: relative;

    .title {
      flex: 2;
      text-align: left;
      padding-left: .75rem;
      font-size: 1rem;
      color: #020202;
      font-weight: 400;
      border-bottom: solid 1px #f2f2f2;
    }

    .content {
      flex: 8;
      text-align: right;
      padding-right: .75rem;
      font-size: .875rem;
      color: #020202;
    }
  }

  .btns {
    padding: 15px;

    li {
      float: left;
      width: 27%;
      height: 40px;
      list-style-type: none;
      line-height: 40px;
      margin: 5px 8px;
      border-radius: 5px;
      text-align: center;
      font-size: .9rem;
      color: #000;
      background-color: #fff;
      border: solid 1px #000;
    }

    .active {
      color: #fff;
      background-color: #000;
      border: solid 1px #000;
    }

    .clear {
      clear: both;
    }
  }

  .op {
    padding: 20px 20px;
  }
</style>
