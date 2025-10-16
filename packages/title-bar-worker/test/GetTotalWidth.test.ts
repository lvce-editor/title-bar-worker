import { expect, test } from '@jest/globals'
import * as GetTotalWidth from '../src/parts/GetTotalWidth/GetTotalWidth.ts'

test('getTotalWidth - should return 0 for empty array', () => {
  const result = GetTotalWidth.getTotalWidth([])
  expect(result).toBe(0)
})

test('getTotalWidth - should sum widths correctly', () => {
  const entries = [{ width: 10 }, { width: 20 }, { width: 30 }]
  const result = GetTotalWidth.getTotalWidth(entries)
  expect(result).toBe(60)
})

test('getTotalWidth - should handle single entry', () => {
  const entries = [{ width: 42 }]
  const result = GetTotalWidth.getTotalWidth(entries)
  expect(result).toBe(42)
})

test('getTotalWidth - should handle zero widths', () => {
  const entries = [{ width: 0 }, { width: 10 }, { width: 0 }]
  const result = GetTotalWidth.getTotalWidth(entries)
  expect(result).toBe(10)
})
