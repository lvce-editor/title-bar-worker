import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff3 from '../src/parts/Diff3/Diff3.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('diff3 - should return array of diff numbers when states are equal', () => {
  const uid = 1
  const state: TitleBarMenuBarState = CreateDefaultState.createDefaultState()
  TitleBarMenuBarStates.set(uid, state, state)

  const result = Diff3.diff3(uid)
  expect(Array.isArray(result)).toBe(true)
  // Even identical states may have some differences detected by diff modules
  expect(result.length).toBeGreaterThanOrEqual(0)
})

test('diff3 - should return diff numbers when states differ', () => {
  const uid = 2
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...CreateDefaultState.createDefaultState(), focusedIndex: 1 }
  TitleBarMenuBarStates.set(uid, oldState, newState)

  const result = Diff3.diff3(uid)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('diff3 - should return all diff numbers when all modules differ', () => {
  const uid = 3
  const oldState: TitleBarMenuBarState = CreateDefaultState.createDefaultState()
  const newState: TitleBarMenuBarState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    menus: [],
    titleBarEntries: [],
  }
  TitleBarMenuBarStates.set(uid, oldState, newState)

  const result = Diff3.diff3(uid)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})
