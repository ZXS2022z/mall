<script setup>
import DetailHot from './components/DetailHot.vue'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getDetailAPI } from '@/api/detail'
import ImageView from './components/ImageView.vue'
import Sku from './components/Sku.vue'
import { useCartStore } from '@/stores'

const count = ref(1)
const detail = ref({})
const route = useRoute()
const getDetail = async (id = route.params.id) => {
  const res = await getDetailAPI(id)
  detail.value = res.data.result
  detail.value.mainPictures = detail.value.mainPictures.filter((e) => {
    return e !== '' && e
  })
  // console.log(detail.value)
  // console.log(route)
}
onMounted(() => getDetail())
// onUpdated(()=>getDetail())
onBeforeRouteUpdate(async (to) => {
  detail.value = {}
  getDetail(to.params.id)
})
const cartStore = useCartStore()

let skuObj = ref({})
const skuChange = (sku) => {
  console.log(sku)
  skuObj.value = sku
}

const handleCountChange = (value) => {
  if (!skuObj.value?.inventory) {
    ElMessage.error('请选择商品规格')
    count.value = 1
  } else if (value < 1) {
    ElMessage.warning('库存达到下限')
    count.value = 1
  } else if (value >= skuObj.value.inventory) {
    ElMessage.warning('库存达到上限')
    count.value = skuObj.value.inventory
  }
}

const addCart = () => {
  if (skuObj.value.skuId) {
    cartStore.addCart({
      id: detail.value.id,
      name: detail.value.name,
      picture: detail.value.mainPictures[0],
      price: detail.value.price,
      count: count.value,
      skuId: skuObj.value.skuId,
      attrsText: skuObj.value.specsText,
      selected: true
    })
  } else {
    ElMessage.error('请选择商品规格')
  }
}
</script>
<template>
  <div class="detail-page">
    <div class="Center" v-if="detail.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{ path: `/category/${detail.categories?.[1].id}` }"
          >
            {{ detail?.categories?.[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{ path: `/category/sub/${detail.categories?.[0].id}` }"
          >
            {{ detail?.categories?.[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ detail.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info-container">
        <div class="goods-info">
          <div class="media">
            <!-- 图片预览区 -->
            <ImageView :mainPictures="detail.mainPictures" />
            <!-- 统计数量 -->
            <ul class="goods-sales">
              <li>
                <p>销量人气</p>
                <p>{{ detail.salesCount }}</p>
                <p><i class="iconfont icon-task-filling"></i>销量人气</p>
              </li>
              <li>
                <p>商品评价</p>
                <p>{{ detail.commentCount }}</p>
                <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
              </li>
              <li>
                <p>收藏人气</p>
                <p>{{ detail.collectCount }}</p>
                <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
              </li>
              <li>
                <p>品牌信息</p>
                <p>{{ detail.brand?.name }}</p>
                <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
              </li>
            </ul>
          </div>
          <div class="spec">
            <p class="g-name">{{ detail.name }}</p>
            <p class="g-desc">{{ detail.desc }}</p>
            <p class="g-price">
              <span>{{ detail.price }}</span>
              <span
                ><s>{{ detail.oldPrice }}</s></span
              >
            </p>
            <div class="g-service">
              <dl>
                <dt>促销</dt>
                <dd>12月好物放送，App领券购买直降120元</dd>
              </dl>
              <dl>
                <dt>服务</dt>
                <dd>
                  <span>无忧退货</span>
                  <span>快速退款</span>
                  <span>免费包邮</span>
                  <a href="javascript:;">了解详情</a>
                </dd>
              </dl>
            </div>
            <!-- sku组件 -->
            <!-- <XtxSku :goods="goods" @change="console.log()" /> -->
            <Sku :detail="detail" @change="skuChange"></Sku>
            <!-- 数据组件 -->
            <el-input-number
              v-model="count"
              @change="handleCountChange"
              :max="skuObj.inventory"
              :min="1"
            />
            <!-- 按钮组件 -->
            <div>
              <el-button size="large" class="btn" @click="addCart">
                加入购物车
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-footer">
        <div class="goods-article">
          <div class="goods-tabs">
            <nav>
              <a>商品详情</a>
            </nav>
            <div class="goods-detail">
              <ul class="attrs">
                <li v-for="item in detail.details?.properties" :key="item.name">
                  <span class="dt">{{ item.name }}</span>
                  <span class="dd">{{ item.value }}</span>
                </li>
              </ul>
              <img
                v-for="img in detail.details?.pictures"
                :src="img"
                :key="img"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="goods-aside">
          <!-- 24小时 -->
          <DetailHot :hot-type="1"> </DetailHot>
          <!-- 周 -->
          <DetailHot :hot-type="2" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.detail-page {
  .bread-container {
    padding: 25px 0;
    // color: greenyellow;
  }

  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;

      .goods-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;
        font-size: 14px;

        li {
          flex: 1;
          position: relative;

          ~ li::after {
            position: absolute;
            top: 10px;
            left: 0;
            height: 60px;
            border-left: 1px solid #e4e4e4;
            content: '';
          }

          p {
            &:first-child {
              color: #999;
            }

            &:nth-child(2) {
              color: #cf4444;
              margin-top: 10px;
            }

            &:last-child {
              color: #666;
              margin-top: 10px;

              i {
                color: #27ba9b;
                font-size: 14px;
                margin-right: 2px;
              }

              &:hover {
                color: #27ba9b;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .spec {
      padding: 30px 30px 30px 0;

      .g-name {
        font-size: 22px;
      }

      .g-desc {
        color: #999;
        margin-top: 10px;
        font-size: 14px;
      }

      .g-price {
        margin-top: 10px;

        span {
          &:first-child {
            color: #cf4444;
            margin-right: 10px;
            font-size: 22px;
          }

          &:last-child {
            color: #999;
          }
        }
      }
      .btn {
        margin-top: 20px;
      }
    }

    .g-service {
      background: #f5f5f5;
      width: 500px;
      padding: 20px 10px 0 10px;
      margin-top: 10px;
      font-size: 14px;

      dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;

        dt {
          width: 50px;
          color: #999;
        }

        dd {
          color: #666;

          &:last-child {
            span {
              margin-right: 10px;

              &::before {
                content: '•';
                color: #27ba9b;
                margin-right: 2px;
              }
            }

            a {
              color: #27ba9b;
            }
          }
        }
      }
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;

      .goods-tabs {
        background: #fff;

        nav {
          border-bottom: 1px solid #f5f5f5;

          a {
            display: inline-block;
            line-height: 70px;
            height: 70px;

            padding: 0 40px;
            font-size: 18px;
            color: #333;
          }
        }

        .goods-detail {
          padding: 40px;

          .attrs {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30px;
            font-size: 14px;

            li {
              display: flex;
              width: 50%;
              margin-bottom: 10px;
              align-items: center;
              .dt {
                width: 100px;
                color: #999;
              }

              .dd {
                margin-left: 10px;
                flex: 1;
                color: #666;
              }
            }
          }

          img {
            width: 100%;
          }
        }
      }
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }
}
</style>
