<script setup>
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.resetUserInfo()
  router.push('/login')
}
</script>
<template>
  <div class="bgc">
    <div class="Center">
      <ul class="layout-nav" v-if="!userStore.userInfo.token">
        <li><RouterLink to="/login">请先登录</RouterLink></li>
        <li><RouterLink to="">帮助中心</RouterLink></li>
        <li><RouterLink to="">关于我们</RouterLink></li>
      </ul>
      <ul class="layout-nav" v-else>
        <li>
          <RouterLink to="/member"
            ><i class="iconfont icon-user"></i
            >{{ userStore.userInfo.account }}</RouterLink
          >
        </li>
        <li>
          <el-popconfirm
            @confirm="handleLogout"
            title="确认退出吗?"
            confirm-button-text="确认"
            cancel-button-text="取消"
          >
            <template #reference>
              <a>退出登录</a>
            </template>
          </el-popconfirm>
        </li>
        <li><RouterLink to="/member/order">我的订单</RouterLink></li>
        <li><RouterLink to="/member">会员中心</RouterLink></li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="less">
.bgc {
  background-color: #333;

  .layout-nav {
    text-align: left;
    font-size: 14px;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    display: flex;

    li {
      i {
        font-size: 14px;
        margin-right: 2px;
      }

      a {
        color: #cdcdcd;
        line-height: 1;
        padding: 0 15px;
        display: inline-block;
        border-right: 2px solid #666;

        &:hover {
          color: #27ba9b;
        }
      }

      &:last-child {
        a {
          border-right: none;
        }
      }
    }
  }
}
</style>
