<script setup>
import { getUserOrderAPI } from '@/api/member'
import { ref, onMounted } from 'vue'

const userOrderList = ref([])
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 1
})
const getUserOrder = async () => {
  const res = await getUserOrderAPI(params.value)
  userOrderList.value = res.data.result
}

onMounted(() => getUserOrder())

const tabTypes = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]

const tabChange = (type) => {
  console.log(type)
  params.value.orderState = tabTypes.findIndex((item) => item.name === type)
  //getOrderList()
}
</script>
<template>
  <div class="order-container">
    <el-tabs v-model="tabTypes[params.orderState].name" @tab-change="tabChange">
      <!-- tab切换 -->
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
      <div class="main-container">
        <div class="holder-container" v-if="userOrderList.length === 0">
          <el-empty description="暂无订单数据" />
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.order-container {
  padding: 10px 20px;

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
