<template>
    <header :style="{backgroundColor: backColor, color: color, borderBottom: '1px solid ' + underlineColor}">
        <div @click="back()" class="back-icon" v-if="allowBack">
            <i class="iconfont icon-left" :style="{color: color}"></i>
        </div>
        <h1>{{ title }}</h1>
        <div class="right-box">
            <slot name="right-btn">推广</slot>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        allowBack: {
            type: Boolean,
            default: true
        },
        title: {
            type: String
        },
        backUrl: {
            type: String,
            default: ''
        },
        backColor: {
            type: String,
            default: '#ffffff'
        },
        color: {
            type: String,
            default: '#020202'
        },
        underlineColor: {
            type: String,
            default: '#ededed'
        }
    },
    data () {
        return {
        }
    },
    methods: {
        back () {
            if (this.backUrl == ''){
                this.$router.back()
            } else {
                this.$router.push({ name: this.backUrl })
            }
        }
    },
    mounted () {
        window.document.title = this.title
    }
}
</script>

<style lang="scss">
header {
    height: 50px;
    box-sizing: border-box;
    text-align: center;
    z-index: 99;
    width: 100%;
    div.back-icon {
        width: 50px;
        height: 50px;
        display: inline-block;
        line-height: 50px;
        text-align: center;
        position: absolute;
        box-sizing: border-box;
        left: 0;
        i {
            font-size: 18px;
        }
    }
    h1 {
        display: inline-block;
        font-size: 1.125rem;
        height: 100%;
        line-height: 50px;
        margin: 0;
    }
    .right-box {
        position: absolute;
        width: 50px;
        right: 0;
        top: 0;
        height: 100%;
        text-align: center;
        line-height: 50px;
        .iconfont{
            font-size: 18px;
        }
    }
}
</style>
