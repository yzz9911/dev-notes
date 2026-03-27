import apiClient from './api'

export const articleService = {
  // 获取所有文章
  getArticles: (params = {}) => {
    return apiClient.get('/articles', { params })
  },

  // 获取单个文章
  getArticle: (id) => {
    return apiClient.get(`/articles/${id}`)
  },

  // 创建文章
  createArticle: (data) => {
    return apiClient.post('/articles', data)
  },

  // 更新文章
  updateArticle: (id, data) => {
    return apiClient.put(`/articles/${id}`, data)
  },

  // 删除文章
  deleteArticle: (id) => {
    return apiClient.delete(`/articles/${id}`)
  },

  // 搜索文章
  searchArticles: (keyword) => {
    return apiClient.get('/articles/search', { params: { q: keyword } })
  }
}

export const commentService = {
  // 获取评论
  getComments: (articleId) => {
    return apiClient.get(`/articles/${articleId}/comments`)
  },

  // 创建评论
  createComment: (articleId, data) => {
    return apiClient.post(`/articles/${articleId}/comments`, data)
  },

  // 删除评论
  deleteComment: (articleId, commentId) => {
    return apiClient.delete(`/articles/${articleId}/comments/${commentId}`)
  }
}

export const uploadService = {
  // 上传图片
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export const authService = {
  // 登录
  login: (username, password) => {
    return apiClient.post('/auth/login', {
      username,
      password
    })
  },

  // 验证邮箱
  verifyEmail: (email, code) => {
    return apiClient.post('/auth/verify-email', {
      email: email,
      code: code
    })
  },

  // 获取当前用户
  getCurrentUser: () => {
    return apiClient.get('/auth/me')
  }
}
