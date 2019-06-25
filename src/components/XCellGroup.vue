<template>
    <div class="x-cell-group">
        <div
            class="weui-cells__title"
            v-if="title"
            v-html="title"></div>
        <slot name="title"></slot>
        <div
            class="weui-cells"
            :class="{'vux-no-group-title': !title}"
            :style="{marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter}">
            <slot name="after-title"></slot>
            <slot></slot>
        </div>
        <div
            class="weui-cells__title vux-group-footer-title"
            v-if="footerTitle"
            :style="{color: footerTitleColor, fontSize: footerTitleSize}"
            v-html="footerTitle">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            titleColor: String,
            secTitle: String,
            labelWidth: String,
            labelAlign: String,
            labelMarginRight: String,
            gutter: [String, Number],
            footerTitle: String,
            footerTitleColor: String,
            footerTitleSize: {
                type: String,
                default: '14px'
            }
        }
    }
</script>

<style lang="scss">
.x-cell-group{
    .weui-cells__title, .weui-cell{
        padding-left: .75rem;
    }
    .weui-cells {
        .x-cell-item {
            position: relative;
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
    }
}
</style>

