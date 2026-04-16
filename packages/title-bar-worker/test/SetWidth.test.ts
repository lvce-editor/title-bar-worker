import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setWidth } from '../src/parts/SetWidth/SetWidth.ts'

test('setWidth - computes centered menu bar width from window width', () => {
  const state = createDefaultState()

  const newState = setWidth(state, 1000)

  expect(newState.width).toBe(470) // 1000 / 2 - 0 / 2 - 0 - 30
})

test('setWidth - reserves space for measured title width', () => {
  const state = {
    ...createDefaultState(),
    titleWidth: 200,
    x: 50,
  }

  const newState = setWidth(state, 1000)

  expect(newState.width).toBe(320) // 1000 / 2 - 200 / 2 - 50 - 30
})

test('setWidth - preserves unrelated state properties', () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 2,
    title: 'Example',
  }

  const newState = setWidth(state, 600)

  expect(newState.focusedIndex).toBe(2)
  expect(newState.title).toBe('Example')
})
