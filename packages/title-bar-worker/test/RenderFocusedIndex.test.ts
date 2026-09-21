import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'

test('renderFocusedIndex - when focusedIndex is -1', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: -1 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual([])
})

test('renderFocusedIndex - when focusedIndex is 0', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: 0, uid: 41 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', 41, '.TitleBarMenuBar'])
})

test('renderFocusedIndex - when focusedIndex is 1', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: 1, uid: 42 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', 42, '.TitleBarMenuBar'])
})

test('renderFocusedIndex - when focusedIndex is 2', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: 2, uid: 43 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', 43, '.TitleBarMenuBar'])
})

test('renderFocusedIndex - when oldState focusedIndex changes from -1 to 0', () => {
  const oldState = { ...createDefaultState(), focusedIndex: -1 }
  const newState = { ...createDefaultState(), focusedIndex: 0, uid: 44 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', 44, '.TitleBarMenuBar'])
})

test('renderFocusedIndex - when oldState focusedIndex changes from 0 to 1', () => {
  const oldState = { ...createDefaultState(), focusedIndex: 0 }
  const newState = { ...createDefaultState(), focusedIndex: 1, uid: 45 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', 45, '.TitleBarMenuBar'])
})

test('renderFocusedIndex - when oldState focusedIndex changes from 1 to -1', () => {
  const oldState = { ...createDefaultState(), focusedIndex: 1 }
  const newState = { ...createDefaultState(), focusedIndex: -1 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual([])
})
