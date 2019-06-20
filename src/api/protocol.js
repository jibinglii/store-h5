import http from '$utils/http'
export default {
    async getProtocol(name){
        return await http.get('/api/v1/games/protocol/' + name)
    }
}