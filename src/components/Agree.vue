<template>
    <div>
        <van-popup v-model="isShow" position="bottom" :overlay="false">
        <div class="xy-box">
            <div class="xy-title">
            {{title}}
            </div>
            <div class="xy-content" v-html="content">

            </div>
        </div>
        </van-popup>
        <div v-if="isShow" class="pop-close" @click="hide">关闭</div>
    </div>
</template>

<script>
import Popup from 'vant/lib/popup';
import 'vant/lib/popup/style';

export default {
    components: {
        'van-popup': Popup
    },
    props: {
        title: {
            type: String,
            default: '协议'
        },
        content: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            isShow: false
        }
    },
    methods: {
        show () {
            this.isShow = true
        },
        hide () {
            this.isShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
.xy-box{
  position: relative;
  line-height: 180%;

  .xy-title{
    font-size: 18px;
    font-weight: bold;
    line-height: 60px;
    border-bottom: solid 1px #f2f2f2;
    margin-bottom: 10px;
    text-align: center;
  }
  .xy-content{
    padding:20px;
    margin-bottom:60px;
    font-size: 15px;
  }
}

.pop-close{
  position: fixed;
  z-index: 9999;
  bottom:0;
//   left:5%;
  width: 100%;
  height: 50px;
  line-height:50px;
  background-color: white;
//   border:solid 1px #f2f2f2;
  text-align: center;
  font-size: 16px;
  color: #020202;
  border-top: 1px solid #f2f2f2;
}
</style>
