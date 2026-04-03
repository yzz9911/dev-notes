import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)
  const isAuthor = ref(localStorage.getItem('isAuthor') === 'true' || false)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (userData) => {
    user.value = userData
    if (userData.role === 'author') {
      isAuthor.value = true
      localStorage.setItem('isAuthor', 'true')
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    isAuthor.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('isAuthor')
  }

  return {
    token,
    user,
    isAuthor,
    isAuthenticated,
    setToken,
    setUser,
    logout
  }
})
