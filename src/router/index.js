import { routes as home } from '$modules/home'
import { routes as auth } from '$modules/auth'
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'

Vue.use(Router)

const AppRoute = {
  path: '/',
  component: () => import('../app'),
  children: [...home, ...auth]
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
