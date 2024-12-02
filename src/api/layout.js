import httpRequest from "@/utils/http";
 
export function getCategoryAPI () {
  return httpRequest({
    url: '/home/category/head'
  })
}