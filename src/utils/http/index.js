import axios from 'axios'
import interceptors from './interceptors'

// allow use http client without Vue instance
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000
})

window.API_ROOT = process.env.VUE_APP_API_URL

interceptors(http)

/**
 * Helper method to set the header with the token
 */
export function setToken (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

let url = window.location.pathname
url.match(/^\/?(\w+)\/?.*$/)
let store = RegExp.$1
http.defaults.headers['X-Store-Id'] = `${store}`
http.defaults.headers['Accept'] = 'application/json'

export default http
