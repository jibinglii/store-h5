import { routes as home } from '$modules/home'
import { routes as auth } from '$modules/auth'
import { routes as store } from '$modules/store'
import { routes as collection } from '$modules/collection'
import { routes as me } from '$modules/me'
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
import Vant from 'vant';
import 'vant/lib/index.css'
Vue.use(Router)
Vue.use(Vant)

const AppRoute = {
    path: '/:store/',
    component: () =>
        import ('../app'),
    children: [...home, ...auth, ...store, ...collection, ...me, {
        path: '*',
        component: () =>
            import ('../not-found')
    }]
}

const routes = [AppRoute]

const router = new Router({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    mode: 'history'
})

router.beforeEach(beforeEach)
export default router