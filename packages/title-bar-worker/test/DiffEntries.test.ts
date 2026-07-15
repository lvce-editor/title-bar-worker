import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffEntries/DiffEntries.ts'

test('isEqual - menu bar visibility is equal', () => {
  const state = createDefaultState()

  expect(isEqual(state, state)).toBe(true)
})

test('isEqual - menu bar visibility changed', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    titleBarMenuBarEnabled: false,
  }

  expect(isEqual(oldState, newState)).toBe(false)
})
