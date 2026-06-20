# TeavenCDN

个人公共资源 CDN 收藏与管理系统，基于 Cloudflare Worker 构建。Worker 同时提供管理后台页面和 API，不再需要单独部署前端。

## 功能特性

- 搜索 npm/jsDelivr 资源
- 一键转存到 R2
- 自动识别入口文件
- 自动生成 CDN 链接
- 国内/海外双 CDN 加速
- 简单资源管理（查看、删除、复制）

## 技术栈

- Cloudflare Worker
- Hono（轻量级 Web 框架）
- TypeScript
- 原生 HTML/CSS/JavaScript 管理后台
- Cloudflare R2（对象存储）
- Cloudflare D1（数据库）

## 项目结构

```
TeavenCDN/
├── src/
│   ├── index.ts        # Worker 入口，页面 + API 路由
│   ├── pages/          # 原生管理后台页面
│   ├── routes/         # API 路由
│   ├── services/       # 服务层
│   ├── utils/          # 工具函数
│   ├── middleware/     # 中间件
│   └── db/             # 数据库相关
├── package.json
├── tsconfig.json
├── wrangler.toml       # Worker 配置
├── README.md
├── DEPLOYMENT.md       # 部署指南
├── AGENTS.md           # 项目代理记录
└── .gitignore
```

## 快速开始

### 开发环境

```bash
npm install
npm run dev
```

访问 `http://localhost:8787/admin` 打开管理后台。

### 部署

详细部署步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## License

MIT

