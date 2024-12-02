import httpRequest from "@/utils/http";


export const getBannerAPI = (distributionSite) => {
  return httpRequest.get("/home/banner",{
    params:{
      distributionSite
    }
  })
}

export const getNewAPI = (limit = 4) => {
  return httpRequest.get("/home/new",{
    params:{
      limit
    }
  })
}

export const getHotAPI = () => {
  return httpRequest.get("/home/hot")
}

export const getGoodsAPI = () => {
  return httpRequest.get("/home/goods")
}