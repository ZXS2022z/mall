<script setup>
import { ref, onMounted } from 'vue'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryFilter = ref({})
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilter.value = res.data.result
}
onMounted(() => {
  getCategoryFilter()
})

const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const subcategory = ref({})
const getSubCategory = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  // console.log(res)
  subcategory.value = res.data.result.items
}
onMounted(() => {
  getSubCategory()
})

const handleTabChange = () => {
  reqData.value.page = 1
  getSubCategory(reqData.value)
}

const disabled = ref(false)
const handleInfiniteScroll = async () => {
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  subcategory.value.push(...res.data.result.items)
  if (res.data.result.items.length < 1) {
    disabled.value = true
  }
}
</script>
<template>
  <div class="Center">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/category/${categoryFilter.parentId}` }"
          >{{ categoryFilter.parentName }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="handleTabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="handleInfiniteScroll"
        :infinite-scroll-disabled="disabled"
      >
        <GoodsItem
          v-for="goods in subcategory"
          :goods="goods"
          :key="goods.id"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;

    a {
      margin-right: 20px;
    }
  }
}
</style>
