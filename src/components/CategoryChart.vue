<template>
  <div class="category-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const chartCanvas = ref(null)
let chartInstance = null

// 品类名称映射
const getCategoryName = (category) => {
  const names = {
    electronics: '电子产品',
    home: '家居生活',
    fashion: '时尚配饰',
    sports: '运动户外'
  }
  return names[category] || category
}

// 更新图表
const updateChart = async () => {
  if (!chartCanvas.value) return

  // 动态导入 Chart.js
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)

  // 统计品类数量
  const categoryCounts = {}
  props.products.forEach(p => {
    const name = getCategoryName(p.category)
    categoryCounts[name] = (categoryCounts[name] || 0) + 1
  })

  // 销毁旧图表
  if (chartInstance) {
    chartInstance.destroy()
  }

  // 创建新图表
  chartInstance = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryCounts),
      datasets: [{
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#4facfe',
          '#43e97b'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        }
      }
    }
  })
}

// 监听产品数据变化
watch(() => props.products, () => {
  updateChart()
}, { deep: true })

// 初始化
onMounted(() => {
  updateChart()
})
</script>

<style scoped>
.category-chart {
  position: relative;
  height: 250px;
}
</style>
