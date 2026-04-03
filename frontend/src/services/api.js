import axios from 'axios'
import { useAuthStore } from '@/store/auth'

// 判断运行环境，在 Docker 中使用服务名，本地开发用 localhost
const getApiBaseUrl = () => {
  // 如果是本地开发环境，使用相对路径利用 vite 代理
  if (import.meta.env.DEV) {
    return '/api'
  }
  // 生产环境或 Docker 中，使用相对于当前 host 的路径
  return '/api'
}

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
