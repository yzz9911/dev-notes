import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import mermaid from 'mermaid'

// 全局配置 Mermaid
mermaid.initialize({ startOnLoad: false, theme: 'default' })
window.mermaid = mermaid

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$mermaid = mermaid

app.mount('#app')
