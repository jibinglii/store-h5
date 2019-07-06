<template>
    <div class="cell-groups">
        <div v-for="(item, index) in cells" :key="item.value" @click="setvalue(index, item)" class="info-cell" v-if="item.show||false">
            <label>
                <img :src="item.icon" />
                {{ item.title }}
            </label>
            <div class="icon" :class="{active: index==currentIndex}"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cells: Array,
        value: [String, Array, Object]
    },
    model: {
        prop: 'value',
        event: 'confirm'
    },
    data () {
        return {
            currentIndex: 0,
        }
    },
    mounted(){
        
    },
    methods: {
        setvalue(index, value){
            this.currentIndex = index;
            this.$emit('confirm', {index: index, value: value.value});
        }
    }
}
</script>

<style lang="scss">
.cell-groups{

    .info-cell{
        height: 44px;
        line-height: 44px;
        display: flex;
        border-bottom:solid 1px #f2f2f2;

        &:last-child {
            border-bottom:none
        }

        label{
            flex: 7;
            text-align: left;
            padding-left: .75rem;
            font-size: 16px;
            color: #818181;
            padding-left:50px;

            img{
                position: absolute;
                margin-left:-40px;
                margin-top:8px;
                width: 30px;
            }
        }
        .icon {
            flex: 3;
            background:url(/images/shop/radio-nochecked.png) no-repeat center right;
            background-size: 30px 30px;
        }
        .active{
            background:url(/images/shop/radio-checked.png) no-repeat center right;
            background-size: 30px 30px;
        }
    }

}
</style>
