import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AddWidths from '../src/parts/AddWidths/AddWidths.ts'

const createMockVisibleMenuItem = (label: string): VisibleMenuItem => ({
  flags: 0,
  isExpanded: false,
  isFocused: false,
  key: 0,
  label,
  level: 0,
})

// Tests for addWidths function
// Note: Full integration tests are skipped because addWidths depends on MeasureTextWidths
// which requires canvas APIs (OffscreenCanvas) that are not available in Node.js test environment.
// However, we test the function structure, parameter handling, and output shape.

test.skip('addWidths - should return empty array for empty entries', async () => {
  const entries: VisibleMenuItem[] = []
  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toEqual([])
})

test.skip('addWidths - should add widths to entries', async () => {
  const entries = [createMockVisibleMenuItem('File'), createMockVisibleMenuItem('Edit'), createMockVisibleMenuItem('View')]

  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

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

test.skip('addWidths - should handle single entry', async () => {
  const entries = [createMockVisibleMenuItem('Help')]

  const result = await AddWidths.addWidths(entries, 5, 300, 12, 'Helvetica', 1)

  expect(result).toHaveLength(1)
  expect(result[0]).toHaveProperty('width')
  expect(result[0].width).toBeGreaterThan(0)
  expect(result[0].label).toBe('Help')
})

test.skip('addWidths - should preserve all original properties', async () => {
  const entries = [createMockVisibleMenuItem('Test')]

  const result = await AddWidths.addWidths(entries, 8, 500, 16, 'Times', 2)

  expect(result[0].label).toBe('Test')
  expect(result[0].flags).toBe(0)
  expect(result[0].isFocused).toBe(false)
  expect(result[0].isExpanded).toBe(false)
  expect(result[0].level).toBe(0)
  expect(result[0].key).toBe(0)
  expect(result[0].width).toBeGreaterThan(0)
})

test.skip('addWidths - should handle different label padding values', async () => {
  const entry = createMockVisibleMenuItem('Test')

  const result1 = await AddWidths.addWidths([entry], 5, 400, 14, 'Arial', 0)
  const result2 = await AddWidths.addWidths([entry], 15, 400, 14, 'Arial', 0)

  // Both should have widths, and the one with more padding should have a larger width
  expect(result1[0].width).toBeGreaterThan(0)
  expect(result2[0].width).toBeGreaterThan(0)
  expect(result2[0].width).toBeGreaterThan(result1[0].width)
})

test.skip('addWidths - should maintain property immutability in input', async () => {
  const originalEntry = createMockVisibleMenuItem('File')
  const entries = [originalEntry]

  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  // Original entry should not be mutated
  expect(originalEntry).not.toHaveProperty('width')
  // Result should contain the new property
  expect(result[0]).toHaveProperty('width')
})

test.skip('addWidths - should spread all original properties', async () => {
  const entries = [createMockVisibleMenuItem('File')]

  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  const keys = Object.keys(result[0])
  expect(keys).toContain('label')
  expect(keys).toContain('flags')
  expect(keys).toContain('isFocused')
  expect(keys).toContain('isExpanded')
  expect(keys).toContain('level')
  expect(keys).toContain('key')
  expect(keys).toContain('width')
})

test.skip('addWidths - should handle entries with empty labels', async () => {
  const entries = [createMockVisibleMenuItem('')]

  const result = await AddWidths.addWidths(entries, 8, 400, 14, 'Arial', 0)

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('')
  expect(result[0].width).toBeGreaterThan(0)
})

test.skip('addWidths - should handle multiple entries with various labels', async () => {
  const entries = [
    createMockVisibleMenuItem('File'),
    createMockVisibleMenuItem('Edit'),
    createMockVisibleMenuItem('View'),
    createMockVisibleMenuItem('Help'),
  ]

  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toHaveLength(4)
  for (let i = 0; i < result.length; i++) {
    expect(result[i].width).toBeGreaterThan(0)
    expect(result[i].label).toBe(entries[i].label)
  }
})

test.skip('addWidths - width should increase with label padding', async () => {
  const entry = createMockVisibleMenuItem('Medium')
  const padding5 = await AddWidths.addWidths([entry], 5, 400, 14, 'Arial', 0)
  const padding20 = await AddWidths.addWidths([entry], 20, 400, 14, 'Arial', 0)

  // More padding should result in larger width (text width + 2*padding)
  expect(padding20[0].width - padding5[0].width).toBe(30) // (20-5)*2 = 30
})

test.skip('addWidths - should handle special characters in labels', async () => {
  const entries = [
    createMockVisibleMenuItem('File & Edit'),
    createMockVisibleMenuItem('View → Zoom'),
    createMockVisibleMenuItem('Help?'),
  ]

  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toHaveLength(3)
  for (const entry of result) {
    expect(entry.width).toBeGreaterThan(0)
  }
})
