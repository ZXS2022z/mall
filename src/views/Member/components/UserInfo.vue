<script setup>
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import { getLikeListAPI } from '@/api/member'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const likeList = ref([])
const getLikeList = async () => {
  const res = await getLikeListAPI()
  likeList.value = res.data.result
  // console.log(likeList.value)
}

onMounted(() => getLikeList())
</script>

<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <img :src="userStore.userInfo?.avatar" />
      <h4>{{ userStore.userInfo?.account }}</h4>
    </div>
    <div class="item">
      <a to="javascript:;">
        <span class="iconfont icon-hy"></span>
        <p>会员中心</p>
      </a>
      <a to="javascript:;">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a to="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <div class="like-container">
    <div class="home-panel">
      <div class="header">
        <h4>猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="good in likeList" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-overview {
  height: 132px;
  background: url(@/assets/center-bg.png) no-repeat center / cover;
  display: flex;

  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      margin-left: 60px;
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      color: #fff;
    }
  }

  .item {
    display: flex;
    flex: 1;
    justify-content: space-around;
    text-align: center;
    align-items: center;

    a {
      color: #fff;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}

.like-container {
  margin-top: 20px;
  border-radius: 4px;

  .home-panel {
    padding: 0 20px;
    margin-top: 20px;
    height: 400px;
  }

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;

    h4 {
      font-size: 22px;
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
