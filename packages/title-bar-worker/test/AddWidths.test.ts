import { afterEach, beforeEach, expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AddWidths from '../src/parts/AddWidths/AddWidths.ts'

interface MockTextMeasureContext {
  letterSpacing: string
  font: string
  measureText(text: string): { width: number }
}

class MockOffscreenCanvas {
  constructor(_width: number, _height: number) {}

  getContext(type: string): MockTextMeasureContext | null {
    if (type !== '2d') {
      return null
    }
    return {
      letterSpacing: '',
      font: '',
      measureText(text: string) {
        return {
          width: text.length * 8,
        }
      },
    }
  }
}

const originalOffscreenCanvas = (globalThis as any).OffscreenCanvas

beforeEach(() => {
  ;(globalThis as any).OffscreenCanvas = MockOffscreenCanvas
})

afterEach(() => {
  ;(globalThis as any).OffscreenCanvas = originalOffscreenCanvas
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
})

test('addWidths - should add widths to entries', async () => {
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
