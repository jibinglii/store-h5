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
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
Vue.use(Router)

const AppRoute = {
    path: '/:store/',
    component: () =>
        import ('../app'),
    children: [...home, ...auth, ...store, ...collection, ...me, ...goods, ...distribution, ...bank, ...order,
    ...result, ...seller]
}

const routes = [AppRoute, {
  path: '*',
  component: () =>
      import ('../not-found')
}]

const router = new Router({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    mode: 'history'
})

router.beforeEach(beforeEach)
export default router
