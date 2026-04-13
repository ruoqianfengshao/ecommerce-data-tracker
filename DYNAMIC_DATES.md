# 动态日期系统使用指南

## 概述

选品数据平台现在支持**完全自动化的日期管理**，无需手动更新代码。

## 工作原理

### 1. 自动扫描数据文件
```bash
npm run manifest
```
扫描 `public/data/products/` 目录下所有日期数据文件（格式：`YYYY-MM-DD.json`），生成 `manifest.json`。

### 2. Manifest 结构
```json
{
  "version": "1.0",
  "generatedAt": "2026-04-13T03:31:00.773Z",
  "totalDates": 3,
  "dates": ["2026-04-13", "2026-04-12", "2026-04-11"],
  "latestDate": "2026-04-13",
  "oldestDate": "2026-04-11",
  "dateInfo": [
    {
      "date": "2026-04-13",
      "fileSize": 6950,
      "lastModified": "2026-04-13T02:42:51.310Z"
    }
  ]
}
```

### 3. 前端动态加载
- 启动时从 `manifest.json` 读取可用日期
- 默认选中**今天**（如果数据存在）
- 否则选中 `latestDate`（最新可用日期）
- 如果 manifest 加载失败，回退到默认日期列表

## 添加新选品数据的完整流程

### 方式 A: 自动化（推荐）

```bash
# 1. 生成新数据文件
cat > public/data/products/2026-04-14.json << 'EOF'
{
  "date": "2026-04-14",
  "products": [...]
}
EOF

# 2. 提交并推送（manifest 自动生成）
git add public/data/products/2026-04-14.json
git commit -m "data: add product recommendations for 2026-04-14"
git push origin main
```

**GitHub Actions 会自动：**
1. 运行 `npm run manifest` 生成新 manifest
2. 构建前端
3. 部署到 GitHub Pages

**完全零代码改动！**

### 方式 B: 手动构建

```bash
# 1. 添加数据文件
cp template.json public/data/products/2026-04-14.json
# 编辑 2026-04-14.json

# 2. 生成 manifest
npm run manifest

# 3. 本地测试
npm run dev

# 4. 构建并推送
npm run build
git add .
git commit -m "data: add product recommendations for 2026-04-14"
git push
```

## 构建流程

```bash
npm run build
```

**执行顺序：**
1. `npm run manifest` → 扫描产品文件，生成 manifest.json
2. `vite build` → 构建前端应用

## 故障排查

### 问题 1: 新日期没有出现在下拉菜单

**可能原因：**
- 数据文件命名不正确（必须是 `YYYY-MM-DD.json`）
- Manifest 没有重新生成
- 浏览器缓存

**解决方案：**
```bash
# 手动重新生成 manifest
npm run manifest

# 检查 manifest
cat public/data/manifest.json

# 清除浏览器缓存或强制刷新（Ctrl+Shift+R）
```

### 问题 2: Manifest 加载失败

前端会自动回退到硬编码的默认日期列表。检查浏览器控制台是否有错误。

### 问题 3: 日期格式错误

数据文件名必须严格遵循 `YYYY-MM-DD.json` 格式，例如：
- ✅ `2026-04-13.json`
- ❌ `2026-4-13.json` (月份必须是两位数)
- ❌ `20260413.json` (缺少连字符)
- ❌ `2026-04-13-data.json` (额外后缀)

## 文件说明

| 文件 | 作用 |
|------|------|
| `generate-manifest.mjs` | 扫描脚本，生成日期清单 |
| `public/data/manifest.json` | 日期清单（自动生成，会被 Git 追踪） |
| `src/App.vue` | 前端主组件，包含动态日期加载逻辑 |
| `package.json` | 构建脚本配置 |

## 开发者注意事项

### 添加新数据时

只需关注数据内容，无需修改任何代码：
```bash
# 唯一需要做的事
git add public/data/products/YYYY-MM-DD.json
git commit -m "data: add products for YYYY-MM-DD"
git push
```

### 修改日期逻辑时

如果需要调整日期筛选、排序等逻辑，修改 `generate-manifest.mjs`：
```javascript
// 例如：只保留最近 30 天的数据
const dates = files
  .map(file => file.replace('.json', ''))
  .filter(date => {
    const daysAgo = (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24)
    return daysAgo <= 30
  })
  .sort((a, b) => new Date(b) - new Date(a))
```

## CI/CD 流程

```
提交代码
  ↓
GitHub Actions 触发
  ↓
npm ci (安装依赖)
  ↓
npm run build
  ├── npm run manifest (生成清单)
  └── vite build (构建前端)
  ↓
上传 dist/
  ↓
部署到 GitHub Pages
  ↓
✅ 新数据自动上线
```

## 总结

**核心优势：**
- ✅ 零代码维护：添加数据文件即可
- ✅ 自动发现：无需手动维护日期列表
- ✅ 智能默认：始终显示最新数据
- ✅ 容错机制：Manifest 失败不影响基本功能
- ✅ CI/CD 友好：完全自动化构建和部署

**维护成本：** 接近零
**可扩展性：** 可轻松扩展到数百个日期文件

🦞
