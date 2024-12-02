import httpRequest from "@/utils/http";

export const mergeCartAPI = (data) => {
  return httpRequest.post("/member/cart/merge", data); 
}

export const getCartListAPI = () => {
  return httpRequest.get("/member/cart");
}

export const deleteCartAPI = (data) => { 
  return httpRequest.delete("/member/cart",{data} )
}

export const updateCartAPI = (id, {selected,count}) => {
  return httpRequest.put(`/member/cart/${id}`, {selected,count})
}

export const addCartAPI = (data) => {
  return httpRequest.post("/member/cart", data)
}