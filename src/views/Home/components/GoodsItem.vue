<script setup>
defineProps({
  goods: {
    tppe: Object,
    default: () => {}
  }
})
</script>

<template>
  <RouterLink :to="`/detail/${goods.id}`">
    <img v-lazy-load="goods.picture" alt="" />
    <p class="title ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">￥{{ goods.price }}</p>
  </RouterLink>
</template>

<style scoped lang="less">
a {
  text-align: center;
  display: block;
  width: 220px;
  padding: 20px 30px;
  transition: all 0.5s;

  &:hover {
    transform: translate(-2px, -3px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;

    &.desc {
      height: 29px;
      font-size: 14px;
      color: #999;
    }

    &.price {
      font-size: 20px;
      color: #cf4444;
    }
  }
}
</style>
