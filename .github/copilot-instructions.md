# 个人博客项目指南

## 项目概述

这是一个**个人博客平台**，用于发布支持 Markdown 格式的技术文章。该架构支持文章发布（仅作者）、游客评论（邮箱验证）和图片上传。目前处于**规格/规划阶段**——尚无生产代码。完整的项目规范见 [README.md](../README.md)。

## 架构

**前后端分离**
- **前端** (Vue.js)：文章列表、Markdown 渲染、评论提交、图片上传 UI
- **后端** (Spring Boot)：文章 CRUD、身份认证、评论管理、图片 URL 生成
- **数据流**：文章存储在 PostgreSQL → 通过 Markdown 库渲染 → 图片通过 Cloudflare R2 代理

**关键设计模式**
- **身份认证**：Spring Security 用于作者登录（前端通过 Vue Router + 令牌认证）
- **游客评论**：需要邮箱验证，无需登录
- **图片存储**：Cloudflare R2 S3 兼容 API（不存储在数据库中——仅存储 URL）
- **Markdown 流程**：前端使用 marked/markdown-it，后端可选 commonmark-java

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Frontend** | Vue.js 3, Vite (recommended) | Build tool TBD, but Vite preferred for modern setup |
| **Markdown** | vue-markdown or marked + markdown-it | Frontend-focused rendering |
| **Image Upload** | Dropzone.js or vue-file-upload | Pre-upload validation, progress UI |
| **Form Validation** | vee-validate + validator.js | Email validation for comments |
| **Backend** | Spring Boot 2.7+ | Spring Security for auth, Spring Data JPA for data access |
| **Database** | PostgreSQL (Supabase) | Free tier sufficient for personal blog |
| **Image Storage** | Cloudflare R2 | S3-compatible SDK, minimal costs |
| **Deployment** | Docker + GitHub Actions | Platform TBD (Vercel, Netlify, Fly.io, Railway) |
| **Monitoring** | Prometheus + Grafana (optional) | Planned, not essential for MVP |

## 构建与测试

### 前端
```bash
cd frontend
npm install
npm run dev        # 开发服务器
npm run build      # 生产构建
npm run lint       # ESLint
npm run test       # Vitest (如果已设置)
```

### 后端
```bash
cd backend
mvn clean install
mvn spring-boot:run           # 开发运行
mvn test                      # 单元测试
mvn package -DskipTests       # 生产 JAR 包
```

### Docker
```bash
docker-compose up -d          # 本地一体式部署（需要创建 docker-compose.yml）
```

**说明**：构建命令假定标准的 Maven/npm 项目结构。项目脚手架完成后需要更新。

## 免费服务层基础设施说明

- **Supabase**：PostgreSQL，500MB 免费存储。需要监控磁盘使用情况。
- **Cloudflare R2**：10GB 免费每月存储。设置对象生命周期策略以避免惊人成本。
- **托管平台**：尚未选择部署平台。考虑 GitHub Pages（静态前端）、Fly.io 或 Railway（免费层）。
- **SSL/TLS**：由 CDN/托管平台自动提供（Cloudflare、Netlify 等）。
- **邮件服务**：Mailgun、SendGrid 或 Resend（免费层有限制——实施前选择）。

## 项目结构（目标布局）

```
dev-notes/
├── frontend/              # Vue.js 应用
│   ├── src/
│   │   ├── components/    # Vue 组件（编辑器、Markdown、评论表单等）
│   │   ├── pages/         # 视图（文章列表、文章详情、管理员等）
│   │   ├── services/      # API 客户端、上传服务
│   │   └── store/         # Pinia 或 Vuex 状态（认证、文章、评论）
│   ├── package.json
│   └── vite.config.js
├── backend/               # Spring Boot 应用
│   ├── src/
│   │   ├── main/java/com/blog/
│   │   │   ├── controller/     # REST 端点
│   │   │   ├── service/        # 业务逻辑
│   │   │   ├── repository/     # Spring Data JPA Repository
│   │   │   ├── entity/         # JPA 实体
│   │   │   └── config/         # Spring 配置（安全、跨域等）
│   │   └── resources/
│   │       ├── application.yml # 数据库、R2、邮件配置
│   │       └── db/             # SQL 迁移
│   └── pom.xml
├── docker-compose.yml     # PostgreSQL + Redis 本地开发（可选）
└── .github/
    └── workflows/         # GitHub Actions CI/CD
```

## 后续步骤 / 待办清单

1. **初始化仓库**
   - [ ] 创建 `frontend/` 和 `backend/` 目录
   - [ ] 运行 `npm create vite@latest frontend -- --template vue`
   - [ ] 运行 `spring boot project generator` 或 `spring-boot-starter-web` Maven 设置
   - [ ] 初始化 `pom.xml` 和 `package.json`

2. **基础设施设置**
   - [ ] 创建 Supabase PostgreSQL 项目（获取连接字符串）
   - [ ] 创建 Cloudflare R2 桶（获取凭证）
   - [ ] 选择托管平台并配置域名
   - [ ] 集成邮件服务（Mailgun/SendGrid/Resend）

3. **后端基础**
   - [ ] Spring Boot 设置和 Spring Security 配置
   - [ ] PostgreSQL 连接 + Spring Data JPA 配置
   - [ ] Cloudflare R2 客户端库集成
   - [ ] 文章基本 CRUD 端点
   - [ ] 身份认证控制器

4. **前端基础**
   - [ ] Vue 3 应用结构和 Vue Router
   - [ ] API 服务层（axios 或 fetch 包装器）
   - [ ] Markdown 渲染集成（vue-markdown）
   - [ ] 图片上传组件（Dropzone.js 集成）
   - [ ] 基本布局：标题、文章列表、详情页

5. **功能开发**
   - [ ] 文章编辑和发布（后端 + 管理员 UI）
   - [ ] 带邮箱验证的评论系统
   - [ ] 上传图片到 Cloudflare R2
   - [ ] 认证流程（登录、JWT 令牌）
   - [ ] 管理员仪表板

6. **部署与运维**
   - [ ] 后端 Dockerfile
   - [ ] 前端 Dockerfile（nginx 提供编译后的 Vue）
   - [ ] GitHub Actions CI/CD 流程
   - [ ] 域名设置 + SSL/TLS
   - [ ] 数据库备份策略

## 何时寻求帮助

- **架构决策**：启动新模块或 API 端点前，先与项目规范澄清设计
- **技术选择**：如果技术栈选择不清楚，请先参考 [README.md](../README.md)
- **构建/部署问题**：诊断前先使用提供的 bash 命令检查本地设置

## 回答规则

**所有回答必须用中文解释**。AI 助手在提供代码、建议或指导时，务必用中文详细说明理由、实现步骤和相关注意事项。
