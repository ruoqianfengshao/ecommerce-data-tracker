import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SortDropdown from '../../src/components/SortDropdown.vue'

describe('SortDropdown.vue', () => {
  it('renders sort dropdown', () => {
    const wrapper = mount(SortDropdown)
    const select = wrapper.find('[data-testid="sort-select"]')
    expect(select.exists()).toBe(true)
  })

  it('displays default sort options', () => {
    const wrapper = mount(SortDropdown)
    const options = wrapper.findAll('option')
    
    // Should have default label + 8 sort options
    expect(options.length).toBeGreaterThanOrEqual(8)
    expect(options[1].text()).toContain('利润率')
  })

  it('displays custom sort options', () => {
    const customOptions = [
      { value: 'name-asc', label: '名称（A-Z）' },
      { value: 'name-desc', label: '名称（Z-A）' }
    ]
    
    const wrapper = mount(SortDropdown, {
      props: { options: customOptions }
    })
    
    const options = wrapper.findAll('option')
    expect(options.length).toBe(3) // 1 default + 2 custom
    expect(options[1].text()).toBe('名称（A-Z）')
    expect(options[2].text()).toBe('名称（Z-A）')
  })

  it('emits sort event with correct payload', async () => {
    const wrapper = mount(SortDropdown)
    const select = wrapper.find('[data-testid="sort-select"]')
    
    await select.setValue('margin-desc')
    
    expect(wrapper.emitted('sort')).toBeTruthy()
    expect(wrapper.emitted('sort')[0]).toEqual([
      { field: 'margin', order: 'desc' }
    ])
  })

  it('emits null when reset to default', async () => {
    const wrapper = mount(SortDropdown)
    const select = wrapper.find('[data-testid="sort-select"]')
    
    // First set a value
    await select.setValue('margin-desc')
    
    // Then reset
    await select.setValue('')
    
    const emitted = wrapper.emitted('sort')
    expect(emitted[emitted.length - 1]).toEqual([null])
  })

  it('handles all sort field types', async () => {
    const wrapper = mount(SortDropdown)
    const select = wrapper.find('[data-testid="sort-select"]')
    
    const testCases = [
      { value: 'margin-desc', expected: { field: 'margin', order: 'desc' } },
      { value: 'demand-asc', expected: { field: 'demand', order: 'asc' } },
      { value: 'score-desc', expected: { field: 'score', order: 'desc' } },
      { value: 'price-asc', expected: { field: 'price', order: 'asc' } },
    ]
    
    for (const testCase of testCases) {
      await select.setValue(testCase.value)
      const emitted = wrapper.emitted('sort')
      expect(emitted[emitted.length - 1]).toEqual([testCase.expected])
    }
  })

  it('maintains selected value after sort', async () => {
    const wrapper = mount(SortDropdown)
    const select = wrapper.find('[data-testid="sort-select"]')
    
    await select.setValue('margin-desc')
    
    expect(wrapper.vm.selectedSort).toBe('margin-desc')
    expect(select.element.value).toBe('margin-desc')
  })
})
