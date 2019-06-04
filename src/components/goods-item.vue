<template>
    <div class="goods-item">
        <h3>{{ goods.title }}</h3>
        <div>
            <img :src="goods.logo" alt="" class="logo">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsItem',
    props: {
        goods: Object
    }
}
</script>

<style lang="scss">
.goods-item{
    border: 1px dashed green;
    box-sizing: border-box;
    img.logo{
        width: 90px;
        height: 90px;
        overflow: hidden;
    }
}
</style>
