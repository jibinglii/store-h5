<template>
    <div class="recommend">
        <x-group title="猜你喜欢" :title-center="true" style="padding: 0">
            <goods-item-horizontal v-for="item in recommendGoods" :key="item.id" :goods="item">
            </goods-item-horizontal>
            <infinite-loading @infinite="infiniteHandler" spinner="spiral">
                <div slot="no-more">没有更多数据啦...</div>
                <div slot="no-results">没有数据</div>
            </infinite-loading>
        </x-group>
    </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import XGroup from '$components/XGroup'
import GoodsItemHorizontal from '$components/GoodsItemHorizontal';
export default {
    components: {
        InfiniteLoading, XGroup, GoodsItemHorizontal
    },
    data () {
        return {
            recommendGoods: [],
            page: 1
        }
    },
    methods: {
        async infiniteHandler($state) {
            this.$http.get('api/v1/goods/recommend', {params: {page: this.page}}).then(({data}) => {
                if (data.goods.data.length>0) {
                    this.page += 1;
                    this.recommendGoods.push(...data.goods.data);
                    $state.loaded();
                }
                if (data.goods.per_page > data.goods.data.length) {
                    $state.complete();
                }
            })
        }
    }
}
</script>
