import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandlePointerOver from '../src/parts/HandlePointerOver/HandlePointerOver.ts'

test('handlePointerOver - should focus entry when name matches', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
    titleBarEntries: [
      {
        label: 'File',
      },
      {
        label: 'Edit',
      },
      {
        label: 'View',
      },
    ],
  }
  const result = await HandlePointerOver.handlePointerOver(state, 'Edit')
  expect(result.focusedIndex).toBe(1)
  expect(result).not.toBe(state)
})

test('handlePointerOver - should return state unchanged when name does not match', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
    titleBarEntries: [
      {
        label: 'File',
      },
      {
        label: 'Edit',
      },
    ],
  }
  const result = HandlePointerOver.handlePointerOver(state, 'NonExistent')
  expect(result).toBe(state)
  const finalResult = result === state ? result : await result
  expect(finalResult.focusedIndex).toBe(-1)
})

test('handlePointerOver - should work when menu is open', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    titleBarEntries: [
      {
        label: 'File',
      },
      {
        label: 'Edit',
      },
      {
        label: 'View',
      },
    ],
  }
  const result = await HandlePointerOver.handlePointerOver(state, 'View')
  expect(result.focusedIndex).toBe(2)
  expect(result).not.toBe(state)
})

test('handlePointerOver - should work with empty titleBarEntries', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
    titleBarEntries: [],
  }
  const result = HandlePointerOver.handlePointerOver(state, 'File')
  expect(result).toBe(state)
})

test('handlePointerOver - should update focusedIndex when matching first entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
    titleBarEntries: [
      {
        label: 'File',
      },
      {
        label: 'Edit',
      },
    ],
  }
  const result = await HandlePointerOver.handlePointerOver(state, 'File')
  expect(result.focusedIndex).toBe(0)
  expect(result).not.toBe(state)
})

test('handlePointerOver - should update focusedIndex when matching last entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
    titleBarEntries: [
      {
        label: 'File',
      },
      {
        label: 'Edit',
      },
      {
        label: 'View',
      },
    ],
  }
  const result = await HandlePointerOver.handlePointerOver(state, 'View')
  expect(result.focusedIndex).toBe(2)
  expect(result).not.toBe(state)
})
