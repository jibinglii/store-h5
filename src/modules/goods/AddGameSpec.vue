<template>
  <div class="page-box">
    <x-header title="添加商品规格"></x-header>
    <div class="tips">
      <i class="weui-icon-warn"></i>
      客服不会通过其他方式索要账号和密码
    </div>

    <x-cell-group class="first-group">
      <info-cell title="商品类别">{{ serverName }}</info-cell>
    </x-cell-group>

    <x-cell-group>
      <div v-for="item in spec" :key="item.id" class="x-cell-item">
        <input-cell :title="item.title" v-if="item.type == 'input'" v-model="specValue[item.id]"></input-cell>
        <x-spec-input v-else :data="item" v-model="specValue[item.id]"></x-spec-input>
      </div>
    </x-cell-group>

    <div class="op" @click="next()">
      <x-button type="primary" text="完成并保存"></x-button>
    </div>

    <div class="footer-tips">本站所有信息经过安全加密，请安心填写</div>
  </div>
</template>

<script>
  import XHeader from "$components/XHeader";
  import XCellGroup from "$components/XCellGroup";
  import InfoCell from "$components/InfoCell";
  import InputCell from "$components/InputCell";
  import XButton from "$components/XButton";
  import XSpecInput from "./components/XSpecInput";

  export default {
    name: "add-game-spec",
    components: {
      XHeader,
      XCellGroup,
      InfoCell,
      XButton,
      InputCell,
      XSpecInput
    },
    data() {
      return {
        gameId: this.$route.params.id,
        serverName: "...",
        saving: false,
        spec: [],
        specValue: {}
      };
    },
    computed: {},
    mounted() {
      this.initParam();
      this.initData();
    },
    methods: {
      async next() {
        if (!this.saving) {
          let param = {"spec": {}};
          this.saving = true;
          this.$toast.loading({message: "规格保存中", mask: true});
          Object.keys(this.specValue).forEach((key) => {
            if (Array.isArray(this.specValue[key])) {
              param.spec[key] = this.specValue[key].join(',')
            } else {
              param.spec[key] = this.specValue[key]
            }
          });
          await this.$http.post("api/v1/goods/" + this.uuid, param)
            .then(data => {
              this.saving = false;
              this.$toast.clear()
              this.$router.replace({
                name: 'result',
                params: {
                  'status': 2
                }
              })
            })
            .catch(response => {
              this.$alert(response.data.message);
              this.saving = false;
              this.$toast.clear();
            });
        }
      },
      initParam() {
        this.serverName = this.getQueryString("server_name");
        this.uuid = this.getQueryString("id");
      },
      async initData() {
        this.$toast.loading({mask: true, message: '规格信息加载中...'});
        await this.$http
          .get("/api/v1/game/" + this.gameId + '/spec')
          .then(({data}) => {
            this.$toast.clear()
            this.spec.push(...data.spec)
          });
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
