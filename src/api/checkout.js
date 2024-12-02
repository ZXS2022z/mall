import httpRequest from "@/utils/http"

export const getCheckInfoAPI = () => {
  // console.log("getCheckInfoAPI")
  return httpRequest.get("/member/order/pre")
}

export const submitOrderAPI = (data) => {
  return httpRequest.post("/member/order", data)
}