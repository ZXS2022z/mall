import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getCartListAPI,
  addCartAPI,
  deleteCartAPI,
  updateCartAPI
} from '@/api/cart'
import { useUserStore } from './user'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])

    const getCartList = async () => {
      const res = await getCartListAPI()
      cartList.value = res.data.result
    }

    const addCart = async (data) => {
      if (!isLogin.value) {
        const inCart = cartList.value.find((item) => item.skuId === data.skuId)
        if (inCart) {
          inCart.count += data.count
          // console.log(inCart)
        } else {
          cartList.value.push(data)
        }
      } else {
        await addCartAPI({ skuId: data.skuId, count: data.count })
        getCartList()
      }
    }

    const deleteCart = async (skuId) => {
      if (!isLogin.value) {
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      } else {
        await deleteCartAPI({ ids: [skuId] })
        getCartList()
      }
    }

    const totalCount = computed(() =>
      cartList.value.reduce((acc, cur) => acc + cur.count, 0)
    )
    const totalPrice = computed(() =>
      cartList.value
        .reduce((acc, cur) => acc + cur.price * cur.count, 0)
        .toFixed(2)
    )

    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((acc, cur) => acc + cur.count, 0)
    )
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((acc, cur) => acc + cur.price * cur.count, 0)
        .toFixed(2)
    )

    const singleSelect = (skuId, { selected, count }) => {
      // updateCartAPI(skuId,{selected,count})
      cartList.value.find((item) => item.skuId === skuId).selected = selected
    }
    const allSelect = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    return {
      cartList,
      isLogin,
      getCartList,
      addCart,
      deleteCart,
      totalCount,
      totalPrice,
      selectedCount,
      selectedPrice,
      singleSelect,
      allSelect,
      isAll
    }
  },
  {
    persist: true
  }
)
