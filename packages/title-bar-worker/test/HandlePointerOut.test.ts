import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandlePointerOut from '../src/parts/HandlePointerOut/HandlePointerOut.ts'

test('handlePointerOut - should return state unchanged when index is -1', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = HandlePointerOut.handlePointerOut(state, 0, 0)
  expect(result).toBe(state)
})

test('handlePointerOut - should return state unchanged when pointer is outside menu area', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = HandlePointerOut.handlePointerOut(state, 1000, 1000)
  expect(result).toBe(state)
})

test('handlePointerOut - should unfocus when menu is closed and pointer is over entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = await HandlePointerOut.handlePointerOut(state, 50, 15)
  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handlePointerOut - should return state unchanged when menu is open and pointer is over entry', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: true,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = HandlePointerOut.handlePointerOut(state, 50, 15)
  expect(result).toBe(state)
})

test('handlePointerOut - should unfocus when menu is closed and pointer is over second entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = await HandlePointerOut.handlePointerOut(state, 120, 15)
  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handlePointerOut - should work with empty titleBarEntries', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    iconWidth: 30,
    titleBarEntries: [],
    x: 0,
  }
  const result = HandlePointerOut.handlePointerOut(state, 50, 15)
  expect(result).toBe(state)
})

test('handlePointerOut - should calculate menu offset correctly with non-zero x', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [
      {
        width: 100,
      },
    ],
    x: 100,
  }
  const result = await HandlePointerOut.handlePointerOut(state, 150, 15)
  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handlePointerOut - should handle pointer at boundary of first entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = await HandlePointerOut.handlePointerOut(state, 30, 15)
  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handlePointerOut - should handle pointer at boundary between entries', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [
      {
        width: 100,
      },
      {
        width: 80,
      },
    ],
    x: 0,
  }
  const result = await HandlePointerOut.handlePointerOut(state, 130, 15)
  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})
