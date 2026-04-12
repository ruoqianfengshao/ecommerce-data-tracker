# Vue 3 + Vite 部署配置

## ⚙️ GitHub Pages 配置

项目已迁移到 Vue 3 + Vite，需要更新 GitHub Pages 配置：

### 步骤 1：启用 GitHub Actions 部署

1. 访问仓库设置：https://github.com/ruoqianfengshao/ecommerce-data-tracker/settings/pages
2. 在 "Build and deployment" 部分：
   - Source: 选择 **GitHub Actions**
   - 不要选择 "Deploy from a branch"

### 步骤 2：触发构建

推送代码后，GitHub Actions 会自动：
1. 安装依赖（`npm ci`）
2. 构建项目（`npm run build`）
3. 部署到 GitHub Pages

### 步骤 3：等待部署完成

- 查看部署状态：https://github.com/ruoqianfengshao/ecommerce-data-tracker/actions
- 首次部署约需 2-3 分钟
- 部署成功后，网站地址：https://ruoqianfengshao.github.io/ecommerce-data-tracker/

---

## 🎯 主要改进

### 1. Vue 3 架构
- ✅ Composition API
- ✅ 组件化开发
- ✅ 响应式数据

### 2. 懒加载功能
- ✅ 每次加载 6 个产品
- ✅ "加载更多"按钮
- ✅ 避免一次性渲染大量 DOM

### 3. 性能优化
- ✅ Vite 快速构建
- ✅ 代码分割
- ✅ Chart.js 动态导入
- ✅ 优化的打包体积

### 4. 开发体验
- ✅ 组件化开发
- ✅ 热模块替换（HMR）
- ✅ TypeScript 支持（可选）

---

## 🛠️ 本地开发

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问：http://localhost:5173

### 生产构建
```bash
npm run build
```
输出目录：`dist/`

### 预览构建
```bash
npm run preview
```

---

## 📦 项目结构

```
ecommerce-tracker/
├── src/
│   ├── App.vue                 # 主应用组件
│   ├── main.js                 # 入口文件
│   └── components/
│       ├── ProductCard.vue     # 产品卡片组件
│       └── CategoryChart.vue   # 品类图表组件
├── data/
│   └── products/               # 产品数据 JSON
│       ├── 2026-04-11.json
│       └── 2026-04-12.json
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages 部署
│       └── daily-products.yml  # 每日选品任务
├── index.html                  # HTML 入口
├── vite.config.js              # Vite 配置
└── package.json                # 依赖配置
```

---

## 🚀 部署状态

**仓库**: https://github.com/ruoqianfengshao/ecommerce-data-tracker

**网站**: https://ruoqianfengshao.github.io/ecommerce-data-tracker/

**构建**: 
- GitHub Actions 自动部署
- 每次 push 到 main 分支触发
- 查看构建日志：Actions 页面

---

## ⚠️ 注意事项

1. **首次配置**：需要在 GitHub 仓库设置中启用 GitHub Actions 部署
2. **数据文件**：`data/products/` 目录必须包含在构建中
3. **Base URL**：Vite 配置中已设置 `base: '/ecommerce-data-tracker/'`
4. **缓存**：浏览器可能缓存旧版本，强制刷新（Ctrl+Shift+R）

---

**最后更新**: 2026-04-12
**技术栈**: Vue 3 + Vite + Tailwind CSS + Chart.js
