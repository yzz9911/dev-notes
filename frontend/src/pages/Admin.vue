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
        <button @click="openCreateForm" class="btn-create">+ 新建文章</button>
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
              <td>{{ article.title }}</td>
              <td>{{ article.category || '-' }}</td>
              <td>{{ formatDate(article.createdAt) }}</td>
              <td class="actions">
                <button @click="editArticle(article)" class="btn-edit">编辑</button>
                <button @click="deleteArticle(article.id)" class="btn-delete">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 文章编辑表单 -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingArticle ? '编辑文章' : '新建文章' }}</h2>
          <button @click="closeForm" class="btn-close">×</button>
        </div>
        <form @submit.prevent="saveArticle">
          <div class="form-group">
            <label>标题</label>
            <input v-model="formData.title" type="text" required />
          </div>
          <div class="form-group">
            <label>分类</label>
            <input v-model="formData.category" type="text" />
          </div>
          <div class="form-group">
            <label>摘要</label>
            <textarea v-model="formData.excerpt" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>内容</label>
            <textarea v-model="formData.content" rows="10" required></textarea>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeForm" class="btn-cancel">取消</button>
            <button type="submit" class="btn-save">保存</button>
          </div>
        </form>
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
const showForm = ref(false)
const editingArticle = ref(null)
const formData = ref({
  title: '',
  category: '',
  excerpt: '',
  content: ''
})

onMounted(async () => {
  await articleStore.fetchArticles()
})

const openCreateForm = () => {
  editingArticle.value = null
  formData.value = { title: '', category: '', excerpt: '', content: '' }
  showForm.value = true
}

const editArticle = (article) => {
  editingArticle.value = article
  formData.value = { ...article }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingArticle.value = null
}

const saveArticle = async () => {
  try {
    if (editingArticle.value) {
      await articleStore.updateArticle(editingArticle.value.id, formData.value)
    } else {
      await articleStore.createArticle(formData.value)
    }
    closeForm()
  } catch (err) {
    console.error('保存失败:', err)
  }
}

const deleteArticle = async (id) => {
  if (confirm('确定要删除此文章吗？')) {
    try {
      await articleStore.deleteArticle(id)
    } catch (err) {
      console.error('删除失败:', err)
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
  background: #00c853;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
}

.btn-close:hover {
  color: #333;
}

form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-cancel {
  background: #999;
  color: white;
}

.btn-cancel:hover {
  background: #777;
}

.btn-save {
  background: #0066cc;
  color: white;
}

.btn-save:hover {
  background: #0052a3;
}
</style>
