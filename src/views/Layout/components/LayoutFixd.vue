<script setup>
import { useScroll } from '@vueuse/core'
import LayoutHeaderUI from './LayoutHeaderUI.vue'
// import {LayoutHeaderUI} from "./LayoutHeaderUI.vue"
const { y } = useScroll(window)
</script>
<template>
  <div class="layout-fixed" :class="{ show: y > 81 }">
    <div class="Center">
      <RouterLink to="/" class="logo"></RouterLink>
      <LayoutHeaderUI />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.layout-fixed {
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.2s linear;
  &.show {
    transform: none;
    opacity: 1;
  }
  .Center {
    display: flex;
    align-items: center;
    .logo {
      display: inline-block;
      width: 178px;
      height: 80px;
      background: url('@/assets/logo.png') no-repeat 10px -50px;
      background-size: 150px auto;
    }
    .right {
      width: 200px;
      padding-left: 40px;
      border-left: 2px solid #27ba9b;
      text-align: center;
      display: flex;
      a {
        margin-right: 40px;
        width: 38px;
        font-size: 16px;
        display: inline-block;
        line-height: 1;
        &:hover {
          color: #27ba9b;
        }
      }
    }
  }
}
</style>
