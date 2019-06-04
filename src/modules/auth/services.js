// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '$utils/http'

// send login data and retrive a new token
export const postLogin = ({ username, password }) => {
  return http.post('api/v1/auth/login', {
    grant_type: 'password',
    client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
    username: username,
    password: password,
    scope: ''
  })
}

// get current user's data
export const loadUserData = () => http.get('api/v1/auth/me').catch(() => {})
