import { afterEach, beforeEach, expect, test } from '@jest/globals'
import * as CreateTextMeasureContext from '../src/parts/CreateTextMeasureContext/CreateTextMeasureContext.ts'

interface MockCanvasContext {
  font: string
  letterSpacing: string
}

class SuccessfulOffscreenCanvas {
  constructor(_width: number, _height: number) {}

  getContext(type: string): MockCanvasContext | null {
    if (type !== '2d') {
      return null
    }
    return {
      font: '',
      letterSpacing: '',
    }
  }
}

class FailingOffscreenCanvas {
  constructor(_width: number, _height: number) {}

  getContext(): null {
    return null
  }
}

const originalOffscreenCanvas = (globalThis as any).OffscreenCanvas

afterEach(() => {
  ;(globalThis as any).OffscreenCanvas = originalOffscreenCanvas
})

test('createTextMeasureContext - should create canvas context with correct properties', () => {
  ;(globalThis as any).OffscreenCanvas = SuccessfulOffscreenCanvas
  const letterSpacing = '2px'
  const font = '16px Arial'

  const context = CreateTextMeasureContext.createTextMeasureContext(letterSpacing, font)

  expect(context).toBeDefined()
  expect(context.letterSpacing).toBe(letterSpacing)
  expect(context.font).toBe(font)
})

test('createTextMeasureContext - should throw error if canvas context creation fails', () => {
  ;(globalThis as any).OffscreenCanvas = FailingOffscreenCanvas
  expect(() => {
    CreateTextMeasureContext.createTextMeasureContext('1px', '12px sans-serif')
  }).toThrow('Failed to get canvas context 2d')
})

test('createTextMeasureContext - should handle different font and spacing values', () => {
  ;(globalThis as any).OffscreenCanvas = SuccessfulOffscreenCanvas
  const letterSpacing = '0.5px'
  const font = '14px Helvetica'

  const context = CreateTextMeasureContext.createTextMeasureContext(letterSpacing, font)

  expect(context.letterSpacing).toBe(letterSpacing)
  expect(context.font).toBe(font)
})

beforeEach(() => {
  ;(globalThis as any).OffscreenCanvas = SuccessfulOffscreenCanvas
})
