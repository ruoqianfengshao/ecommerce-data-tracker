# 每日选品数据生成模板

## 数据格式规范

每日选品数据文件：`data/products/YYYY-MM-DD.json`

### 完整 JSON 结构

```json
{
  "date": "2026-04-13",
  "updatedBy": "openclaw-bot",
  "products": [
    {
      "id": "prod-YYYYMMDD-001",
      "name": "产品名称",
      "description": "详细描述，包含材质、功能、特点",
      "category": "electronics|home|fashion|sports",
      "potential": "high|medium|low",
      "potentialText": "高潜力|中潜力|低潜力",
      "margin": 85,
      "demand": 90,
      "competition": "low|medium|high",
      "score": 8.5,
      "platform": "Etsy|Amazon|TikTok Shop|AliExpress",
      "price": {
        "cost": 10.00,
        "sell": 50.00,
        "currency": "USD"
      },
      "supplier": {
        "name": "供应商名称",
        "moq": 50,
        "leadTime": "7-10天"
      },
      "links": {
        "1688": "https://detail.1688.com/offer/xxx.html",
        "etsy": "https://www.etsy.com/listing/xxx/product-name",
        "search": {
          "1688_keyword": "搜索关键词",
          "etsy_keyword": "search keyword"
        }
      },
      "tags": ["环保", "手工", "热销", "高利润"],
      "notes": "市场分析、采购建议、营销要点等"
    }
  ],
  "summary": {
    "totalProducts": 6,
    "highPotential": 4,
    "avgMargin": 75.5,
    "topCategory": "home"
  },
  "metadata": {
    "generatedAt": "2026-04-13T09:00:00+08:00",
    "sources": ["市场调研", "平台爬虫", "用户反馈"],
    "version": "1.0"
  }
}
```

## 选品标准

### 优先级
1. **高利润率**：利润率 > 50%
2. **低竞争度**：竞争度标记为 "low" 或 "medium"
3. **稳定供应**：1688 有可靠供应商
4. **海外验证**：Etsy/Amazon 有同类热销产品

### 品类分布
- 电子产品 (electronics): 25%
- 家居生活 (home): 35%
- 时尚配饰 (fashion): 25%
- 运动户外 (sports): 15%

### 商品链接要求

#### 1688 链接
- ✅ 优先：直接产品链接（`https://detail.1688.com/offer/xxx.html`）
- ✅ 备选：店铺链接 + 搜索关键词
- ❌ 避免：通用搜索链接

#### Etsy 链接
- ✅ 优先：直接产品链接（`https://www.etsy.com/listing/xxx/`）
- ✅ 备选：店铺链接 + 搜索关键词
- ❌ 避免：通用搜索链接

#### 链接查找方法
1. 1688：搜索产品中文名 + 类别
2. Etsy：搜索产品英文名 + 关键词（如 "handmade", "vintage"）
3. 如果找不到精确链接，提供搜索关键词

## 生成流程

1. **市场调研**：分析当前热门品类和趋势
2. **筛选产品**：根据标准筛选 6-8 款产品
3. **查找链接**：为每个产品找到 1688 和 Etsy 链接
4. **编写描述**：撰写详细的产品描述和市场分析
5. **创建 JSON**：生成符合规范的 JSON 文件
6. **提交推送**：Git commit 并 push 到 GitHub

## 示例产品

### 示例 1：环保竹制品

```json
{
  "id": "prod-20260413-001",
  "name": "竹制餐具套装",
  "description": "天然竹子制作，包含刀叉勺筷，环保可降解，适合家庭和露营",
  "category": "home",
  "potential": "high",
  "potentialText": "高潜力",
  "margin": 72,
  "demand": 85,
  "competition": "medium",
  "score": 8.3,
  "platform": "Etsy",
  "price": {
    "cost": 8.50,
    "sell": 29.99,
    "currency": "USD"
  },
  "supplier": {
    "name": "浙江XX竹制品厂",
    "moq": 100,
    "leadTime": "7-10天"
  },
  "links": {
    "1688": "https://detail.1688.com/offer/123456789.html",
    "etsy": "https://www.etsy.com/listing/987654321/bamboo-cutlery-set",
    "search": {
      "1688_keyword": "竹制餐具套装 环保",
      "etsy_keyword": "bamboo cutlery set eco friendly"
    }
  },
  "tags": ["环保", "竹制品", "家居", "热销"],
  "notes": "欧美市场对环保餐具需求大增，竹制品主打可持续标签，利润空间充足。建议配合精美包装盒销售。"
}
```

## 注意事项

1. **链接时效性**：定期检查链接是否有效
2. **价格波动**：1688 价格可能变动，定期更新
3. **竞争分析**：关注 Etsy 同类产品的定价和销量
4. **合规性**：避免侵权、敏感商品
5. **物流成本**：考虑体积重量对利润的影响

---

**更新时间**：每日早上 9:00（北京时间）
**更新方式**：自动生成 + Git 推送
**责任人**：openclaw-bot
