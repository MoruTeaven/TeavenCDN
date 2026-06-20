# 部署指南

## 前置条件

- 已安装 Node.js 和 npm
- 已注册 Cloudflare 账号
- 已安装 Wrangler CLI

## 部署步骤

### 1. 配置 Cloudflare

```bash
# 登录 Cloudflare
npm install
npx wrangler login
```

### 2. 创建 D1 数据库

```bash
npm run db:create
```

复制输出的数据库 ID，更新 `wrangler.toml` 中的 `database_id`。

### 3. 初始化数据库表

```bash
npm run db:migrate
```

### 4. 创建 R2 存储桶

在 Cloudflare 控制台创建 R2 存储桶，名称为 `morutea-cdn`（或在 `wrangler.toml` 中修改为你创建的名称）。

### 5. 配置域名

在 `wrangler.toml` 中修改 `CDN_DOMAIN` 和 `GLOBAL_CDN_DOMAIN` 为你的域名。

同时将 `CORS_ORIGIN` 改为管理后台站点地址。多个地址用英文逗号分隔，例如：

```toml
CORS_ORIGIN = "https://cdn.example.com,http://localhost:8787"
```

配置管理接口 Token：

```bash
npx wrangler secret put ADMIN_TOKEN
```

本地开发可在 `.dev.vars` 中设置：

```dotenv
ADMIN_TOKEN=your-local-token
```

### 6. 部署 Worker

```bash
npm run deploy
```

部署完成后访问 Worker 绑定的域名 `/admin`，例如 `https://cdn.example.com/admin`。

## 开发

```bash
npm run dev
```

本地访问 `http://localhost:8787/admin`。
