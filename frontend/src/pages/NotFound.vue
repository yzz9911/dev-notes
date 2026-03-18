<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您访问的页面不存在</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 5rem 2rem;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
}

.not-found p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.not-found a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.not-found a:hover {
  background: #0052a3;
}
</style>
