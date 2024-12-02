import httpRequest from "@/utils/http";

export const getDetailAPI = (id) => {
  return httpRequest.get(`/goods`,{
    params: {
      id
    }
  })
}

export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpRequest.get( '/goods/hot',{
    params: {
      id,
      type,
      limit
    }
  })
}