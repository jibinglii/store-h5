<template>
  <div class="add">
    <x-header title="选择游戏"></x-header>

    <div class="games">
      <div class="type">
        <div class="type-group">
          <a :class="{active: type == 0}" @click="type=0">手游</a>
          <a :class="{active: type == 1}" @click="type=1">端游</a>
        </div>
      </div>
      <div class="content">
        <router-link v-for="item in games" :key="item.id" :to="{name: 'goods.add.game.basic', params: {'id': item.id}}">
          <game :record="item"></game>
        </router-link>
      </div>
      <div class="index">
        <a v-for="(item, idx) in indexs" :key="idx" @click="index=item" :class="{active: item==index}">{{ item }}</a>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" spinner="spiral">
        <div slot="no-more">没有更多数据啦...</div>
        <div slot="no-results">没有数据</div>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  import XHeader from "$components/XHeader";
  import InfiniteLoading from 'vue-infinite-loading';
  import Game from './components/Game'

  export default {
    name: "goods-sort",
    components: {
      XHeader,
      InfiniteLoading,
      Game
    },
    data() {
      return {
        indexs: [
          "#",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ],
        type: 0,
        index: '#',
        games: [],
        page: 1,
        infiniteId: +new Date(),
      }
    },
    watch: {
      type(val) {
        this.page = 1;
        this.games = [];
        this.infiniteId += 1;
        this.index = '#'
      },
      index(val) {
        this.page = 1;
        this.games = [];
        this.infiniteId += 1;
      }
    },
    methods: {
      redirect(url) {
        console.log(url);
        if (url) {
          location.href = url;
        } else {
          return false;
        }
      },
      infiniteHandler($state) {
        this.$http.get('api/v1/games', {
          params: {
            type: this.type,
            letter: this.index,
            page: this.page
          }
        }).then(({data}) => {
          if (data.games.data.length > 0) {
            this.page += 1;
            this.games.push(...data.games.data);
            $state.loaded();
          }
          if (data.games.per_page > data.games.data.length) {
            $state.complete();
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .add{
    background-color: white;
  }
  .games {
    .type {
      height: 3.125rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: #ededed solid 1px;
      width: 100%;

      .type-group {
        width: 67%;
        border: 1px solid #020202;
        border-radius: 4px;
        display: flex;
        a {
          flex: 1;
          display: block;
          text-align: center;
          font-size: .8rem;
          padding: 3px 5px;
          &.active {
            background-color: #020202;
            color: white;
          }
        }
      }
    }

    .content {
      padding: .875rem 0;
      padding-right: 1.5rem;

      a {
        width: 25%;
        float: left;
      }
    }

    .index {
      position: fixed;
      right: 0;
      top: 6.5rem;
      bottom: 3.75rem;
      text-align: center;
      font-size: .7rem;
      width: 1.5rem;
      // overflow: hidden;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      a {
        display: block;
        height: 1.2rem;
        width: 1.2rem;
        line-height: 1.2rem;
        font-size: .7rem;
        &.active {
          font-weight: 400;
          color: white;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
</style>


