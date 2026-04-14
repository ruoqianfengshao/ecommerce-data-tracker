import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../../src/components/SearchBar.vue'

describe('SearchBar.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('renders search input', () => {
    wrapper = mount(SearchBar)
    const input = wrapper.find('[data-testid="search-input"]')
    expect(input.exists()).toBe(true)
  })

  it('displays custom placeholder', () => {
    const placeholder = 'Search products...'
    wrapper = mount(SearchBar, {
      props: { placeholder }
    })
    const input = wrapper.find('[data-testid="search-input"]')
    expect(input.attributes('placeholder')).toBe(placeholder)
  })

  it('emits search event with debounce', async () => {
    wrapper = mount(SearchBar, {
      props: { debounceMs: 300 }
    })
    
    const input = wrapper.find('[data-testid="search-input"]')
    await input.setValue('test query')
    
    // Should not emit immediately
    expect(wrapper.emitted('search')).toBeUndefined()
    
    // Fast-forward time
    vi.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()
    
    // Should emit after debounce
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['test query'])
  })

  it('shows clear button when input has value', async () => {
    wrapper = mount(SearchBar)
    const input = wrapper.find('[data-testid="search-input"]')
    
    // Initially hidden
    expect(wrapper.find('[data-testid="clear-button"]').exists()).toBe(false)
    
    // Show after input
    await input.setValue('test')
    expect(wrapper.find('[data-testid="clear-button"]').exists()).toBe(true)
  })

  it('clears search when clear button clicked', async () => {
    wrapper = mount(SearchBar)
    const input = wrapper.find('[data-testid="search-input"]')
    
    await input.setValue('test')
    const clearButton = wrapper.find('[data-testid="clear-button"]')
    await clearButton.trigger('click')
    
    expect(input.element.value).toBe('')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('displays suggestions when provided', async () => {
    const suggestions = ['Product A', 'Product B', 'Product C']
    wrapper = mount(SearchBar, {
      props: { suggestions }
    })
    
    const input = wrapper.find('[data-testid="search-input"]')
    await input.setValue('prod')
    
    vi.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()
    
    // Suggestions should be visible
    const suggestionButtons = wrapper.findAll('button').filter(
      btn => btn.text().startsWith('Product')
    )
    expect(suggestionButtons.length).toBe(3)
  })

  it('selects suggestion when clicked', async () => {
    const suggestions = ['Product A', 'Product B']
    wrapper = mount(SearchBar, {
      props: { suggestions }
    })
    
    const input = wrapper.find('[data-testid="search-input"]')
    await input.setValue('p')
    
    vi.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()
    
    const suggestionButton = wrapper.findAll('button').find(
      btn => btn.text() === 'Product A'
    )
    await suggestionButton.trigger('click')
    
    expect(input.element.value).toBe('Product A')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('hides suggestions when input is cleared', async () => {
    const suggestions = ['Product A']
    wrapper = mount(SearchBar, {
      props: { suggestions }
    })
    
    const input = wrapper.find('[data-testid="search-input"]')
    await input.setValue('p')
    
    vi.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()
    
    // Clear input
    await input.setValue('')
    await wrapper.vm.$nextTick()
    
    // Suggestions should be hidden
    const suggestionContainer = wrapper.find('.absolute.z-10')
    expect(suggestionContainer.exists()).toBe(false)
  })

  it('handles custom debounce time', async () => {
    wrapper = mount(SearchBar, {
      props: { debounceMs: 500 }
    })
    
    const input = wrapper.find('[data-testid="search-input"]')
    await input.setValue('test')
    
    // Should not emit after 300ms
    vi.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('search')).toBeUndefined()
    
    // Should emit after 500ms
    vi.advanceTimersByTime(200)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('search')).toBeTruthy()
  })
})
