<template>
  <div class="publish-page">
    <div class="publish-container">
      <div class="publish-main">
        <div class="publish-header">
          <h1>{{ editingId ? '编辑文章' : '发布新文章' }}</h1>
          <router-link to="/admin" class="btn-back">← 返回管理</router-link>
        </div>

        <form @submit.prevent="submitArticle" class="publish-form">
          <div class="form-group">
            <label>文章标题 *</label>
            <input v-model="formData.title" type="text" placeholder="输入文章标题" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>分类</label>
              <input v-model="formData.category" type="text" placeholder="如：技术、生活、随笔" />
            </div>
            <div class="form-group">
              <label>摘要</label>
              <textarea v-model="formData.excerpt" rows="2" placeholder="文章摘要（可选）"></textarea>
            </div>
          </div>

          <div class="form-group">
            <label>文章内容 *</label>
            <div class="editor-wrapper">
              <textarea
                v-model="formData.content"
                class="markdown-editor"
                placeholder="输入 Markdown 内容"
                required
              ></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="goBack" class="btn-cancel">取消</button>
            <button type="submit" class="btn-save">{{ editingId ? '更新' : '发布' }}</button>
          </div>
        </form>
      </div>

      <div class="markdown-hints">
        <h2>Markdown 格式指南</h2>

        <div class="hint-section">
          <h3>📝 基础格式</h3>
          <div class="hint-item">
            <span class="hint-label"># 标题1</span>
            <span>最大标题</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">## 标题2</span>
            <span>二级标题</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">### 标题3</span>
            <span>三级标题</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">**加粗文本**</span>
            <span>粗体</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">*斜体文本*</span>
            <span>斜体</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">~~删除线~~</span>
            <span>删除线</span>
          </div>
        </div>

        <div class="hint-section">
          <h3>📋 列表</h3>
          <div class="hint-item">
            <span class="hint-label">- 项目1<br/>- 项目2</span>
            <span>无序列表</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">1. 项目1<br/>2. 项目2</span>
            <span>有序列表</span>
          </div>
        </div>

        <div class="hint-section">
          <h3>🔗 链接和图片</h3>
          <div class="hint-item">
            <span class="hint-label">[链接文本](url)</span>
            <span>超链接</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">![图片描述](url)</span>
            <span>插入图片</span>
          </div>
        </div>

        <div class="hint-section">
          <h3>💻 代码</h3>
          <div class="hint-item">
            <span class="hint-label">`代码`</span>
            <span>行内代码</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">```js<br/>code<br/>```</span>
            <span>代码块</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">```mermaid<br/>graph TD<br/>```</span>
            <span>Mermaid 图表</span>
          </div>
        </div>

        <div class="hint-section">
          <h3>📊 表格</h3>
          <div class="hint-item">
            <span class="hint-label">| 列1 | 列2 |<br/>|---|---|<br/>| A | B |</span>
            <span>表格</span>
          </div>
        </div>

        <div class="hint-section">
          <h3>🎨 Mermaid 图表示例</h3>
          <div class="hint-item" style="flex-direction: column; align-items: flex-start;">
            <span class="hint-label" style="margin-bottom: 0.5rem;">流程图</span>
            <pre style="margin: 0; font-size: 0.75rem;">```mermaid
graph TD
  A[开始] --> B{判断}
  B -->|是| C[处理1]
  B -->|否| D[处理2]
  C --> E[结束]```</pre>
          </div>
          <div class="hint-item" style="flex-direction: column; align-items: flex-start;">
            <span class="hint-label" style="margin-bottom: 0.5rem;">类图</span>
            <pre style="margin: 0; font-size: 0.75rem;">```mermaid
classDiagram
  class Article
  Article: String title
  Article: save()```</pre>
          </div>
        </div>

        <div class="hint-section">
          <h3>⚙️ 其他格式</h3>
          <div class="hint-item">
            <span class="hint-label">> 引用内容</span>
            <span>引用块</span>
          </div>
          <div class="hint-item">
            <span class="hint-label">---</span>
            <span>分割线</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArticleStore } from '@/store/article'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const articleStore = useArticleStore()
const authStore = useAuthStore()

const editingId = ref(null)
const formData = ref({
  title: '',
  category: '',
  excerpt: '',
  content: ''
})

onMounted(async () => {
  // 检查是否是编辑模式
  if (route.query.id) {
    editingId.value = route.query.id
    // 加载文章内容
    await articleStore.fetchArticleById(editingId.value)
    const article = articleStore.currentArticle
    if (article) {
      formData.value = {
        title: article.title,
        category: article.category,
        excerpt: article.excerpt,
        content: article.content
      }
    }
  }
})

const submitArticle = async () => {
  try {
    const articleData = {
      ...formData.value,
      author: authStore.user?.username || 'Author'
    }

    if (editingId.value) {
      await articleStore.updateArticle(editingId.value, articleData)
    } else {
      await articleStore.createArticle(articleData)
    }

    alert(editingId.value ? '文章已更新' : '文章已发布')
    router.push('/admin')
  } catch (err) {
    console.error('保存失败:', err)
    alert('保存失败: ' + (err.response?.data?.message || err.message))
  }
}

const goBack = () => {
  router.push('/admin')
}
</script>

<style scoped>
.publish-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.publish-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.publish-main {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.publish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.publish-header h1 {
  font-size: 2rem;
  color: #333;
}

.btn-back {
  padding: 0.5rem 1rem;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-back:hover {
  background: #555;
}

.publish-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 4px rgba(0, 102, 204, 0.3);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.editor-wrapper {
  display: flex;
}

.markdown-editor {
  flex: 1;
  min-height: 400px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
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

.markdown-hints {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  position: sticky;
  top: 2rem;
}

.markdown-hints h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #0066cc;
  padding-bottom: 0.5rem;
}

.hint-section {
  margin-bottom: 1.5rem;
}

.hint-section h3 {
  font-size: 0.95rem;
  color: #0066cc;
  margin-bottom: 0.75rem;
}

.hint-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.hint-label {
  font-family: 'Monaco', 'Courier New', monospace;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 3px;
  flex: 0 0 auto;
  max-width: 150px;
  word-break: break-word;
  color: #d63384;
}

.hint-item span:last-child {
  color: #666;
  align-self: center;
}

.hint-item pre {
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 3px;
  margin: 0;
  color: #333;
  overflow-x: auto;
}

@media (max-width: 1024px) {
  .publish-container {
    grid-template-columns: 1fr;
  }

  .markdown-hints {
    position: relative;
    top: 0;
    max-height: none;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .publish-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .markdown-editor {
    min-height: 300px;
  }
}
</style>
