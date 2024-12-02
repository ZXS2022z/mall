<script setup>
import { ref, defineProps, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const props = defineProps({
  mainPictures: {
    type: Array,
    default: () => []
  }
})

const activeIndex = ref(0)
const middleBox = ref(null)
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)

const { elementX, elementY, isOutside } = useMouseInElement(middleBox)

watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return

  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  } else if (elementX.value < 100) {
    left.value = 0
  } else {
    left.value = 200
  }

  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  } else if (elementY.value < 100) {
    top.value = 0
  } else {
    top.value = 200
  }

  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})
</script>
<template>
  <!-- <div style="width: 480px; height: 400px;">
    <span style="width: 400px; height: 400px; background-color: #27ba9b; display: inline-block;"></span>
    <span style="width: 80px; height: 400px; border: 1px solid #ccc; display: inline-block;"></span>
  </div> -->
  <div class="image-view">
    <div class="middle" ref="middleBox">
      <img :src="props.mainPictures[activeIndex]" alt="product image" />
      <div
        class="layer"
        v-show="!isOutside"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <ul class="small">
      <li
        v-for="(item, index) in props.mainPictures"
        :key="index"
        :class="{ active: index === activeIndex }"
        @mouseenter="activeIndex = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
    <!-- :style="
    `background-image:url(${props.mainPictures[activeIndex]});
    background-position-x:${positionX}px;
    background-position-y:${positionY}px;`" -->

    <div
      class="large"
      :style="{
        backgroundImage: `url(${props.mainPictures[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`
      }"
      v-show="!isOutside"
    ></div>
  </div>
</template>
<style scoped lang="less">
.image-view {
  position: relative;
  width: 480px;
  height: 400px;
  display: flex;

  img {
    width: 100%;
    height: 100%;
  }

  .middle {
    width: 400px;
    height: 400px;

    .layer {
      position: absolute;
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-repeat: no-repeat;
      background-size: 800px 800px;
      left: 0;
      top: 0;
    }
  }

  .small {
    width: 80px;
    height: 400px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid #27ba9b;
      }
    }
  }

  .large {
    position: absolute;
    left: 412px;
    top: 0;
    width: 400px;
    height: 400px;
    background-color: rgba(155, 155, 155, 0.3);
    z-index: 99;
  }
}
</style>
