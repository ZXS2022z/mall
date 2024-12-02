import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/login'
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/api/cart'


export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const cartStore = useCartStore()
  const getuserInfo = async (data) => {
    const res = await loginAPI(data)
    // console.log(res)
    userInfo.value = res.data.result
    await mergeCartAPI(cartStore.cartList.map(item => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      })
    ))
    cartStore.getCartList()
  }

  const resetUserInfo = () => {
    userInfo.value = {}
  }
  return {  
    userInfo ,
    getuserInfo,
    resetUserInfo,
  }
},{
  persist: true
})

