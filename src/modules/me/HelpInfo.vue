<template>
  <div class="page-box">
    <x-header title="使用帮助"></x-header>

    <x-cell-group>
      <van-skeleton
        :row="20"
        :loading="loading"
        title
        style="padding-top: 15px;"
      />
      <we-info-cell :title="article.title"></we-info-cell>
      <div
        class="desc"
        v-html="article.content"
      >
      </div>
    </x-cell-group>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import XCellGroup from '$components/XCellGroup'
import WeInfoCell from '$components/WeInfoCell'
import article from '$api/article'
import Skeleton from 'vant/lib/skeleton'
import 'vant/lib/skeleton/style'
import { setTimeout } from 'timers';
export default {
  components: { XHeader, XCellGroup, WeInfoCell, [Skeleton.name]:Skeleton },
  data() {
    return {
      article: {},
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.getData();
    }, 300)
  },
  methods: {
    getData() {
      let id = this.$route.params.id
      article.view(id).then(({ data }) => {
        this.loading = false
        this.article = data
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
.desc {
  padding: 20px;
  color: #666;
  line-height: 180%;
  font-size: 0.8rem;
  border-top: solid 1px #f2f2f2;
}
</style>
