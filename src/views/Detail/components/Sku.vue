<script setup>
import { defineProps, defineEmits, onMounted } from 'vue'
import getPowerSet from './power-set'

const emit = defineEmits(['change'])
const { detail } = defineProps({
  detail: {
    type: Object,
    default: () => ({ specs: [], skus: [] })
  }
})

const { skus, specs } = detail

let pathMap = {}

const getPathMap = () => {
  if (skus && skus.length > 0) {
    skus.forEach((sku) => {
      if (sku.inventory) {
        const specs = sku.specs.map((spec) => spec.valueName)
        const powerSet = getPowerSet(specs)
        powerSet.forEach((set) => {
          const key = set.join('-')
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          pathMap[key].push(sku.id)
        })
      }
    })
  }
}
const init = () => {
  getPathMap()
  if (specs && specs.length > 0) {
    specs.forEach((spec) => {
      spec.values.forEach((val) => {
        val.disabled = !pathMap[val.name]
      })
    })
  }
}

const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find((val) => val.selected)
    selectedArr[index] = selectedVal ? selectedVal.name : undefined
  })
  return selectedArr
}

const updateDisabledStatus = () => {
  const selectedArr = getSelectedArr(specs)
  specs.forEach((item, i) => {
    item.values.forEach((val) => {
      if (!val.selected) {
        selectedArr[i] = val.name
        const key = selectedArr.filter((value) => value).join('-')
        val.disabled = !pathMap[key]
      }
    })
  })
}

const clickSpecs = (item, val) => {
  if (val.disabled) return
  if (val.selected) val.selected = !val.selected
  else {
    item.values.forEach((bv) => {
      bv.selected = false
    })
    val.selected = true
  }

  updateDisabledStatus()

  const selectedArr = getSelectedArr(specs)
  const select = selectedArr.findIndex((x) => x === undefined)
  console.log(selectedArr, select)
  if (select === -1) {
    const skuId = pathMap[selectedArr.join('-')][0]
    const sku = skus.find((sku) => sku.id === skuId)
    console.log(sku)
    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs
        .reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '')
        .trim()
    })
  }
}

onMounted(() => {
  init()
})

// console.log(detail)
</script>

<template>
  <!-- <div style="height:94px ;width: 630px;border: 1px solid #bbb;"></div> -->
  <div class="sku">
    <dl v-for="item in detail.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="(value, index) in item.values" :key="index">
          <img
            v-if="value.picture"
            :src="value.picture"
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="clickSpecs(item, value)"
            alt=""
          />
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="clickSpecs(item, value)"
          >
            {{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<style scoped lang="less">
.sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        vertical-align: middle;
        background: #ebebeb url('@/assets/200.png') no-repeat center / contain;
        .sku-state-mixin();
      }

      span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        .sku-state-mixin();
      }
    }
  }
}
</style>
