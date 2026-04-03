# 个人博客项目 - 开发指南

## 项目初始化完成 ✅

该项目已初始化完成，包含以下完整的结构：

### 📁 项目结构
```
dev-notes/
├── frontend/                 # Vue.js 3 + Vite 前端
│   ├── src/
│   │   ├── components/      # Vue 组件库
│   │   ├── pages/           # 页面视图
│   │   ├── services/        # API 服务
│   │   ├── store/           # Pinia 状态管理
│   │   ├── router/          # Vue Router 路由
│   │   ├── App.vue          # 根组件
│   │   └── main.js          # 应用入口
│   ├── public/              # 静态资源
│   ├── package.json         # 依赖管理
│   ├── vite.config.js       # Vite 配置
│   ├── Dockerfile           # Docker 镜像
│   ├── nginx.conf           # Nginx 反向代理
│   └── .env.example         # 环境变量模板
│
├── backend/                 # Spring Boot 后端
│   ├── src/main/java/com/blog/
│   │   ├── controller/      # REST 控制器
│   │   ├── service/         # 业务逻辑
│   │   ├── repository/      # 数据访问层
│   │   ├── entity/          # 数据模型
│   │   ├── dto/             # 数据传输对象
│   │   ├── config/          # 配置类
│   │   └── exception/       # 异常处理
│   ├── src/main/resources/
│   │   ├── application.yml  # 应用配置
│   │   └── db/migration/    # 数据库迁移脚本
│   ├── pom.xml              # Maven 依赖
│   ├── Dockerfile           # Docker 镜像
│   └── .env.example         # 环境变量模板
│
├── docker-compose.yml       # Docker 容器编排
├── SETUP.md                 # 安装指南
└── README.md                # 项目说明

```

### 🚀 快速开始

#### 使用 Docker Compose（推荐）
```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

应用访问地址：
- **前端**：http://localhost
- **后端 API**：http://localhost:8080/api
- **MailHog（测试邮件）**：http://localhost:8025

#### 本地开发

**前端：**
```bash
cd frontend
npm install
npm run dev      # 开发服务器 http://localhost:5173
```

**后端：**
```bash
cd backend
mvn spring-boot:run  # 启动服务 http://localhost:8080
```

### 📚 项目功能

#### ✨ 已实现的功能
- ✅ **文章管理**：创建、编辑、删除、搜索文章
- ✅ **Markdown 支持**：完整的 Markdown 渲染
- ✅ **评论系统**：游客评论（需邮箱验证）
- ✅ **用户认证**：JWT 令牌认证，角色权限管理
- ✅ **响应式设计**：适配桌面和移动设备
- ✅ **API 设计**：RESTful API 接口
- ✅ **数据库**：PostgreSQL + Flyway 迁移
- ✅ **容器化**：完整的 Docker 支持

#### 🔲 后续功能计划
- 图片上传到 Cloudflare R2
- 邮件验证和通知
- 评论管理界面
- 搜索功能优化
- 性能监控（Prometheus + Grafana）
- CI/CD 流程（GitHub Actions）

### 🔐 默认账户

**用户名**：`admin`  
**密码**：`password`

登录页面：http://localhost/login

### 📖 核心功能说明

#### 1️⃣ 文章发布（仅作者）
- 登录后访问 `/admin`
- 新建/编辑/删除文章
- 支持 Markdown 格式

#### 2️⃣ 文章查看（所有人）
- 首页显示文章列表
- 点击阅读全文查看详情
- 搜索功能快速查找

#### 3️⃣ 游客评论
- 无需登录
- 仅需提供昵称和邮箱
- 支持邮箱验证

### 🛠️ 技术栈详情

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue.js | 3.3+ | 前端框架 |
| Vite | 4.4+ | 前端构建工具 |
| Spring Boot | 2.7+ | 后端框架 |
| PostgreSQL | 15 | 数据库 |
| JWT | 0.11 | 身份认证 |
| MyBatis | - | ORM 框架 |
| Docker | - | 容器化 |

### 📝 API 文档

#### 文章接口
- `GET /api/articles` - 获取所有文章
- `GET /api/articles/{id}` - 获取单篇文章
- `POST /api/articles` - 创建文章（需认证）
- `PUT /api/articles/{id}` - 更新文章（需认证）
- `DELETE /api/articles/{id}` - 删除文章（需认证）
- `GET /api/articles/search?q=keyword` - 搜索文章

#### 评论接口
- `GET /api/articles/{articleId}/comments` - 获取文章评论
- `POST /api/articles/{articleId}/comments` - 发表评论
- `DELETE /api/articles/{articleId}/comments/{commentId}` - 删除评论（需认证）

#### 认证接口
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息（需认证）

### 🐛 故障排除

#### 数据库连接失败
```bash
# 检查 PostgreSQL 是否运行
docker-compose ps postgres

# 查看日志
docker-compose logs postgres
```

#### 前后端通信失败
- 检查 CORS 配置是否正确
- 确保 API 地址在 `.env.local` 中配置正确

#### Docker 构建失败
```bash
# 清空 Docker 缓存后重试
docker-compose build --no-cache
```

### 📞 支持

遇到问题？请查看：
1. [SETUP.md](./SETUP.md) - 详细安装指南
2. [README.md](./README.md) - 项目规范
3. 项目的 `.github/copilot-instructions.md` - AI 助手指南

---

**祝您开发愉快！** 🎉
