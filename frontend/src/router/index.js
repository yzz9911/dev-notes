import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Home from '@/pages/HomePage.vue'
import ArticleDetail from '@/pages/ArticleDetail.vue'
import Login from '@/pages/Login.vue'
import Admin from '@/pages/Admin.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '文章列表' }
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: { title: '文章详情' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { title: '管理后台', requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
  
  // 更新页面标题
  document.title = to.meta.title ? `${to.meta.title} - 我的博客` : '我的博客'
})

export default router
