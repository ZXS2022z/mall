<script setup>
defineProps(['title', 'subTitle'])
</script>
<template>
  <div class="home-panel">
    <div class="Center">
      <div class="home-panel-header">
        <h3>
          {{ title }} <small>{{ subTitle }}</small>
        </h3>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="less">
.home-panel {
  background-color: #fff;

  .home-panel-header {
    display: flex;
    align-items: flex-end;
    padding: 40px 0;
    h3 {
      flex: 1;
      font-size: 32px;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        color: #999;
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
}
</style>
