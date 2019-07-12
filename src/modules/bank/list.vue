<template>
  <div class="goods">
    <x-header
      title="收付款账号"
      url="me.accountsetting"
    >
      <i
        @click="$router.push({name: 'banks.add'})"
        class="iconfont icon-add"
        slot="right"
      ></i>
    </x-header>
    <ul class="banklist">
      <li
        @click="$router.push({name: 'banks.view', params: {'id': item.id}})"
        v-for="(item, index) in banklist"
        :key="index"
        :class="item.bank_info.color"
      >
        <div class="icon">
          <i
            class="iconfont"
            :class="'icon-' + item.bank"
          ></i>
        </div>
        <div class="name">
          {{item.bank_info.bankName}}
          <span v-show="item.is_default">默认</span>
        </div>
        <div class="type">{{item.bank_info.cardTypeName}}</div>
        <div class="no">{{item.bankno}}</div>
      </li>
      <li
        class="add"
        @click="$router.push({name: 'banks.add'})"
      >
        <img src="/images/shop/bank-add.png" />
        <br />
        添加
      </li>
    </ul>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'

export default {
  components: {
    XHeader
  },
  data() {
    return {
      banklist: []
    };
  },
  mounted() {
    this.getBankCards();
  },
  methods: {
    getBankCards() {
      this.$toast.loading({mask: true, message: '正在加载...'})
      this.$http.get('/api/v1/bankcard', { loading: true }).then(({ data }) => {
        this.$toast.clear()
        this.banklist = data.bank_cards;
      })
    },
  },

};
</script>

<style lang="scss" scoped>

.page-box {
  position: relative;
}

.add-bank {
  position: absolute;
  color: #fff;
  font-size: 2rem;
  margin-top: -5px;
}

.banklist {
  text-align: center;
  color: #fff;
  li {
    margin: 20px auto 0px;
    display: block;
    width: 90%;
    height: 110px;
    text-align: center;
    border-radius: 5px;
    background-color: #888;

    .icon {
      position: absolute;
      margin: 8px 0px 0px 20px;
      height: 35px;
      width: 35px;
      i.iconfont {
        font-size: 35px;
      }
    }
    .name {
      position: absolute;
      margin: 15px 0 0 75px;
      font-size: 18px;
      span {
        position: relative;
        background-color: #fff;
        color: #000;
        font-size: 0.7rem;
        padding: 2px 5px;
      }
    }
    .type {
      position: absolute;
      margin: 45px 0 0 75px;
      font-size: 14px;
    }
    .no {
      position: absolute;
      margin-top: 70px;
      margin-left: 75px;
      letter-spacing: 2.5px;
    }
  }
  .red {
    background: -webkit-linear-gradient(
      left top,
      DarkSalmon,
      FireBrick
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      bottom right,
      DarkSalmon,
      FireBrick
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      bottom right,
      DarkSalmon,
      FireBrick
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      to bottom right,
      DarkSalmon,
      FireBrick
    ); /* 标准的语法 */
  }

  .green {
    background: -webkit-linear-gradient(
      left top,
      MediumSeaGreen,
      DarkSlateGray
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      bottom right,
      MediumSeaGreen,
      DarkSlateGray
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      bottom right,
      MediumSeaGreen,
      DarkSlateGray
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      to bottom right,
      MediumSeaGreen,
      DarkSlateGray
    ); /* 标准的语法 */
  }

  .blue {
    background: -webkit-linear-gradient(
      left top,
      DodgerBlue,
      SlateBlue
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      bottom right,
      DodgerBlue,
      SlateBlue
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      bottom right,
      DodgerBlue,
      SlateBlue
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      to bottom right,
      DodgerBlue,
      SlateBlue
    ); /* 标准的语法 */
  }

  .gray {
    background: -webkit-linear-gradient(
      left top,
      LightSlateGray,
      Gray
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      bottom right,
      LightSlateGray,
      Gray
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      bottom right,
      LightSlateGray,
      Gray
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      to bottom right,
      LightSlateGray,
      Gray
    ); /* 标准的语法 */
  }

  .add {
    color: #000;
    font-size: 16px;
    img {
      width: 47px;
      margin: 15px 0px 2px 0px;
    }
  }
}
</style>
