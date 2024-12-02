<script setup>
import { useCategoryStore } from '@/stores'

const categoryStore = useCategoryStore()
</script>

<template>
  <ul class="layout-header-ui">
    <li><router-link to="/">首页</router-link></li>
    <li v-for="goods in categoryStore.categoryList" :key="goods.id">
      <router-link active-class="active" :to="`/category/${goods.id}`"
        >{{ goods.name }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped lang="less">
.layout-header-ui {
  display: flex;
  position: relative;
  align-items: center;
  width: 820px;
  margin: 0 20px;
  padding-left: 40px;

  li {
    line-height: 1;
    margin-right: 40px;
    width: 38px;
    height: 32px;
    text-align: center;

    a {
      display: inline-block;
      font-size: 16px;
      line-height: 32px;

      &:hover {
        color: #27ba9b;
        border-bottom: 1px solid #27ba9b;
      }
    }

    .active {
      color: #27ba9b;
      border-bottom: 1px solid #27ba9b;
    }
  }
}
</style>
