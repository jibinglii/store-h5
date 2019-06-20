import * as services from '$api/store'

export const toggle = ({ commit }) => commit('toggle')
export const storeInfo = ({ commit }) =>
    services
        .info()
        .then(data => {
            commit('storeInfo', data.data.store)
            return Promise.resolve()
        })