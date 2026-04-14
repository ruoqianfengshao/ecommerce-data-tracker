<template>
  <div class="relative">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        :placeholder="placeholder"
        class="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        data-testid="search-input"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        data-testid="clear-button"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Search suggestions (optional) -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <button
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索产品...'
  },
  debounceMs: {
    type: Number,
    default: 300
  },
  suggestions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['search', 'clear'])

const searchQuery = ref('')
const showSuggestions = ref(false)
let debounceTimer = null

const handleSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', searchQuery.value)
    showSuggestions.value = searchQuery.value.length > 0 && props.suggestions.length > 0
  }, props.debounceMs)
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
  emit('clear')
}

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  emit('search', suggestion)
}

// Close suggestions when clicking outside
watch(searchQuery, (newValue) => {
  if (!newValue) {
    showSuggestions.value = false
  }
})
</script>
