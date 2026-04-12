<template>
  <div class="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-all card">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <!-- 产品标题和标签 -->
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
          <span 
            class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            :class="potentialClass"
          >
            {{ product.potentialText }}
          </span>
        </div>
        
        <!-- 产品描述 -->
        <p class="text-sm text-gray-600 mt-1">{{ product.description }}</p>
        
        <!-- 数据指标 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <p class="text-xs text-gray-500">预估利润</p>
            <p class="text-lg font-semibold text-green-600">{{ product.margin }}%</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">市场需求</p>
            <div class="flex items-center mt-1">
              <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-500 h-2 rounded-full transition-all"
                  :style="{ width: product.demand + '%' }"
                ></div>
              </div>
              <span class="ml-2 text-sm font-medium">{{ product.demand }}%</span>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-500">竞争程度</p>
            <p 
              class="text-lg font-semibold"
              :class="competitionClass"
            >
              {{ competitionText }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-500">推荐指数</p>
            <p class="text-lg font-semibold text-purple-600">{{ product.score }}/10</p>
          </div>
        </div>
        
        <!-- 标签 -->
        <div class="mt-3 flex flex-wrap gap-2">
          <span 
            v-for="tag in product.tags" 
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- 价格和链接 -->
    <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <span>🌐 {{ product.platform }}</span>
        <span>
          💰 成本: ${{ product.price.cost }} → 售价: ${{ product.price.sell }}
        </span>
      </div>
      <div v-if="product.links" class="flex gap-2">
        <a 
          v-if="product.links['1688']"
          :href="product.links['1688']" 
          target="_blank"
          class="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 transition-colors"
        >
          1688 货源
        </a>
        <a 
          v-if="product.links.etsy"
          :href="product.links.etsy" 
          target="_blank"
          class="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
        >
          Etsy 市场
        </a>
      </div>
    </div>
    
    <!-- 市场分析 -->
    <div v-if="product.notes" class="mt-3 text-xs text-gray-500 bg-blue-50 p-3 rounded">
      <span class="font-semibold">💡 分析：</span>
      {{ product.notes }}
    </div>
    
    <!-- 供应商信息 -->
    <div v-if="product.supplier" class="mt-2 text-xs text-gray-400">
      📦 供应商：{{ product.supplier.name }} | 
      起订量：{{ product.supplier.moq }} | 
      交货期：{{ product.supplier.leadTime }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// 潜力标签样式
const potentialClass = computed(() => {
  const classes = {
    high: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700'
  }
  return classes[props.product.potential] || classes.low
})

// 竞争程度样式
const competitionClass = computed(() => {
  const classes = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  }
  return classes[props.product.competition] || ''
})

// 竞争程度文本
const competitionText = computed(() => {
  const texts = {
    low: '低',
    medium: '中',
    high: '高'
  }
  return texts[props.product.competition] || props.product.competition
})
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>
