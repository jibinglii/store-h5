<template>
  <div class="page-box">
    <x-header
      title="帮助列表"
      back-url="/shop/help.html"
    ></x-header>
    <x-cell-group>
      <x-cell
        :title="item.title"
        is-link
        v-for="(item, index) in items"
        :key="index"
        :link="'/' + $route.params.store + '/me/help/view/'+item.id+'.html'"
      ></x-cell>
    </x-cell-group>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="spiral"
    >
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import XCellGroup from '$components/XCellGroup'
import XCell from '$components/XCell'
import article from '$api/article'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    XHeader, XCellGroup, XCell, InfiniteLoading
  },
  data() {
    return {
      page: 1,
      items: [
      ],
    }
  },
  methods: {
    infiniteHandler($state) {
      let id = this.$route.params.id
      article.list(id, this.page).then(({ data }) => {
        if (data.contents.data.length > 0) {
          this.page += 1;
          this.items.push(...data.contents.data);
          $state.loaded();
        }
        if (data.contents.per_page > data.contents.data.length) {
          $state.complete();
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
  .weui-cells {
    margin-top: 0;
  }
}
</style>
