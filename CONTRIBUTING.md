# Contribution Guidelines

感谢您对个人博客项目的兴趣！

## 开发流程

1. **Fork 项目**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

## 编码规范

### JavaScript/Vue
- 使用 ESLint 进行代码检查
- 遵循 Vue 3 最佳实践
- 使用组合式 API

### Java
- 遵循 Google Java 编码规范
- 使用 Lombok 减少样板代码
- 为新功能添加单元测试

### SQL
- 使用 Flyway 进行数据库迁移
- 编写可重复的迁移脚本

## 提交信息规范

使用约定式提交：

```
feat: 添加新功能
fix: 修复 bug
docs: 仅文档更改
style: 代码风格更改
refactor: 代码重构
test: 添加测试
chore: 构建工具或依赖更新
```

## 测试要求

- 前端：最小 80% 覆盖率
- 后端：最小 70% 覆盖率

## 报告 Bug

使用 GitHub Issues 报告 Bug，包括：
- Bug 描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息

## 功能请求

使用 GitHub Discussions 讨论新功能，包括：
- 功能描述
- 使用场景
- 实现建议

## 许可证

提交 PR 表示您同意您的贡献在项目许可证下发布。
