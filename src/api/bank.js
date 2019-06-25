import http from '$utils/http'
export default {
    async get_default(){
        return await http.get('api/v1/bankcard/get-default', {loading: true})
    },
    async list(){
        return await http.get('api/v1/bankcard', {loading: true})
    },
}
