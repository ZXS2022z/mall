<script setup>
import HomePanel from './HomePanel.vue'
import { getNewAPI } from '@/api/home'
import { ref, onMounted } from 'vue'

const newList = ref([])
const getNew = async () => {
  const res = await getNewAPI()
  newList.value = res.data.result
}

onMounted(() => {
  getNew()
})
</script>
<template>
  <!-- <div class="home-new">
    <div class="Center "> -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <ul class="home-new-list">
      <li v-for="item in newList" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">¥{{ item.price }}</p>
        </router-link>
      </li>
    </ul>
  </HomePanel>
  <!-- </div>
  </div> -->
</template>
<style scoped lang="less">
// .home-new {
// height: 510px;
.home-new-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    background-color: #f0f9f4;
    transition: all 0.3s;

    &:hover {
      transform: translate(-2px, -3px);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      padding-top: 12px;
      font-size: 22px;
      text-align: center;

      //过长文字超出部分显示省略号
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: #cf4444;
    }
  }
}
//}
</style>
