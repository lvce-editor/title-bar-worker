import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AddWidths from '../src/parts/AddWidths/AddWidths.ts'

const createMockVisibleMenuItem = (label: string): VisibleMenuItem => ({
  label,
  flags: 0,
  isFocused: false,
  isExpanded: false,
  level: 0,
  key: 0,
})

// Skipped because AddWidths depends on MeasureTextWidths which uses OffscreenCanvas
// OffscreenCanvas is not available in Node.js test environment
test.skip('addWidths - should return empty array for empty entries', () => {
  const entries: VisibleMenuItem[] = []
  const result = AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toEqual([])
})

test.skip('addWidths - should add widths to entries', () => {
  const entries = [createMockVisibleMenuItem('File'), createMockVisibleMenuItem('Edit'), createMockVisibleMenuItem('View')]

  const result = AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toHaveLength(3)
  for (const [index, entry] of result.entries()) {
    expect(entry).toHaveProperty('width')
    expect(typeof entry.width).toBe('number')
    expect(entry.width).toBeGreaterThan(0)
    expect(entry.label).toBe(entries[index].label)
    expect(entry.flags).toBe(entries[index].flags)
    expect(entry.isFocused).toBe(entries[index].isFocused)
    expect(entry.isExpanded).toBe(entries[index].isExpanded)
    expect(entry.level).toBe(entries[index].level)
    expect(entry.key).toBe(entries[index].key)
  }
})

test.skip('addWidths - should handle single entry', () => {
  const entries = [createMockVisibleMenuItem('Help')]

  const result = AddWidths.addWidths(entries, 5, 300, 12, 'Helvetica', 1)

  expect(result).toHaveLength(1)
  expect(result[0]).toHaveProperty('width')
  expect(result[0].width).toBeGreaterThan(0)
  expect(result[0].label).toBe('Help')
})

test.skip('addWidths - should preserve all original properties', () => {
  const entries = [createMockVisibleMenuItem('Test')]

  const result = AddWidths.addWidths(entries, 8, 500, 16, 'Times', 2)

  expect(result[0].label).toBe('Test')
  expect(result[0].flags).toBe(0)
  expect(result[0].isFocused).toBe(false)
  expect(result[0].isExpanded).toBe(false)
  expect(result[0].level).toBe(0)
  expect(result[0].key).toBe(0)
  expect(result[0].width).toBeGreaterThan(0)
})
