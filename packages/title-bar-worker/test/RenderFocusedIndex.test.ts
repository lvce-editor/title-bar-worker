import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'

const createDefaultState = (): TitleBarMenuBarState => {
  return {
    uid: 1,
    titleBarEntries: [],
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    labelFontWeight: 400,
    labelFontSize: 13,
    labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
    labelPadding: 8,
    labelLetterSpacing: 0,
    titleBarHeight: 30,
    x: 0,
    y: 0,
    width: 800,
    height: 30,
    iconWidth: 30,
  }
}

test('renderFocusedIndex - when focusedIndex is -1', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: -1 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual([])
})

test('renderFocusedIndex - when focusedIndex is 0', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: 0 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - when focusedIndex is 1', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: 1 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - when focusedIndex is 2', () => {
  const oldState = createDefaultState()
  const newState = { ...createDefaultState(), focusedIndex: 2 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - when oldState focusedIndex changes from -1 to 0', () => {
  const oldState = { ...createDefaultState(), focusedIndex: -1 }
  const newState = { ...createDefaultState(), focusedIndex: 0 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - when oldState focusedIndex changes from 0 to 1', () => {
  const oldState = { ...createDefaultState(), focusedIndex: 0 }
  const newState = { ...createDefaultState(), focusedIndex: 1 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - when oldState focusedIndex changes from 1 to -1', () => {
  const oldState = { ...createDefaultState(), focusedIndex: 1 }
  const newState = { ...createDefaultState(), focusedIndex: -1 }

  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)

  expect(result).toEqual([])
})
