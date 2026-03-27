import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/services/api'

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const currentArticle = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const articleCount = computed(() => articles.value.length)

  const fetchArticles = async () => {
    loading.value = true
    try {
      const response = await apiClient.get('/articles')
      articles.value = response.data
      error.value = null
    } catch (err) {
      error.value = err.message
      console.error('获取文章列表失败:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchArticleById = async (id) => {
    loading.value = true
    try {
      const response = await apiClient.get(`/articles/${id}`)
      currentArticle.value = response.data
      error.value = null
    } catch (err) {
      error.value = err.message
      console.error('获取文章失败:', err)
    } finally {
      loading.value = false
    }
  }

  const createArticle = async (articleData) => {
    try {
      const response = await apiClient.post('/articles', articleData)
      articles.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateArticle = async (id, articleData) => {
    try {
      const response = await apiClient.put(`/articles/${id}`, articleData)
      const index = articles.value.findIndex(a => a.id === id)
      if (index > -1) {
        articles.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteArticle = async (id) => {
    try {
      await apiClient.delete(`/articles/${id}`)
      articles.value = articles.value.filter(a => a.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    articles,
    currentArticle,
    loading,
    error,
    articleCount,
    fetchArticles,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle
  }
})
