import { getBannerAPI } from '@/api/home'
import { ref, onMounted } from 'vue'

export function useBanner() {
  const banner = ref([])
  const getBanner = async (id = 2) => {
    const res = await getBannerAPI(id)
    banner.value = res.data.result
  }
  onMounted(() => {
    getBanner()
  })
  return {
    banner
  }
}
