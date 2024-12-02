<script setup>
import { useCartStore } from '@/stores'

const cartStore = useCartStore()

const select = (i, selected) => {
  cartStore.singleSelect(i.skuId, { selected, count: i.count })
}
const selectAll = (selected) => {
  cartStore.allSelect(selected)
}
</script>
<template>
  <div class="cart-list">
    <div class="Center">
      <table>
        <thead>
          <tr>
            <th width="120">
              <el-checkbox :model-value="cartStore.isAll" @change="selectAll" />
            </th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in cartStore.cartList" :key="i.id">
            <td>
              <!-- 单选框 -->
              <el-checkbox
                :model-value="i.selected"
                @change="(selected) => select(i, selected)"
              />
            </td>
            <td>
              <div class="goods">
                <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                <div>
                  <p class="ellipsis">
                    {{ i.name }}
                  </p>
                </div>
              </div>
            </td>
            <td class="tc">
              <p>&yen;{{ i.price }}</p>
            </td>
            <td class="tc">
              <el-input-number v-model="i.count" />
            </td>
            <td class="tc">
              <p class="red">&yen;{{ (i.count * i.price).toFixed(2) }}</p>
            </td>
            <td class="tc">
              <p>
                <el-popconfirm
                  title="确认删除吗?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="cartStore.deleteCart(i.skuId)"
                >
                  <template #reference>
                    <a href="javascript:;">删除</a>
                  </template>
                </el-popconfirm>
              </p>
            </td>
          </tr>
          <tr v-if="cartStore.cartList.length === 0">
            <td colspan="6">
              <div class="cart-none">
                <el-empty description="购物车列表为空">
                  <div @click="$router.push('/')" class="go-home">
                    <el-button type="primary" @click="$router.push('/')"
                      >随便逛逛</el-button
                    >
                  </div>
                </el-empty>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="action">
        <div class="batch">
          共 {{ cartStore.totalCount }} 件商品，已选择
          {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice }} </span>
        </div>
        <div class="total">
          <el-button
            size="large"
            type="primary"
            @click="$router.push('/checkout')"
            >下单结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-list {
  margin-top: 20px;

  .Center {
    background-color: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        line-height: 50px;
        font-weight: normal;
      }

      .cart-none {
        padding: 120px 0;
      }

      .goods {
        display: flex;
        align-items: center;

        img {
          width: 100px;
          height: 100px;
        }

        div {
          width: 280px;
          padding-left: 10px;
        }
      }

      .tc {
        text-align: center;
        a {
          font-size: 14px;
          color: #27ba9b;
        }
      }
    }

    .red {
      color: #cf4444;
    }

    .action {
      display: flex;
      background: #fff;
      margin-top: 20px;
      height: 80px;
      align-items: center;
      font-size: 16px;
      justify-content: space-between;
      padding: 0 30px;
      color: #333;

      .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
