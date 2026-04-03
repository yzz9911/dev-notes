# dev-notes
A collection of solutions and notes for real-world development issues

---

# Personal Blog Project

## 项目简介
这是一个用于个人技术文章发表的博客网站，支持 Markdown 格式文章和图片上传。文章发布需登录账号，评论和回复仅需游客邮箱。

## 技术栈
- 前端：Vue.js
- 后端：Spring Boot
- 持久层：Spring Data JPA
- 数据库：PostgreSQL（Supabase免费服务）
- 图片存储：Cloudflare R2（免费）
- 代码托管：GitHub（免费）
- Markdown渲染：marked、markdown-it、vue-markdown（推荐）
- 图片上传UI：vue-file-upload、Dropzone.js（推荐）
- 前端认证UI：vue-auth、vue-router（推荐）
- 邮箱校验：vee-validate、validator.js（推荐）
- 后端认证：Spring Security（推荐）
- 图片上传API：Cloudflare R2 SDK 或 S3兼容库
- Markdown存储/渲染：commonmark-java（可选，后端渲染）
- 邮箱校验API：javax.validation、Apache Commons Validator
- 评论系统：自定义接口
- 部署/运维：Docker、CI/CD（GitHub Actions）、Nginx/Apache、SSL/TLS、域名管理、备份、监控（Prometheus、Grafana、ELK）

## 部署与上线
- 代码托管：GitHub
- 数据库：Supabase PostgreSQL
- 图片存储：Cloudflare R2
- 网站托管：需选择免费平台（如 Vercel、Netlify、GitHub Pages、Cloudflare Pages）
- CDN：可用 Cloudflare，需配置
- 域名：建议购买或使用免费子域名
- SSL/TLS：大多数托管/CDN平台自动提供
- 邮件服务：Mailgun、SendGrid、Resend（需集成，免费额度有限）
- 备份与监控：数据库备份、Prometheus、Grafana、ELK Stack

## 功能说明
- 文章发布：需登录账号（仅博主）
- 评论与回复：游客提交邮箱即可，无需登录
- Markdown格式支持，图片上传与存储

## 待补充/注意事项
- 网站托管平台需选定并配置
- 域名需购买或申请
- 邮件服务需集成
- 认证建议用 Supabase Auth 或 Spring Security
- 前后端需集成图片上传与存储
- 前端需集成 Markdown 渲染与图片上传组件
- 评论系统需前后端开发与邮箱校验
- 部署需配置 Docker、CI/CD、SSL/TLS
- 监控与备份建议配置

## docker启动
- docker-compose down
- docker-compose build --no-cache backend
- docker-compose up -d
docker-compose -f docker-compose-prod.yml down
docker-compose -f docker-compose-prod.yml build --no-cache backend
docker-compose -f docker-compose-prod.yml up -d

docker-compose logs -f backend


---

如需详细技术选型或集成方案，可进一步补充。
