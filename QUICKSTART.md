# 添加新选品数据 - 快速指南

## 步骤（3分钟搞定）

### 1. 复制模板
```bash
cp TEMPLATE.json public/data/products/2026-04-14.json
```

### 2. 修改数据
编辑 `2026-04-14.json`，替换以下内容：
- 日期：`"date": "2026-04-14"`
- 产品列表：填写 6-8 款产品
- 每个产品必须包含的字段（照着模板改就行）：
  - `name`: 产品名
  - `price.cost`: 成本价
  - `price.sell`: 售价
  - `margin`: 利润率
  - 其他字段参考模板

### 3. 提交推送
```bash
git add public/data/products/2026-04-14.json
git commit -m "data: add products for 2026-04-14"
git push
```

**完成！** GitHub Actions 会自动构建和部署。

## 字段说明

### 必填字段（缺一个都会报错）
- `price.cost` - 成本价（美元）
- `price.sell` - 售价（美元）
- `margin` - 利润率（百分比，如 66.7）
- `demand` - 需求分数（0-10）
- `platform` - 平台（通常是 "Etsy"）
- `competition` - 竞争度："low" / "medium" / "high"
- `potential` - 潜力："high" / "medium" / "low"

### 可选字段
- `description` - 产品描述
- `notes` - 市场分析
- `tags` - 标签数组
- `links.source` - 1688 链接
- `links.target` - Etsy 搜索链接

## 注意事项

⚠️ **价格必须是数字，不要加引号**
```json
✅ "cost": 10.00
❌ "cost": "10.00"
```

⚠️ **利润率计算**
```
margin = (sell - cost) / sell * 100
```

⚠️ **日期格式必须是 YYYY-MM-DD**
```json
✅ "2026-04-14"
❌ "2026-4-14"
```

## 快捷命令

```bash
# 查看最新数据作为参考
cat public/data/products/2026-04-13.json

# 复制并修改
cp public/data/products/2026-04-13.json public/data/products/2026-04-14.json
# 用编辑器打开 2026-04-14.json，修改日期和产品

# 一键推送
git add public/data/products/*.json && \
git commit -m "data: add products for $(date +%Y-%m-%d)" && \
git push
```

就这么简单！🦞
