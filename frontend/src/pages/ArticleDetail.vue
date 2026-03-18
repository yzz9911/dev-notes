<template>
  <div class="article-detail">
    <div v-if="loading" class="loading">加载中...</div>

    <template v-else-if="article">
      <div class="article-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="date">{{ formatDate(article.createdAt) }}</span>
          <span class="author">{{ article.author }}</span>
          <span class="category" v-if="article.category">{{ article.category }}</span>
        </div>
      </div>

      <div class="article-content">
        <div v-html="renderedContent" class="markdown-content"></div>
      </div>

      <div class="comments-section">
        <h2>评论 ({{ comments.length }})</h2>

        <div class="comment-form">
          <h3>发表评论</h3>
          <form @submit.prevent="submitComment">
            <div class="form-group">
              <label for="name">昵称</label>
              <input v-model="commentForm.name" id="name" type="text" required />
            </div>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input v-model="commentForm.email" id="email" type="email" required />
            </div>
            <div class="form-group">
              <label for="content">内容</label>
              <textarea v-model="commentForm.content" id="content" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn-submit">发表评论</button>
          </form>
        </div>

        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment-header">
              <strong>{{ comment.name }}</strong>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="not-found">
      <p>文章不存在</p>
      <router-link to="/">返回列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useArticleStore } from '@/store/article'
import { commentService } from '@/services/index'

const route = useRoute()
const articleStore = useArticleStore()

const article = ref(null)
const comments = ref([])
const loading = ref(true)
const commentForm = ref({
  name: '',
  email: '',
  content: ''
})

const renderedContent = computed(() => {
  return article.value ? marked(article.value.content) : ''
})

onMounted(async () => {
  await articleStore.fetchArticleById(route.params.id)
  article.value = articleStore.currentArticle
  
  if (article.value) {
    // 获取评论
    try {
      const response = await commentService.getComments(route.params.id)
      comments.value = response.data
    } catch (err) {
      console.error('获取评论失败:', err)
    }
  }
  
  loading.value = false
})

const submitComment = async () => {
  try {
    const response = await commentService.createComment(route.params.id, commentForm.value)
    comments.value.push(response.data)
    commentForm.value = { name: '', email: '', content: '' }
  } catch (err) {
    console.error('发表评论失败:', err)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.article-detail {
  max-width: 900px;
  margin: 0 auto;
}

.loading,
.not-found {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #999;
}

.article-header {
  margin-bottom: 2rem;
}

.article-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.article-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.95rem;
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

.article-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.markdown-content {
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;
}

.markdown-content h2,
.markdown-content h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.markdown-content p {
  margin-bottom: 1rem;
}

.markdown-content code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.markdown-content a {
  color: #0066cc;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.comments-section {
  margin-top: 3rem;
}

.comments-section h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
}

.comment-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comment-form h3 {
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
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

.form-group textarea {
  resize: vertical;
}

.btn-submit {
  background: #0066cc;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #0052a3;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.comment-header strong {
  color: #333;
}

.comment-date {
  font-size: 0.9rem;
  color: #999;
}

.comment-content {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 2rem;
  }

  .article-content,
  .comment-form,
  .comment {
    padding: 1.5rem;
  }
}
</style>
