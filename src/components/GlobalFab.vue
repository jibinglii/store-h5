<template>
    <vue-fab
    :mainBtnColor="mainBtnColor"
    size="big"
    style="bottom: 6.25rem;left: 1rem;" icon="icon-add"
    :scroll-auto-hide="true"
    >
    <fab-item
      v-for="(item, idx) in menu"
      :idx="idx"
      :title="item.title"
      :color="item.color"
      :icon="item.icon"
      @clickItem="clickItem(idx)" :key="idx"></fab-item>
    </vue-fab>
</template>

<script>
export default {
    data () {
      return {
        mainBtnColor: '#020202',
        service: {}
      }
    },
    computed:{
      menu () {
        if (this.isSoogua()){
          return [
            {
              icon: 'icon-service',
              title: '联系客服',
              color: '#ff9900'
            },
            {
              icon: 'icon-close',
              title: '返回',
              color: '#999'
            },
            {
              icon: 'icon-shouye',
              title: '回到首页',
              color: '#666'
            },
          ]
        }
        return [
          {
            icon: 'icon-shouye',
            title: '回到首页',
            color: '#666'
          },
        ]
      }
    },
    methods: {
      clickItem: function (idx) {
        if (this.isSoogua()){
          switch (idx) {
            case 2:
              this.$router.push({name: 'home', params: {'store_id': window.STORE_ID}})
              break;
            case 1:
              this.hidden();
              break;
            case 0:
              this.goService()
          }
        } else {
          switch (idx) {
            case 0:
              this.$router.push({name: 'home', params: {'store_id': window.STORE_ID}})
              break;
          }
        }
      },
      hidden () {
        window.soogua.postMessage(JSON.stringify({"action":"hidden"}))
      },
      goService () {
        window.soogua.postMessage(JSON.stringify({"action":"route","params":JSON.stringify({"url":"message/"+this.service.id+"/6"})}))
      },
      close () {
        window.soogua.postMessage(JSON.stringify({"action":"close"}))
      },
      async getService(){
        await axios.get('api/v1/services').then(({data}) => {
          this.service = data.data
        })
      }
    },
    created () {
      if (this.isSoogua()){
        this.getService()
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
