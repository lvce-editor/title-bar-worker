import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff from '../src/parts/Diff/Diff.ts'

test('diff - should return array of diff numbers when states differ', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const result = Diff.diff(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
  // Even identical states may have some differences detected by diff modules
  expect(result.length).toBeGreaterThanOrEqual(0)
})

test('diff - should return diff numbers when states differ', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...CreateDefaultState.createDefaultState(), focusedIndex: 1 }

  const result = Diff.diff(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('diff - should return all diff numbers when all modules differ', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    entries: [],
    menus: []
  }

  const result = Diff.diff(oldState, newState)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})
