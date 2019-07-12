import http from '$utils/http'
export default {
    async get_default(){
        return await http.get('api/v1/bankcard/get-default', {loading: true})
    },
    async list(is_bank){
        is_bank = is_bank || 0
        let param = {
          params: {is_bank_card: is_bank}
        }
        return await http.get('api/v1/bankcard', param)
    },
}
