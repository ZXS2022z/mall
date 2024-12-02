import httpRequest from "@/utils/http";

export const getOrderAPI = (id) => {
  return httpRequest.get(`/member/order/${id}`)
}