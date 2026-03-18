#!/bin/bash

# Blog Project Setup Script

echo "=========================================="
echo "📝 个人博客项目 - 初始化脚本"
echo "=========================================="
echo ""

# 检查依赖
echo "检查依赖..."

# 检查 Git
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装"
    exit 1
fi
echo "✅ Git 已安装"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi
echo "✅ Node.js $(node -v) 已安装"

# 检查 Maven
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven 未安装"
    exit 1
fi
echo "✅ Maven 已安装"

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    exit 1
fi
echo "✅ Docker $(docker -v | awk '{print $3}') 已安装"

echo ""
echo "=========================================="
echo "前端初始化"
echo "=========================================="

cd frontend

# 安装依赖
echo "安装前端依赖..."
npm install

# 复制环境文件
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ 创建 .env.local"
fi

cd ..

echo ""
echo "=========================================="
echo "后端初始化"
echo "=========================================="

cd backend

# 复制环境文件
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ 创建 .env"
fi

cd ..

echo ""
echo "=========================================="
echo "Docker 初始化"
echo "=========================================="

# 询问是否启动 Docker
read -p "是否立即启动 Docker 容器? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "启动 Docker 容器..."
    docker-compose up -d
    echo "✅ Docker 容器已启动"
    echo ""
    echo "应用访问地址:"
    echo "  前端: http://localhost"
    echo "  后端 API: http://localhost:8080"
    echo "  MailHog: http://localhost:8025"
else
    echo "跳过 Docker 启动"
fi

echo ""
echo "=========================================="
echo "✅ 初始化完成！"
echo "=========================================="
echo ""
echo "下一步:"
echo "1. 更新配置文件中的敏感信息"
echo "   - frontend/.env.local"
echo "   - backend/.env"
echo "2. 运行: docker-compose up -d"
echo "3. 访问应用: http://localhost"
echo ""
echo "更多信息见 DEVELOPMENT.md 和 SETUP.md"
