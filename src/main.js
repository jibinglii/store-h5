import http from '$utils/http'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import './bootstrap'
import Root from './root'
import router from './router'
import store from './vuex'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
import mixins from './mixins/index'
import '$utils/rem'
import * as filters from './filters'
import 'swiper/dist/css/swiper.css';
// const FastClick = require('fastclick');
import Lazyload from 'vant/lib/lazyload'
Vue.use(Lazyload)

import FastClick from 'fastclick'
Vue.config.productionTip = false
Vue.mixin(mixins)
sync(store, router)
Vue.prototype.$toast = Toast
Vue.prototype.$http = http
Vue.prototype.$user = () => {
    return store.getters.currentUser
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

FastClick.attach(document.body)
store.dispatch('storeInfo')
setTimeout(() => {
    new Vue({
        store,
        router,
        render: h => h(Root)
    }).$mount('#app')
}, 200)
