import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'

test('saveState', () => {
  const state = createDefaultState()
  const result = SaveState.saveState(state)
  expect(result).toEqual({
    focusedIndex: -1,
  })
})
