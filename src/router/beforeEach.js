import vuex from '../vuex'

const needAuth = route => route.meta.requiresAuth === true

const beforeEach = (to, from, next) => {
  /**
   * Otherwise  if authentication is required login.
   */
  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth'
  // })
  vuex
    .dispatch('checkUserToken')
    .then(() => {
      if (vuex.getters.isLogged && to.path.indexOf('auth') > 0) {
        return next({ name: 'home', params: {store: window.STORE_ID} })
      }
      return next()
    })
    .catch(() => {
      if (needAuth(to)) {
        // No token, or it is invalid
        return next({ name: 'auth.login', params: {store: window.STORE_ID}, query: {redirect: encodeURIComponent(window.location.href)} }) // redirect to login
      }
      next()
    })
}

export default beforeEach
