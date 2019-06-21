import { routes as home } from '$modules/home'
import { routes as auth } from '$modules/auth'
import { routes as collection } from '$modules/collection'
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'

Vue.use(Router)

const AppRoute = {
  path: '/:store/',
  component: () => import('../app'),
  children: [...home, ...auth, ...collection,
  {
    path: '*',
    component: () => import('../not-found')
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
