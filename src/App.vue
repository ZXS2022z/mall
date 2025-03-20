<script setup></script>

<template>
  <!-- <router-view></router-view> -->
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background: #f5f5f5;user-select: none; //禁止用户选中该元素中的文本内容。防止用户意外选中一些不应该被选中的区域，或保持页面的特定布局和设计不被用户的选择操作所干扰。
}

body {
  min-width: 1240px;
  font:
    1em / 1.4 'Microsoft Yahei','PingFang SC',
    'Avenir',
    'Segoe UI',
    'Hiragino Sans GB',
    'STHeiti',
    'Microsoft Sans Serif',
    'WenQuanYi Micro Hei',
    sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
}

input[type='text'],
input[type='search'],
input[type='password'],
input[type='checkbox'] {
  padding: 0;
  border: none; /* 去除边框 */
  outline: none; /* 去除聚焦时的轮廓线 */
  background-color: transparent; /* 使背景透明 */
  &::placeholder {
    color: #ccc;
  }
}

i {
  font-style: normal;
}

img {
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
  background: #ebebeb url('@/assets/200.png') no-repeat center / contain;
}

a {
  text-decoration: none;
  color: #000;
}

ul {
  list-style: none;
}

.Center {
  width: 1240px;
  margin: 0 auto;
  position: relative;
}

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ellipsis2 {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.el-breadcrumb__inner.is-link {
  font-weight: 400 !important;
}
</style>
