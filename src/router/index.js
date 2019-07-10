import { routes as home } from '$modules/home'
import { routes as auth } from '$modules/auth'
import { routes as store } from '$modules/store'
import { routes as collection } from '$modules/collection'
import { routes as me } from '$modules/me'
import { routes as goods } from '$modules/goods'
import { routes as bank } from '$modules/bank'
import { routes as order } from '$modules/order'
import { routes as result } from '$modules/result'
import { routes as seller } from '$modules/seller'
import { routes as distribution } from '$modules/distribution'
import { routes as withdraw } from '$modules/withdraw'
import { routes as im } from '$modules/im'
import { routes as ad } from '$modules/ad'
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
Vue.use(Router)

const AppRoute = {
    path: '/:store/',
    component: () =>
        import ('../app'),
    children: [...home, ...auth, ...store, ...collection, ...me, ...goods, ...distribution, ...bank, ...order,
        ...result, ...seller, ...withdraw, ...im, ...ad
    ]
}

const routes = [{
  path: '/404',
  component: () =>
      import ('../not-found')
}, AppRoute, {
    path: '*',
    component: () =>
        import ('../not-found')
}]

const scrollBehavior = function(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        if (to.hash) {
            if (document.querySelector(to.hash)) {
                return {
                    selector: to.hash
                }
            }
            return false
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 });
            }, 0);
        })
    }
}

const router = new Router({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    mode: 'history',
    scrollBehavior
})

router.beforeEach(beforeEach)
export default router
