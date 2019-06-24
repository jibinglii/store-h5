import http from '$utils/http'

export const getCollectionGoods = () => {
  return http.get('/api/v1/user/collects/goods')
}
export const deleteCollectionGoods = (goodsId) => {
  return http.delete('/api/v1/collect/goods/' + goodsId)
}
export const deleteAllCollectionGoods = (goodList) => {
  return http.delete('/api/v1/collects/delete', goodList)
}
