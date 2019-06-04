<template>
    <div class="goods-item">
        <div>
            <img :src="goods.logo" alt="" class="logo">
        </div>
        <div>
            <h3>{{ goods.title }}</h3>
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
    display: flex;
    justify-content: space-between;
    img.logo{
        width: 90px;
        height: 90px;
        overflow: hidden;
    }
}
</style>
