import * as TYPES from './mutations-types'
import ImHistory from "$utils/im_history"
import { reject } from 'q';

export const addMessage = ({ commit }, payload) => {
  ImHistory.addMessage(payload);
  commit(TYPES.ADD_MESSAGE, payload)
  return Promise.resolve()
}

export const setMessages = ({ commit }) => {
  ImHistory.fetchMessage("chat").then(res => {
    commit(TYPES.SET_MESSAGES, res)
  }).then(() => {
    var div = document.getElementById("msg")
    div.scrollTop = div.scrollHeight
  })
}
export const loadMore = ({ state, commit }) => {
  let index = ImHistory.PAGE_NUM * state.page
  return ImHistory.fetchMessage("chat", index).then(res => {
    if (res.length > 0){
      commit(TYPES.LOAD_MESSAGES, res)
      commit(TYPES.PLUS_PAGE)
      if (res.length < ImHistory.PAGE_NUM) {
        return Promise.reject({code: 200})
      }
      return Promise.resolve('done')
    } else {
      return Promise.reject({code: 400})
    }
  }).then(() => {
    var div = document.getElementById("msg")
    div.scrollTop = 0
  })
}

