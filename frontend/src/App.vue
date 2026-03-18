<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="navbar-brand">📝 我的博客</router-link>
        <div class="navbar-menu">
          <router-link to="/" class="nav-link">文章列表</router-link>
          <router-link v-if="authStore.isAuthor" to="/admin" class="nav-link">管理后台</router-link>
          <button v-if="!authStore.isAuthenticated" @click="goLogin" class="btn-login">
            登录
          </button>
          <button v-else @click="logout" class="btn-logout">
            退出
          </button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2026 个人技术博客. 由 Vue.js + Spring Boot 驱动</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const goLogin = () => {
  router.push('/login')
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  background: #f5f5f5;
}

.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.navbar-brand:hover {
  color: #0066cc;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #666;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #0066cc;
}

.btn-login,
.btn-logout {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-login {
  background: #0066cc;
  color: white;
}

.btn-login:hover {
  background: #0052a3;
}

.btn-logout {
  background: #ff6b6b;
  color: white;
}

.btn-logout:hover {
  background: #ee5a52;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  width: 100%;
  padding: 0 2rem;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

@media (max-width: 768px) {
  .navbar-menu {
    gap: 1rem;
  }

  .main-content {
    padding: 0 1rem;
  }
}
</style>
