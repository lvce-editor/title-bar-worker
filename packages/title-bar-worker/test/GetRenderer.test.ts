import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'

test('getRenderer - should return renderEntries for RenderEntries type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const renderer = GetRenderer.getRenderer(DiffType.RenderEntries)
  expect(typeof renderer).toBe('function')

  const result = renderer(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
})

test('getRenderer - should throw error for unknown renderer type', () => {
  expect(() => {
    GetRenderer.getRenderer(999)
  }).toThrow('unknown renderer')
})
