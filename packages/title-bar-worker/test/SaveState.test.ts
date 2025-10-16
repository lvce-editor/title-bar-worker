import { expect, test } from '@jest/globals'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'

test('saveState', () => {
  const result = SaveState.saveState(123)
  expect(result).toEqual({
    x: 1,
  })
})

test('saveState - different uid', () => {
  const result = SaveState.saveState(456)
  expect(result).toEqual({
    x: 1,
  })
})
