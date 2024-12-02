import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/index.vue'),
          meta: {
            title: '分类'
          }
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/SubCategory/index.vue'),
          meta: {
            title: '子分类'
          }
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue'),
          meta: {
            title: '商品详情'
          }
        },
        {
          path: 'cartlist',
          component: () => import('@/views/CartList/index.vue'),
          meta: {
            title: '购物车'
          }
        },
        {
          path: 'checkout',
          component: () => import('@/views/Checkout/index.vue'),
          meta: {
            title: '结算'
          }
        },
        {
          path: 'pay',
          component: () => import('@/views/Pay/index.vue'),
          meta: {
            title: '支付'
          }
        },
        {
          path: 'paycallback',
          component: () => import('@/views/Pay/components/PayBack.vue')
        },
        {
          path: 'member',
          component: () => import('@/views/Member/index.vue'),
          meta: {
            title: '个人中心'
          },
          children: [
            {
              path: '',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title + ' - 商城' || '首页 - 商城'
})

export default router
