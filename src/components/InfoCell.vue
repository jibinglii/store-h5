<template>
    <div class="info-cell">
        <label class="title" v-if="title">{{ title }}</label>
        <div class="content" :style="contentStyle"><slot></slot></div>
    </div>
</template>

<script>
export default {
    props: {
        title: [String, Boolean]
    },
    computed: {
        contentStyle () {
            if (this.title == false) {
                return {
                    flex: 1,
                    paddingLeft: '.875rem',
                    textAlign: 'left'
                }
            }
            return {}
        }
    }
}
</script>

<style lang="scss">
.info-cell{
    height: 44px;
    line-height: 44px;
    display: flex;
    position: relative;
    border-bottom: solid 1px #f2f2f2;
    .title{
        // flex: 3;
        position: absolute;
        left: 0;
        text-align: left;
        padding-left: .75rem;
        font-size: 14px;
        color: #818181;
        word-wrap: none;
    }
    .content {
        // flex: 8;
        position: absolute;
        right: 0;
        text-align: right;
        padding-right: .75rem;
        font-size: 14px;
        color: #020202;
    }
}
</style>
