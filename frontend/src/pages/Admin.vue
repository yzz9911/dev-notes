<template>
  <div class="admin-page">
    <h1>管理后台</h1>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-btn', { 'tab-active': currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- 文章列表标签 -->
    <div v-if="currentTab === '文章管理'" class="tab-content">
      <div class="articles-toolbar">
        <router-link to="/publish" class="btn-create">+ 新建文章</router-link>
      </div>

      <div class="articles-table">
        <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>分类</th>
              <th>发布时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articleStore.articles" :key="article.id">
              <td>
                <router-link :to="`/article/${article.id}`" class="article-title-link">
                  {{ article.title }}
                </router-link>
              </td>
              <td>{{ article.category || '-' }}</td>
              <td>{{ formatDate(article.createdAt) }}</td>
              <td class="actions">
                <router-link :to="`/publish?id=${article.id}`" class="btn-edit">编辑</router-link>
                <button @click="deleteArticle(article.id)" class="btn-delete">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 设置标签 -->
    <div v-if="currentTab === '设置'" class="tab-content">
      <div class="settings-form">
        <h2>网站设置</h2>
        <p>TODO: 添加网站设置表单</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '@/store/article'

const articleStore = useArticleStore()
const currentTab = ref('文章管理')
const tabs = ref(['文章管理', '设置'])

onMounted(async () => {
  await articleStore.fetchArticles()
})

const deleteArticle = async (id) => {
  if (confirm('确定要删除此文章吗？')) {
    try {
      await articleStore.deleteArticle(id)
      await articleStore.fetchArticles()
    } catch (err) {
      console.error('删除失败:', err)
      alert('删除失败: ' + err.message)
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-page h1 {
  margin-bottom: 2rem;
  color: #333;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  transition: all 0.3s;
}

.tab-btn:hover {
  color: #0066cc;
}

.tab-active {
  color: #0066cc;
  border-bottom-color: #0066cc;
}

.tab-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.articles-toolbar {
  margin-bottom: 2rem;
}

.btn-create {
  display: inline-block;
  background: #00c853;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-create:hover {
  background: #00a842;
}

.articles-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f5f5f5;
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;
}

.article-title-link {
  color: #0066cc;
  text-decoration: none;
  transition: color 0.3s;
}

.article-title-link:hover {
  color: #0052a3;
  text-decoration: underline;
}

.btn-edit {
  background: #0066cc;
  color: white;
}

.btn-edit:hover {
  background: #0052a3;
}

.btn-delete {
  background: #ff6b6b;
  color: white;
}

.btn-delete:hover {
  background: #ee5a52;
}

.settings-form {
  padding: 2rem;
}

.settings-form h2 {
  margin-bottom: 1rem;
  color: #333;
}
</style>
