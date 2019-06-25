<template>
    <div class="weui-cell">
        <div class="weui-cell__bd">
            <textarea class="weui-textarea" :placeholder="placeholder" @input="handleInput" :text="text" :rows="rows" v-model="inputvalue"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        rows: {
            type: String,
            default: '3'
        },
        placeholder: {
            type: String,
            default: '请输入...'
        }
    },
    data () {
        return {
            inputvalue: this.value
        }
    },
    watch: {
        value (val) {
            this.inputvalue = val
        }
    },
    methods: {
        handleInput (e) {
            this.$emit('input', this.inputvalue)
        }
    }
}
</script>

<style lang="scss">
.input-cell{
    height: 50px;
    line-height: 50px;
    display: flex;
    position: relative;
    .title{
        flex: 4;
        text-align: left;
        padding-left: .75rem;
        font-size: 1rem;
        color: #020202;
        font-weight: 400;
    }
    span{
        position: absolute;
        right:8px;
        z-index: 99;
        font-size: .9rem;
        font-weight: normal;
    }
    .content {
        flex: 8;
        text-align: right;
        padding-right: 1.8rem;
        font-size: .875rem;
        color: #020202;
        input {
            height: 100%;
            width: 100%;
            border: none;
            outline: none;
            font-size: .875rem;
            text-align: right;
        }
    }
    &::after {
        content: '';
        background-color: #ededed;
        height: 1px;
        position: absolute;
        left: .75rem;
        right: 0;
        bottom: 0;
    }
    &:last-child::after{
        display: none;
    }
}
</style>
