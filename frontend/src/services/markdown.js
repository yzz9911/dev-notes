import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

/**
 * 渲染Markdown内容为HTML
 *
 * @param {string} content - 原始Markdown文本
 * @returns {string} 转换后的HTML
 */
export function renderMarkdown(content) {
  if (!content) return ''

  try {
    let html = marked.parse(content)

    // 处理 Mermaid 代码块：将 <pre><code class="language-mermaid"> 转换为 <div class="mermaid">
    html = html.replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      (match, code) => {
        // 解码 HTML 实体
        const decoded = code
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
        return `<div class="mermaid">\n${decoded}\n</div>`
      }
    )

    return html
  } catch (err) {
    console.error('Markdown 渲染错误:', err)
    return `<p>内容渲染失败: ${err.message}</p>`
  }
}
