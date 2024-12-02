<script setup>
import HomePanel from './HomePanel.vue'
import { getHotAPI } from '@/api/home'
import { ref, onMounted } from 'vue'

const hotList = ref([])
const getHot = async () => {
  const res = await getHotAPI()
  hotList.value = res.data.result
}

onMounted(() => {
  getHot()
})
</script>
<template>
  <HomePanel title="热销商品" sub-title="人气爆款 不容错过">
    <ul class="home-hot-list">
      <li v-for="item in hotList" :key="item.id">
        <router-link to="/">
          <img v-lazy-load="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </router-link>
      </li>
    </ul>
  </HomePanel>
</template>
<style scoped lang="less">
.home-hot-list {
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 426px;

  li {
    border: 1px solid #eee;
    transition: all 0.3s;
    width: 306px;

    &:hover {
      transform: translate(-2px, -3px);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }
  }

  img {
    width: 306px;
    height: 306px;
  }
  p {
    padding-top: 12px;
    font-size: 22px;
  }
  .desc {
    font-size: 18px;
    color: #999;
  }
}
</style>
