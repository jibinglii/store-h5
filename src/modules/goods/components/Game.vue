<template>
    <div class="goods">
        <img v-lazy="record.logo" :alt="record.name">
        <h6>{{record.name}}</h6>
    </div>
</template>

<script>
export default {
    props: {
        record: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.goods {
    text-align: center;
    margin-bottom: 1.2rem;
    box-sizing: border-box;
    padding-top: .5rem;
    img {
        width: 3rem;
        height: 3rem;
        border-radius: 8px;
    }
    h6 {
        font-size: .6rem;
        line-height: 2;
        overflow: hidden;
        color:#000;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 5px;
    }
}
</style>
