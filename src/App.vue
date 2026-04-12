<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="gradient-bg text-white shadow-lg">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold">跨境电商选品数据平台</h1>
            <p class="text-purple-100 mt-1">Cross-Border E-Commerce Product Research Dashboard</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-purple-100">数据日期</div>
            <select 
              v-model="selectedDate" 
              @change="loadData"
              class="mt-1 px-3 py-1 rounded text-gray-900 text-sm"
            >
              <option v-for="date in availableDates" :key="date" :value="date">
                {{ formatDate(date) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-8">
      <div class="text-center">
        <div class="inline-block animate-pulse text-purple-600 text-lg">
          加载数据中...
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <section v-else class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Products List -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ formatDate(selectedDate) }} 推荐选品
                <span class="text-sm font-normal text-gray-500 ml-2">
                  共 {{ products.length }} 款
                </span>
              </h2>
              <select 
                v-model="selectedCategory"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">全部分类</option>
                <option value="electronics">电子产品</option>
                <option value="home">家居生活</option>
                <option value="fashion">时尚配饰</option>
                <option value="sports">运动户外</option>
              </select>
            </div>

            <!-- Products with Lazy Loading -->
            <div class="space-y-4">
              <ProductCard 
                v-for="product in displayedProducts" 
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Load More Button -->
            <div v-if="hasMore" class="text-center mt-6">
              <button 
                @click="loadMore"
                :disabled="loadingMore"
                class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {{ loadingMore ? '加载中...' : '加载更多' }}
              </button>
            </div>

            <!-- Empty State -->
            <div v-if="filteredProducts.length === 0" class="text-center py-12 text-gray-500">
              <p>暂无符合条件的选品数据</p>
              <p class="text-sm mt-2">请选择其他日期或分类查看</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Category Distribution -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">品类分布</h3>
            <CategoryChart :products="products" />
          </div>

          <!-- Platform Distribution -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">平台分布</h3>
            <div class="space-y-3">
              <div v-for="stat in platformStats" :key="stat.name">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-gray-600">{{ stat.name }}</span>
                  <span class="font-semibold">{{ stat.count }} 款</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-purple-600 h-2 rounded-full transition-all"
                    :style="{ width: stat.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Summary -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">数据统计</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">当日选品</span>
                <span class="font-semibold text-blue-600">{{ products.length }} 款</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">高潜力</span>
                <span class="font-semibold text-green-600">
                  {{ highPotentialCount }} 款
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">中潜力</span>
                <span class="font-semibold text-yellow-600">
                  {{ mediumPotentialCount }} 款
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">平均利润率</span>
                <span class="font-semibold text-purple-600">{{ avgMargin }}%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">平均评分</span>
                <span class="font-semibold text-purple-600">{{ avgScore }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-gray-400">跨境电商选品数据分析平台 © 2026</p>
        <p class="text-sm text-gray-500 mt-2">
          Powered by Vue 3 + Vite | 
          <a 
            href="https://github.com/ruoqianfengshao/ecommerce-data-tracker" 
            target="_blank" 
            class="hover:text-purple-400"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from './components/ProductCard.vue'
import CategoryChart from './components/CategoryChart.vue'

const selectedDate = ref('2026-04-12')
const availableDates = ref(['2026-04-12', '2026-04-11'])
const selectedCategory = ref('all')
const products = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const pageSize = ref(6) // 每次加载6个产品
const currentPage = ref(1)

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// 过滤后的产品
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})

// 当前显示的产品（懒加载）
const displayedProducts = computed(() => {
  return filteredProducts.value.slice(0, currentPage.value * pageSize.value)
})

// 是否还有更多
const hasMore = computed(() => {
  return displayedProducts.value.length < filteredProducts.value.length
})

// 平台统计
const platformStats = computed(() => {
  const counts = {}
  products.value.forEach(p => {
    counts[p.platform] = (counts[p.platform] || 0) + 1
  })
  
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / products.value.length) * 100)
    }))
    .sort((a, b) => b.count - a.count)
})

// 高潜力产品数量
const highPotentialCount = computed(() => {
  return products.value.filter(p => p.potential === 'high').length
})

// 中潜力产品数量
const mediumPotentialCount = computed(() => {
  return products.value.filter(p => p.potential === 'medium').length
})

// 平均利润率
const avgMargin = computed(() => {
  if (products.value.length === 0) return 0
  const sum = products.value.reduce((acc, p) => acc + p.margin, 0)
  return (sum / products.value.length).toFixed(1)
})

// 平均评分
const avgScore = computed(() => {
  if (products.value.length === 0) return 0
  const sum = products.value.reduce((acc, p) => acc + p.score, 0)
  return (sum / products.value.length).toFixed(1)
})

// 加载数据
const loadData = async () => {
  loading.value = true
  currentPage.value = 1 // 重置页码
  
  try {
    const response = await fetch(`./data/products/${selectedDate.value}.json`)
    if (!response.ok) throw new Error('数据加载失败')
    
    const data = await response.json()
    products.value = data.products || []
  } catch (error) {
    console.error('Error loading data:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = () => {
  loadingMore.value = true
  setTimeout(() => {
    currentPage.value++
    loadingMore.value = false
  }, 300) // 模拟加载延迟
}

// 监听分类变化，重置页码
watch(selectedCategory, () => {
  currentPage.value = 1
})

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}
</style>
