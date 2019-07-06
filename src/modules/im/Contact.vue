<template>
  <keep-alive>
    <div>
      <x-header :title="title"></x-header>
      <div class="msg" id="msg">
        <div
          class="msg-item"
          v-for="(item, index) in messages"
          :class="{'out': item.from == currentUser.id}"
          :key="item.id"
          v-if="item.data != ''"
        >
          <div class="logo">
            <img :src="currentUser.avatar" alt v-if="item.from == currentUser.id" />
            <img :src="currentStore.logo" alt v-else />
          </div>
          <div class="text">{{ item.data }}</div>
        </div>
      </div>
      <div class="fixed-bottom">
        <div class="input-box">
          <input type="text" @blur.prevent="loseFocus" @focus.prevent="getFocus" class="message" v-model="msg" />
          <div class="btn">
            <a @click="send">发送</a>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import XHeader from "$components/XHeader";
import { mapGetters } from "vuex";
import ImHistory from "$utils/im_history";

const WebIM = require("easemob-websdk");
import WebIMConfig from "./WebIMConfig";

export default {
  name: "contact",
  components: {
    XHeader
  },
  data() {
    return {
      title: "与【" + this.$currentStore().name + "】对话",
      messages: [],
      conn: {},
      msg: ""
    };
  },
  computed: {
    ...mapGetters(["currentStore", "currentUser"])
  },
  ready(){
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.$toast.loading({ mask: true });
    this.$store.dispatch("hasNewMsg", false);
    ImHistory.init(this.currentStore.hash_id+':'+this.currentUser.id);
  },
  mounted() {
    WebIM.config = WebIMConfig;
    this.conn = WebIM.conn = new WebIM.default.connection({
      appKey: WebIM.config.appkey,
      isHttpDNS: WebIM.config.isHttpDNS,
      isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
      host: WebIM.config.Host,
      https: WebIM.config.https,
      url: WebIM.config.xmppURL,
      apiUrl: WebIM.config.apiURL,
      isAutoLogin: false,
      heartBeatWait: WebIM.config.heartBeatWait,
      autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
      autoReconnectInterval: WebIM.config.autoReconnectInterval,
      isStropheLog: WebIM.config.isStropheLog,
      delivery: WebIM.config.delivery
    });
    this.conn.listen({
      onOpened: this.opened,
      onClosed: function(message) {
        console.log("onclose:" + message);
        console.log(error);
      }, //连接关闭回调
      onTextMessage: this.onTextMessage,
      onError: function(message) {
        console.log("onError: ", message);
      }
    });

    let options = {
      apiUrl: WebIM.config.apiURL,
      user: this.currentUser.easemob.user_id,
      pwd: this.currentUser.easemob.password,
      appKey: WebIM.config.appkey
    };
    this.conn.open(options);
    setTimeout(() => {
      this.$toast.clear();
    }, 300);

    // 加载历史消息
    ImHistory.fetchMessage("chat").then(res => {
      this.messages = res;
    });
  },
  methods: {
    onTextMessage(message) {
      this.$store.dispatch("hasNewMsg", true);
      let mmsg = {
        id: message.id,
        from: message.from,
        to: message.to,
        type: "chat",
        data: message.data,
        time: new Date().toLocaleString()
      };
      this.messages.push(mmsg);
      ImHistory.addMessage(mmsg);
      this.$nextTick(() => {
        var div = document.getElementById("msg")
        div.scrollTop = div.scrollHeight
      })
    },
    opened(message) {
      var myDate = new Date().toLocaleString();
      console.log("%c [opened] 连接已成功建立", "color: green");
      console.log(myDate);
    },
    send() {
      if (this.msg != ''){
        let id = this.conn.getUniqueId(); // 生成本地消息id
        let msg = new WebIM.default.message("txt", id); // 创建文本消息
        msg.set({
          msg: this.msg, // 消息内容
          to: this.currentStore.user_id + "",
          ext: {
            time: new Date().toLocaleString()
          },
          success: function(id, serverMsgId) {},
          fail: function(e) {}
        });
        msg.body.chatType = "singleChat";
        this.conn.send(msg.body);
        this.msg = "";
        let mmsg = {
          id: msg.body.id,
          from: this.currentUser.id,
          to: msg.body.to,
          type: "chat",
          data: msg.body.msg,
          time: new Date().toLocaleString()
        };
        this.messages.push(mmsg);
        ImHistory.addMessage(mmsg);
        this.$nextTick(() => {
          var div = document.getElementById("msg")
          div.scrollTop = div.scrollHeight
        })
      }
    },
    loseFocus(){
      setTimeout(()=>{
        window.scrollTo(0, this.scrollHeight);
      },150)
    },
    getFocus() {
      setTimeout(()=>{
        window.scrollTo(0, document.body.scrollHeight);
      }, 150);
    },
    handleScroll(){
      this.scrollHeight=window.scrollY;
    },
  },
  beforeDestroy() {
    // this.conn.close()
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  right: 0;
}

$logo-width: 36px;
.msg {
  padding: 10px 0 55px 0;
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  .msg-item {
    display: flex;
    padding: 0px 8px;
    margin-bottom: 10px;

    .logo {
      img {
        width: $logo-width;
        height: $logo-width;
        border-radius: 5px;
      }
    }

    .text {
      position: relative;
      height: fit-content;
      font-size: 0.8rem;
      padding: 8px;
      border-radius: 5px;
      margin: 0 20px 0 8px;
      background-color: white;

      &::after {
        position: absolute;
        left: -12px;
        top: 10px;
        content: "";
        border-top: 6px transparent dashed;
        border-left: 6px transparent dashed;
        border-bottom: 6px transparent dashed;
        border-right: 6px #ffffff solid;
      }
    }

    &.out {
      flex-direction: row-reverse;
      .text {
        position: relative;
        margin: 0 8px 0 20px;
        background-color: #00e600;

        &::after {
          position: absolute;
          right: -12px;
          top: 10px;
          left:unset;
          content: "";
          border-top: 6px transparent dashed;
          border-right: 6px transparent dashed;
          border-bottom: 6px transparent dashed;
          border-left: 6px #00e600 solid;
        }
      }
    }
  }
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  .input-box {
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px #f1f1f1 solid;
    background-color: white;
    justify-content: center;
    align-items: center;

    .message {
      flex: 9;
      border: 1px #f2f2f2 solid;
      height: 36px;
      font-size:.8rem;
      padding: 0 5px;
      border-radius: 5px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-appearance: none;
      margin: 0 5px;
    }

    .btn {
      flex: 2;
      display: inline-flex;
      justify-content: center;

      a {
        height: 36px;
        border-radius: 5px;
        background-color: forestgreen;
        padding: 0 10px;
        color: white;
        line-height: 36px;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
