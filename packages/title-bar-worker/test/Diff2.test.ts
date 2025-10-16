import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('diff2 - should return empty array when states are equal', () => {
  const uid = 1
  const state = CreateDefaultState.createDefaultState()
  TitleBarMenuBarStates.set(uid, state, state)

  const result = Diff2.diff2(uid)
  expect(result).toEqual([])
})

test('diff2 - should return diff result when states differ', () => {
  const uid = 2
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...CreateDefaultState.createDefaultState(), focusedIndex: 1 }
  TitleBarMenuBarStates.set(uid, oldState, newState)

  const result = Diff2.diff2(uid)
  expect(Array.isArray(result)).toBe(true)
})
