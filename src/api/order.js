import http from '$utils/http'
export default {
    async view(id){
        return await http.get('api/v1/order/' + id)
    }
}
