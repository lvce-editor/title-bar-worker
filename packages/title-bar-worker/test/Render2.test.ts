import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('render2 - should return empty array when diffResult is empty', async () => {
  const uid = 1
  const state = CreateDefaultState.createDefaultState()
  TitleBarMenuBarStates.set(uid, state, state)
  const diffResult: number[] = []

  const result = await Render2.render2(uid, diffResult)
  expect(result).toEqual([])
})

test('render2 - should return commands when diffResult has items', async () => {
  const uid = 2
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...CreateDefaultState.createDefaultState(), focusedIndex: 1 }
  TitleBarMenuBarStates.set(uid, oldState, newState)
  const diffResult = [DiffType.RenderEntries, DiffType.RenderFocusedIndex]

  const result = await Render2.render2(uid, diffResult)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('render2 - should update state after rendering', async () => {
  const uid = 3
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...CreateDefaultState.createDefaultState(), focusedIndex: 2 }
  TitleBarMenuBarStates.set(uid, oldState, newState)
  const diffResult = [DiffType.RenderMenus]

  const result = await Render2.render2(uid, diffResult)
  expect(Array.isArray(result)).toBe(true)

  // Verify that the state was updated (oldState should now equal newState)
  const { newState: updatedNewState, oldState: updatedOldState } = TitleBarMenuBarStates.get(uid)
  expect(updatedOldState).toBe(updatedNewState)
})
