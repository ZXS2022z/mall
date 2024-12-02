import httpRequest from "@/utils/http";

export const getLikeListAPI = (limit = 4) => {
  return httpRequest.get('/goods/relevant',{
    params: {
      limit
    }
  })
}

export const getUserOrderAPI = (params) => {
  return httpRequest.get('/member/order',{
    params
  })
}