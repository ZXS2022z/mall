import { getCategoryAPI } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute()
  const category = ref({})

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    category.value = res.data.result
  }

  onMounted(() => getCategory())
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    category
  }
}
