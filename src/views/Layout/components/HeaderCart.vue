<script setup>
import { useCartStore } from '@/stores'

const cartStore = useCartStore()
</script>

<template>
  <div class="header-cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-shangcheng"></i
      ><em>{{ cartStore.cartList.length }}</em>
    </a>
    <div class="layer">
      <div class="list">
        <div class="item" v-for="i in cartStore.cartList" :key="i.id">
          <RouterLink :to="`/detail/${i.id}`">
            <img :src="i.picture" alt="" />
            <div class="center">
              <p class="name">
                {{ i.name }}
              </p>
              <p class="attr ellipsis">{{ i.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ i.price }}</p>
              <p class="count">x{{ i.count }}</p>
            </div>
          </RouterLink>
          <i
            class="iconfont icon-close-new"
            @click="cartStore.deleteCart(i.skuId)"
          ></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ cartStore.selectedCount }} 件商品</p>
          <p>&yen; {{ cartStore.selectedPrice }}</p>
        </div>
        <el-button
          size="large"
          type="primary"
          @click="$router.push('/cartlist')"
          >去购物车结算</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.header-cart {
  width: 42px;
  position: relative;
  z-index: 600;

  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: block;
  }

  .icon-shangcheng {
    line-height: 32px;
    font-size: 24px;
  }

  em {
    background-color: #e26237;
    width: 18px;
    height: 14px;
    line-height: 14px;
    border-radius: 40%;
    font-size: 12px;
    position: absolute;
    font-style: normal;
    right: 1px;
    top: 0px;
    color: #fff;
  }

  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    height: 400px;
    width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 50px;
    right: 0;
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;
    opacity: 1;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);

    &::before {
      content: '';
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }

    .list {
      height: 310px;
      overflow: auto;
      padding: 0 10px;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f8f8f8;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }

      .item {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        position: relative;

        i {
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 0;
          color: #666;
          transition: all 0.5s;
        }

        &:hover {
          i {
            opacity: 1;
            cursor: pointer;
          }
        }

        a {
          display: flex;
          align-items: center;

          img {
            height: 80px;
            width: 80px;
          }

          .center {
            padding: 0 10px;
            width: 200px;

            .name {
              font-size: 16px;
              word-break: break-all;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            .attr {
              color: #999;
              padding-top: 5px;
            }
          }

          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;

            .price {
              font-size: 16px;
              color: #cf4444;
            }

            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: #cf4444;
          }
        }
      }
    }
  }
}
</style>
