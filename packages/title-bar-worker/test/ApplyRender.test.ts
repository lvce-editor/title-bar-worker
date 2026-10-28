import { expect, test } from '@jest/globals'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('applyRender - should return empty array when diffResult is empty', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult: number[] = []

  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test('applyRender - should return commands when diffResult has items', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = { ...CreateDefaultState.createDefaultState(), focusedIndex: 1 }
  const diffResult = [DiffType.RenderFocusedIndex]

  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('applyRender flattens non-empty menu render commands', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    menus: [{ focusedIndex: 0, items: [], level: 0, x: 0, y: 0 }],
    menuUid: 2,
  }

  const result = ApplyRender.applyRender(oldState, newState, [DiffType.RenderMenus])

  expect(result[0]).toEqual(['Viewlet.createFunctionalRoot', 'TitleBarMenu', 2, true, undefined, newState.uid])
})

test('applyRender - should filter out empty results', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult = [DiffType.RenderMenus]

  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(Array.isArray(result)).toBe(true)
  // The result should only contain non-empty command arrays
  for (const command of result) {
    expect(Array.isArray(command)).toBe(true)
    expect(command.length).toBeGreaterThan(0)
  }
})

test('applyRender omits focus commands when no item is focused', () => {
  const state = CreateDefaultState.createDefaultState()
  expect(ApplyRender.applyRender(state, state, [DiffType.RenderFocusedIndex])).toEqual([])
})
