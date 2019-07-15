import * as services from '$api/store'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'
export const toggle = ({ commit }) => commit('toggle')
export const hasNewMsg = ({ commit }, payload) => commit('hasNewMsg', payload)
export const storeInfo = ({ commit }) => {
  if (window.STORE_ID != '' && window.STORE_ID != 404) {
    services
    .info()
    .then(data => {
        let store = data.data.store
        if (store.status != 1){
          location.replace('/404?code=403&reason=店铺暂时不可用')
        }
        commit('storeInfo', store)
        return Promise.resolve()
    }).catch(error => {
      if (error.status == 404){
        location.replace('/404?code=404&reason=店铺不存在')
      }
    })
  }
}
