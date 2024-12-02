<script setup>
import { computed, defineProps, onMounted, ref } from 'vue'
import { getHotGoodsAPI } from '@/api/detail'
import { useRoute } from 'vue-router'

const props = defineProps({
  hotType: {
    type: Number
  }
})

const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}
const title = computed(() => TYPEMAP[props.hotType])

const route = useRoute()
const hotGoods = ref([])
const gethotGoods = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType
  })
  hotGoods.value = res.data.result
  // console.log(res.data.result)
}

onMounted(() => gethotGoods())
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      :to="`/detail/${item.id}`"
      class="goods-item"
      v-for="item in hotGoods"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="less">
.goods-hot {
  margin-bottom: 20px;

  h3 {
    height: 70px;
    line-height: 70px;
    background: #e26237;
    color: #fff;
    font-size: 18px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .desc {
      color: #999;
      height: 29px;
      font-size: 14px;
    }

    .price {
      color: #cf4444;
      font-size: 20px;
    }
  }
}
</style>
