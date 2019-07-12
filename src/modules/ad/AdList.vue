<template>
  <div>
    <x-header title="广告管理" back-url="me.me">
      <i
        @click="$router.push({name: 'ad.add'})"
        class="iconfont icon-add"
        slot="right"
      ></i>
    </x-header>
    <div class="ads">
      <van-swipe-cell v-for="item in items" :key="item.id" click="ad-item">
        <van-card :centered=true
        :title="item.title"
        :desc="item.content"
        :thumb-link="item.url"
        >
          <van-image :src="item.img" slot="thumb" fit="cover" style="height: 100%"/>
        </van-card>
        <div slot="right" class="btns">
          <van-button
            square
            type="danger"
            text="删除"
            @click="deleteAd(item.id)"
          />
        </div>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import Card from 'vant/lib/card'
import Image from 'vant/lib/image'
import 'vant/lib/card/style'
import 'vant/lib/image/style'
import SwipeCell from 'vant/lib/swipe-cell'
import "vant/lib/swipe-cell/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  name: 'ads',
  components: {
    XHeader,
    'van-card': Card,
    'van-image': Image,
    'van-swipe-cell': SwipeCell,
    'van-button': Button
  },
  data () {
    return {
      items: []
    }
  },
  created () {
    this.getAds()
  },
  methods: {
    async getAds () {
      this.$toast.loading({mask: true})
      await this.$http.get('api/v2/store/ads/list').then(data => {
        this.$toast.clear()
        this.items = data.data.ads
      })
    },
    async deleteAd(id){
      this.$toast.loading({mask: true})
      await this.$http.delete('api/v2/store/ads/' + id).then(data => {
        this.items = []
        this.getAds()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-swipe-cell{
  border-bottom: 1px solid #f2f2f2;
}
.van-card__content{
  .van-card__title{
    font-size: 16px;
  }
}
.van-swipe-cell__right{
  .btns{
    height: 100%;
    line-height: 100%;
    .van-button {
      height: 100%;
      line-height: 100%;
      min-width: 3.1rem;
    }
    .van-button--square {
      border-radius: 0;
    }
    .van-button--normal{
      padding: 0 10px;
    }
    .van-button--danger {
      color: #fff;
      background-color: #c22727;
      border: 1px solid #c22727;
    }
  }
}
</style>


