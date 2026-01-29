import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer3 from '../src/parts/GetRenderer3/GetRenderer3.ts'

test('getRenderer3 - should return renderTitleBar for RenderEntries type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const renderer = GetRenderer3.getRenderer3(DiffType.RenderEntries)
  expect(typeof renderer).toBe('function')

  const result = renderer(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
})

test('getRenderer3 - should return renderFocusContext for RenderFocusContext type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const renderer = GetRenderer3.getRenderer3(DiffType.RenderFocusContext)
  expect(typeof renderer).toBe('function')

  const result = renderer(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
})

test('getRenderer3 - should return renderFocusedIndex for RenderFocusedIndex type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const renderer = GetRenderer3.getRenderer3(DiffType.RenderFocusedIndex)
  expect(typeof renderer).toBe('function')

  const result = renderer(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
})

test('getRenderer3 - should return renderMenus for RenderMenus type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const renderer = GetRenderer3.getRenderer3(DiffType.RenderMenus)
  expect(typeof renderer).toBe('function')

  const result = renderer(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
})

test('getRenderer3 - should throw error for unknown renderer type', () => {
  expect(() => {
    GetRenderer3.getRenderer3(999)
  }).toThrow('unknown renderer')
})
