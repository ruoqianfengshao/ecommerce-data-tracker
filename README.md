# 跨境电商选品数据分析平台

🌐 **专业的跨境电商选品追踪与分析系统**

[![GitHub Pages](https://img.shields.io/badge/status-deployed-success)](https://your-username.github.io/ecommerce-tracker/)
[![Last Updated](https://img.shields.io/badge/updated-2026--04--12-blue)](#)

---

## 📊 平台特色

- ✅ **实时数据追踪** - 每日更新选品推荐和市场趋势
- 📈 **数据可视化** - Chart.js 驱动的专业图表展示
- 🎯 **智能分析** - 自动计算潜力评分和利润预测
- 🔍 **多维度筛选** - 按品类、平台、潜力等级快速筛选
- 📱 **响应式设计** - 完美适配桌面和移动设备

---

## 🚀 快速开始

### 本地预览

```bash
# 克隆仓库
git clone https://github.com/your-username/ecommerce-tracker.git
cd ecommerce-tracker

# 直接打开 index.html 或启动本地服务器
python3 -m http.server 8000
# 访问 http://localhost:8000
```

### 在线访问

访问 GitHub Pages 部署地址：`https://your-username.github.io/ecommerce-tracker/`

---

## 📁 项目结构

```
ecommerce-tracker/
├── index.html          # 主页面
├── data/               # 数据文件夹
│   ├── products/       # 选品数据（按日期）
│   │   └── 2026-04-12.json
│   ├── categories.json # 品类配置
│   └── stats.json      # 统计数据
├── assets/             # 静态资源
│   ├── css/            # 样式文件
│   └── js/             # JavaScript 文件
└── README.md           # 项目说明
```

---

## 📝 数据格式

### 选品数据 (products/YYYY-MM-DD.json)

```json
{
  "date": "2026-04-12",
  "products": [
    {
      "id": "prod-001",
      "name": "产品名称",
      "description": "产品描述",
      "category": "electronics",
      "potential": "high",
      "margin": 45,
      "demand": 85,
      "competition": "medium",
      "score": 8.5,
      "platform": "Amazon",
      "price": {
        "cost": 10.5,
        "sell": 18.99
      },
      "notes": "备注信息"
    }
  ]
}
```

---

## 🔧 技术栈

- **前端框架**: 纯 HTML + Tailwind CSS + Alpine.js
- **数据可视化**: Chart.js
- **部署平台**: GitHub Pages
- **数据存储**: JSON 文件

---

## 📈 功能模块

### 1. 数据总览
- 总选品数统计
- 高潜力产品追踪
- 平均利润率计算
- 市场趋势评分

### 2. 选品列表
- 每日推荐选品
- 多维度数据展示
- 品类筛选
- 详情查看

### 3. 数据分析
- 品类分布饼图
- 每周趋势折线图
- 快速统计面板

---

## 🛠️ 自定义配置

### 修改主题颜色

编辑 `index.html` 中的样式：

```css
.gradient-bg {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### 添加新产品

在 `data/products/` 下创建新的 JSON 文件：

```bash
# 今天的日期
echo '{
  "date": "2026-04-12",
  "products": [...]
}' > data/products/2026-04-12.json
```

---

## 📊 数据更新流程

1. **每日更新**: 在 `data/products/` 下创建当日 JSON 文件
2. **提交代码**: `git add . && git commit -m "Add products for YYYY-MM-DD"`
3. **推送部署**: `git push origin main`
4. **自动部署**: GitHub Pages 自动更新网站

---

## 🔐 隐私与安全

- ✅ 私有仓库，数据保密
- ✅ 仅授权人员访问
- ✅ GitHub Pages 支持 HTTPS

---

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- **GitHub Issues**: 提交问题和功能请求
- **Email**: your-email@example.com

---

## 📄 许可证

本项目仅供个人学习和商业分析使用。未经许可，请勿复制或分发。

---

## 🎯 路线图

- [x] 基础数据展示
- [x] 图表可视化
- [ ] 数据自动导入
- [ ] 历史数据对比
- [ ] 导出 Excel 报表
- [ ] 移动端 PWA 支持
- [ ] 数据备份与恢复

---

**Made with 🦞 by OpenClaw**
