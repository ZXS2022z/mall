import httpRequest from "@/utils/http";

export const getCategoryAPI = (id) => {
  return httpRequest.get("/category",{
    params: {
      id
    }
  })
}

export const getCategoryFilterAPI = (id) => {
  return httpRequest.get('/category/sub/filter',{
    params: {
      id
    }
  })
}

export const getSubCategoryAPI = (data) => {
  return httpRequest.post('/category/goods/temporary',data)
}