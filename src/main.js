import http from '$utils/http'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import './bootstrap'
import Root from './root'
import router from './router'
import store from './vuex'
import Toast from 'vant/lib/toast'
import Notify from 'vant/lib/notify'
import 'vant/lib/toast/style'
import mixins from './mixins/index'
import '$utils/rem'
import * as filters from './filters'
import VueCookies from 'vue-cookies';
// const FastClick = require('fastclick');
import Lazyload from 'vant/lib/lazyload'
Vue.use(Lazyload)
import { Alert, Confirm } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(VueCookies)

import VueFab from 'vue-float-action-button'
Vue.use(VueFab, {
    // opitons 可选iconfont图标或MaterialIcons
    // iconType: 'MaterialDesign'
    iconType: 'iconfont'
});

import FastClick from 'fastclick'
Vue.config.productionTip = false
Vue.mixin(mixins)
sync(store, router)
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.prototype.$http = http
Vue.prototype.$user = () => {
    return store.getters.currentUser
}
Vue.prototype.$currentStore = () => {
    return store.getters.currentStore
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


// import Vconsole from 'vconsole';
// let vConsole = new Vconsole()
// export default vConsole
