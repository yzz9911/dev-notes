import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0',  // 允许外部访问
    watch: {
      // Docker 环境使用 polling 模式
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
      interval: 100,
    },
    hmr: {
      // Docker 跨界面通信需要配置
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
    proxy: {
      '/api': {
        // 在 Docker 中使用服务名 'backend'，否则使用 localhost
        target: process.env.DOCKER_MODE ? 'http://backend:8080' : 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          store: ['pinia'],
          api: ['axios']
        }
      }
    }
  }
})
