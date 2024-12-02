<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutFixd from './components/LayoutFixd.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

import { useCategoryStore } from '@/stores'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutFixd />
  <LayoutNav />
  <LayoutHeader />

  <RouterView />

  <LayoutFooter />
</template>

<style scoped lang="less"></style>
