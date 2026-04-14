<template>
  <div class="relative inline-block">
    <select
      v-model="selectedSort"
      @change="handleSort"
      class="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
      data-testid="sort-select"
    >
      <option value="">排序方式</option>
      <option 
        v-for="option in sortOptions" 
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { value: 'margin-desc', label: '利润率（高到低）' },
      { value: 'margin-asc', label: '利润率（低到高）' },
      { value: 'demand-desc', label: '需求（高到低）' },
      { value: 'demand-asc', label: '需求（低到高）' },
      { value: 'score-desc', label: '评分（高到低）' },
      { value: 'score-asc', label: '评分（低到高）' },
      { value: 'price-desc', label: '价格（高到低）' },
      { value: 'price-asc', label: '价格（低到高）' },
    ]
  }
})

const emit = defineEmits(['sort'])

const selectedSort = ref('')
const sortOptions = props.options

const handleSort = () => {
  if (!selectedSort.value) {
    emit('sort', null)
    return
  }

  const [field, order] = selectedSort.value.split('-')
  emit('sort', { field, order })
}

// Export for testing
defineExpose({ selectedSort })
</script>
