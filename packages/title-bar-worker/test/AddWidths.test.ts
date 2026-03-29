/* eslint-disable jest/no-restricted-jest-methods */
import { beforeEach, expect, jest, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'

const mockMeasureTextWidths = jest.fn(
  async (labels: readonly string[], _fontWeight: number, _fontSize: number, _fontFamily: string, _letterSpacing: number) =>
    labels.map((label) => label.length * 8),
)

await jest.unstable_mockModule('../src/parts/MeasureTextWidths/MeasureTextWidths.ts', () => ({
  measureTextWidths: mockMeasureTextWidths,
}))

const AddWidths = await import('../src/parts/AddWidths/AddWidths.ts')

beforeEach(() => {
  mockMeasureTextWidths.mockClear()
})

const createMockVisibleMenuItem = (label: string): VisibleMenuItem => ({
  flags: 0,
  isExpanded: false,
  isFocused: false,
  key: 0,
  label,
  level: 0,
})

test('addWidths - should return empty array for empty entries', async () => {
  const entries: VisibleMenuItem[] = []
  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toEqual([])
  expect(mockMeasureTextWidths).toHaveBeenCalledWith([], 400, 14, 'Arial', 0)
})

test('addWidths - should add widths to entries', async () => {
  const entries = [createMockVisibleMenuItem('File'), createMockVisibleMenuItem('Edit'), createMockVisibleMenuItem('View')]

  const result = await AddWidths.addWidths(entries, 10, 400, 14, 'Arial', 0)

  expect(result).toHaveLength(3)
  expect(mockMeasureTextWidths).toHaveBeenCalledWith(['File', 'Edit', 'View'], 400, 14, 'Arial', 0)
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

test('addWidths - should handle single entry', async () => {
  const entries = [createMockVisibleMenuItem('Help')]

  const result = await AddWidths.addWidths(entries, 5, 300, 12, 'Helvetica', 1)

  expect(result).toHaveLength(1)
  expect(result[0]).toHaveProperty('width')
  expect(result[0].width).toBeGreaterThan(0)
  expect(result[0].label).toBe('Help')
})

test('addWidths - should preserve all original properties', async () => {
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
