import axios from 'axios'
import interceptors from './interceptors'

// allow use http client without Vue instance
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000
})

window.API_ROOT = process.env.VUE_APP_API_URL
let url = window.location.pathname
let store = ''
if (null != url.match(/^\/?(\w+)\/?.*$/)){
  store = RegExp.$1
}
window.STORE_ID = store

interceptors(http)

/**
 * Helper method to set the header with the token
 */
export function setToken (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

http.defaults.headers['X-Store-Id'] = `${store}`
http.defaults.headers['Accept'] = 'application/json'

export default http
