import * as TYPES from './mutations-types'

export default {
  [TYPES.ADD_MESSAGE] (state, value) {
    state.messages.push(value)
  },
  [TYPES.SET_MESSAGES] (state, value) {
    state.messages = value
  },
  [TYPES.LOAD_MESSAGES] (state, value) {
    state.messages.unshift(...value)
  },
  [TYPES.PLUS_PAGE] (state) {
    state.page += 1
  }
}
