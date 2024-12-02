<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue'
import { useCategory } from './composables/useCategory'
import { useBanner } from './composables/useBanner'

const { category } = useCategory()
const { banner } = useBanner()
</script>
<template>
  <div class="category-page">
    <div class="Center">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ category.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in banner" :key="item.id">
            <RouterLink :to="item.hrefUrl"
              ><img :src="item.imgUrl" alt=""
            /></RouterLink>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in category.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in category.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.home-banner {
  height: 500px;
  width: 1240px;
  a {
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.bread-container {
  padding: 25px 0;
}

.sub-list {
  margin-top: 20px;
  background-color: #fff;
  text-align: center;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 32px;

    li {
      width: 168px;
      height: 160px;

      a {
        display: block;

        img {
          width: 100px;
          height: 100px;
        }

        p {
          line-height: 40px;
        }

        &:hover {
          color: #27ba9b;
        }
      }
    }
  }
}

h3 {
  text-align: center;
  line-height: 100px;
  font-size: 28px;
  color: #666;
}

.ref-goods {
  margin-top: 20px;
  background-color: #fff;

  .body {
    display: flex;
    justify-content: space-around;
    padding: 0 40px 30px;
  }
}
</style>
