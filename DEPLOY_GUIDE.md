# GitHub 仓库创建和部署指南

## 📋 第一步：在 GitHub 创建私有仓库

### 方式 A：通过网页创建（推荐）

1. 访问：https://github.com/new

2. 填写仓库信息：
   - **Repository name**: `ecommerce-tracker`
   - **Description**: 跨境电商选品数据分析平台
   - **Visibility**: ✅ **Private**（私有仓库）
   - **不要**勾选 "Initialize this repository with a README"

3. 点击 **"Create repository"** 按钮

---

## 📤 第二步：推送代码到 GitHub

创建好仓库后，GitHub 会显示推送命令。使用以下命令：

```bash
cd ~/workspace/agent/workspace/ecommerce-tracker

# 添加远程仓库
git remote add origin https://github.com/你的用户名/ecommerce-tracker.git

# 推送代码
git push -u origin main
```

**注意**：替换 `你的用户名` 为你的 GitHub 用户名（可能是 `ruoqianfengshao`）

---

## 🚀 第三步：启用 GitHub Pages

1. 进入仓库页面：`https://github.com/你的用户名/ecommerce-tracker`

2. 点击 **Settings**（设置）

3. 在左侧菜单找到 **Pages**

4. 配置 GitHub Pages：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main`
   - **Folder**: 选择 `/ (root)`

5. 点击 **Save**

6. 等待 1-2 分钟，页面顶部会显示：
   ```
   ✅ Your site is live at https://你的用户名.github.io/ecommerce-tracker/
   ```

---

## 🔐 第四步：配置访问权限（可选）

由于是私有仓库，默认只有你能访问。如果需要分享给他人：

### 方式 A：添加协作者
1. 进入 **Settings** → **Collaborators**
2. 点击 **Add people**
3. 输入对方的 GitHub 用户名或邮箱

### 方式 B：生成访问链接
GitHub Pages 的私有仓库网站需要登录 GitHub 才能访问。

---

## 📊 访问你的网站

完成以上步骤后，你的专业电商数据分析平台就上线了！

**网站地址**: `https://你的用户名.github.io/ecommerce-tracker/`

---

## 🔄 日常更新流程

### 1. 添加今日选品数据

```bash
cd ~/workspace/agent/workspace/ecommerce-tracker

# 创建今天的数据文件
cat > data/products/$(date +%Y-%m-%d).json << 'EOF'
{
  "date": "$(date +%Y-%m-%d)",
  "products": [
    {
      "id": "prod-$(date +%Y%m%d)-001",
      "name": "产品名称",
      ...
    }
  ]
}
EOF
```

### 2. 提交并推送

```bash
git add data/products/$(date +%Y-%m-%d).json
git commit -m "feat: add products for $(date +%Y-%m-%d)"
git push origin main
```

### 3. 自动部署

推送后，GitHub Pages 会自动重新部署（1-2分钟）

---

## 🛠️ 自动化脚本（可选）

你可以让我每天自动生成并推送选品数据。只需要：

1. 配置 GitHub Personal Access Token
2. 设置定时任务（GitHub Actions 或本地 cron）
3. 我会自动：
   - 分析市场趋势
   - 生成选品推荐
   - 提交数据文件
   - 推送到 GitHub

---

## ❓ 常见问题

### Q: GitHub Pages 部署失败？
A: 检查 Settings → Pages，确保选择了正确的分支和文件夹

### Q: 网站样式显示不正常？
A: CDN 资源可能加载失败，检查网络连接或换用其他 CDN

### Q: 如何修改网站主题颜色？
A: 编辑 `index.html`，搜索 `.gradient-bg` 和颜色代码

### Q: 如何添加更多页面？
A: 创建新的 HTML 文件，如 `analytics.html`、`reports.html`

---

## 📞 需要帮助？

如果遇到问题，告诉我具体的错误信息，我会帮你解决！

以下是当前项目状态：
- ✅ 本地仓库已初始化
- ✅ 基础代码已提交
- ⏳ 等待推送到 GitHub
- ⏳ 等待启用 GitHub Pages

---

**下一步**：按照上面的步骤在 GitHub 创建仓库并推送代码即可！🦞
