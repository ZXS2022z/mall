<script setup>
import LayoutHeaderUI from './LayoutHeaderUI.vue'
import HeaderCart from './HeaderCart.vue'
</script>

<template>
  <div class="layout-header">
    <div class="Center">
      <div class="logo">
        <RouterLink to="/"></RouterLink>
      </div>
      <LayoutHeaderUI />
      <label for="search-input">
        <div class="search">
          <i class="iconfont icon-search"></i>
          <input id="search-input" type="text" placeholder="搜一搜" />
        </div>
      </label>
      <HeaderCart />
    </div>
  </div>
</template>
<style scoped lang="less">
.layout-header {
  height: 132px;
  background-color: #fff;
  .Center {
    display: flex;
    align-items: center;
    .logo {
      width: 168px;
      a {
        display: block;
        height: 132px;
        width: 168px;
        background: url('@/assets/logo.png') no-repeat center 18px / contain;
        background-size: 168px;
      }
    }
    .search {
      width: 170px;
      height: 32px;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      line-height: 32px;

      .icon-search {
        font-size: 18px;
        margin-left: 5px;
      }

      input {
        width: 140px;
        padding-left: 5px;
      }
    }
  }
}
</style>
