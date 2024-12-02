import axios from 'axios'
import { useUserStore } from '@/stores';
import router from '@/router'




const httpRequest = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 6000
})

// 添加请求拦截器
httpRequest.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpRequest.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  ElMessage({
    type: 'warning',
    message: error.response?.data.message+'，请稍后再试'
  })
  if (error.response?.status === 401) {
    useUserStore().resetUserInfo()
    router.push('/login')
  }
  return Promise.reject(error);
});

export default httpRequest