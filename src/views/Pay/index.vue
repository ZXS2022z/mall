<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getOrderAPI } from '@/api/pay'
import { useRoute } from 'vue-router'

const route = useRoute()
const payInfo = ref({})
const getPayInfo = async () => {
  const res = await getOrderAPI(route.query.id)
  payInfo.value = res.data.result
  time.value = payInfo.value.payLatestTime
  console.log(payInfo.value)
}
onMounted(async () => {
  await getPayInfo()
  getTime()
})

const time = ref('00分00秒') // "2024-10-31 17:31:10"
let id = null
const getTime = () => {
  const LatestTime = new Date(time.value).getTime()
  id = setInterval(() => {
    const remainingTime = LatestTime - new Date().getTime()
    const minutes = Math.floor(remainingTime / (60 * 1000))
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000)
    time.value = `${minutes}分${seconds}秒`
  }, 1000)
}
onUnmounted(() => {
  clearInterval(id)
})

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const backURL = 'http://127.0.0.1:5173/paycallback'
const redirectUrl = encodeURIComponent(backURL)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
</script>
<template>
  <div class="pay">
    <div class="Center">
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>
            支付还剩 <span>{{ time }}</span
            >, 超时后将取消订单
          </p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay {
  margin-top: 20px;

  .pay-info {
    padding: 0 80px;
    height: 240px;
    background-color: #fff;
    display: flex;
    align-items: center;

    .icon {
      font-size: 80px;
      color: #1dc779;
    }

    .tip {
      padding-left: 10px;
      flex: 1;

      p {
        &:first-child {
          font-size: 20px;
          margin-bottom: 5px;
        }

        &:last-child {
          color: #999;
        }
      }
    }

    .amount {
      span {
        &:first-child {
          color: #999;
        }

        &:last-child {
          color: #cf4444;
          font-size: 20px;
        }
      }
    }
  }

  .pay-type {
    margin-top: 20px;
    background-color: #fff;
    padding-bottom: 70px;

    p {
      line-height: 70px;
      height: 70px;
      padding-left: 30px;
      font-size: 16px;

      &.head {
        border-bottom: 1px solid #f5f5f5;
      }
    }

    .btn {
      width: 150px;
      height: 50px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 48px;
      margin-left: 30px;
      color: #666666;
      display: inline-block;

      &.active,
      &:hover {
        border-color: #27ba9b;
      }

      &.alipay {
        background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
          no-repeat center / contain;
      }

      &.wx {
        background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
          no-repeat center / contain;
      }
    }
  }
}
</style>
