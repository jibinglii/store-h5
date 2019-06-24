<template>
    <div class="v-group">
        <h6 :class="{center: titleCenter}" v-if="title!=''">{{ title }}</h6>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        titleCenter: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.v-group{
    margin-top: .625rem;
    h6 {
        color: #020202;
        font-size: 14px;
        line-height: 2.5;
        font-weight: 200;
        padding-left: .75rem;
        &.center {
            padding-left: 0;
            text-align: center;
        }
    }
    .content {
        background-color: white;
        font-size: 1rem;
        font-weight: normal;
    }
}
</style>
