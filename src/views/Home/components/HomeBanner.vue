<script setup>
import { getBannerAPI } from '@/api/home'
import { ref, onMounted } from 'vue'

const bannerList = ref([])

const getBanner = async () => {
  const res = await getBannerAPI(1)
  bannerList.value = res.data.result
}

onMounted(() => {
  getBanner()
})
</script>
<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped lang="less">
.home-banner {
  height: 500px;
  width: 1240px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
