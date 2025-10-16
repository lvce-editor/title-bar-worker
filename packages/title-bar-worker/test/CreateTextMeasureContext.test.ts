import { expect, test } from '@jest/globals'
import * as CreateTextMeasureContext from '../src/parts/CreateTextMeasureContext/CreateTextMeasureContext.ts'

// Skipped because CreateTextMeasureContext uses OffscreenCanvas which is not available in Node.js test environment
test.skip('createTextMeasureContext - should create canvas context with correct properties', () => {
  const letterSpacing = '2px'
  const font = '16px Arial'

  const context = CreateTextMeasureContext.createTextMeasureContext(letterSpacing, font)

  expect(context).toBeDefined()
  expect(context.letterSpacing).toBe(letterSpacing)
  expect(context.font).toBe(font)
})

test.skip('createTextMeasureContext - should throw error if canvas context creation fails', () => {
  // This test would verify error handling when getContext('2d') returns null
  expect(() => {
    CreateTextMeasureContext.createTextMeasureContext('1px', '12px sans-serif')
  }).toThrow('Failed to get canvas context 2d')
})

test.skip('createTextMeasureContext - should handle different font and spacing values', () => {
  const letterSpacing = '0.5px'
  const font = '14px Helvetica'

  const context = CreateTextMeasureContext.createTextMeasureContext(letterSpacing, font)

  expect(context.letterSpacing).toBe(letterSpacing)
  expect(context.font).toBe(font)
})
