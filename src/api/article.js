import http from '$utils/http'
export default {
    async list(cat, page){
        return await http.get('api/v1/articles', {params: {'filter[category]': cat}, page: page})
    },
    async view(id){
        return await http.get('api/v1/articles/' + id)
    },
    async hot(){
        return await http.get('api/v1/articles/hot')
    }
}
