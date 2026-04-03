<template>
  <div class="home-page">
    <div class="articles-header">
      <div class="header-top">
        <h1>所有文章</h1>
        <button
          v-if="authStore.isAuthenticated"
          @click="() => router.push('/publish')"
          class="btn-publish"
        >
          + 发布文章
        </button>
      </div>
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索文章..."
          @keyup.enter="handleSearch"
        />
        <button @click="handleSearch" class="btn-search">搜索</button>
        <button v-if="searchResults !== null" @click="clearSearch" class="btn-clear">清空</button>
      </div>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <div v-else-if="articles.length === 0" class="empty-state">
      <p>还没有文章，敬请期待！</p>
    </div>

    <div v-else class="articles-list">
      <article v-for="article in articles" :key="article.id" class="article-card">
        <h2 class="article-title">
          <router-link :to="`/article/${article.id}`">
            {{ article.title }}
          </router-link>
        </h2>
        <div class="article-meta">
          <span class="date">{{ formatDate(article.createdAt) }}</span>
          <span class="author">{{ article.author }}</span>
          <span class="category" v-if="article.category">{{ article.category }}</span>
        </div>
        <p class="article-excerpt">{{ article.excerpt || truncateContent(article.content, 200) }}</p>
        <router-link :to="`/article/${article.id}`" class="read-more">
          阅读全文 →
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/store/article'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const articleStore = useArticleStore()
const authStore = useAuthStore()
const searchQuery = ref('')
const loading = ref(false)
const allArticles = ref([])
const searchResults = ref(null)

const articles = computed(() => {
  // 如果有搜索结果，显示搜索结果
  if (searchResults.value !== null) {
    return searchResults.value
  }
  return allArticles.value
})

onMounted(async () => {
  loading.value = true
  await articleStore.fetchArticles()
  allArticles.value = articleStore.articles
  loading.value = false
})

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = null
    return
  }

  loading.value = true
  try {
    const results = await articleStore.searchArticles(searchQuery.value)
    searchResults.value = results
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const truncateContent = (content, length) => {
  if (!content) return ''
  return content.length > length ? content.substring(0, length) + '...' : content
}
</script>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
}

.articles-header {
  margin-bottom: 3rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.articles-header h1 {
  font-size: 2.5rem;
  color: #333;
}

.btn-publish {
  padding: 0.75rem 1.5rem;
  background: #00c853;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-publish:hover {
  background: #00a842;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-search {
  padding: 0.75rem 1.5rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-search:hover {
  background: #0052a3;
}

.btn-clear {
  padding: 0.75rem 1.5rem;
  background: #999;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-clear:hover {
  background: #777;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #999;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.article-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.article-title {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}

.article-title a {
  text-decoration: none;
  color: #0066cc;
  transition: color 0.3s;
}

.article-title a:hover {
  color: #0052a3;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #999;
  flex-wrap: wrap;
}

.date,
.author,
.category {
  display: inline-block;
}

.category {
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  color: #0066cc;
  text-decoration: none;
  transition: color 0.3s;
}

.read-more:hover {
  color: #0052a3;
}

@media (max-width: 768px) {
  .articles-header h1 {
    font-size: 2rem;
  }

  .header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .btn-publish {
    width: 100%;
  }

  .article-card {
    padding: 1.5rem;
  }
}
</style>
