<script setup>
import HomePanel from './HomePanel.vue'
import GoodsItem from './GoodsItem.vue'
import { getGoodsAPI } from '@/api/home'
import { ref, onMounted } from 'vue'

const GoodsList = ref([])
const getGoods = async () => {
  const res = await getGoodsAPI()
  GoodsList.value = res.data.result
}

onMounted(() => {
  getGoods()
})
</script>
<template>
  <div class="home-product">
    <HomePanel v-for="item in GoodsList" :key="item.id" :title="item.name">
      <div class="big-box">
        <RouterLink :to="`/category/${item.id}`" class="cover">
          <img :src="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span class="ellipsis">{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li class="goods-item" v-for="i in item.goods" :key="i.id">
            <GoodsItem :goods="i" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>
<style scoped lang="less">
.home-product {
  margin-top: 20px;

  .big-box {
    height: 610px;
    display: flex;
    text-align: center;

    .cover {
      margin-right: 10px;
      width: 240px;
      height: 610px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        position: absolute;
        top: 50%;
        left: 0;
        font-size: 18px;
        width: 188px;
        font-weight: normal;
        height: 66px;
        line-height: 66px;
        display: flex;

        span {
          display: inline-block;
          color: #fff;
          width: 76px;
          background-color: rgba(0, 0, 0, 0.9);

          &:last-child {
            flex: 1;
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    ul {
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      width: 990px;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
