import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.ts'

test('handleKeyArrowLeftMenuClosed - moves to previous entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.handleKeyArrowLeftMenuClosed(state)
  expect(result).toMatchObject({
    focusedIndex: 0,
    isMenuOpen: false,
  })
})

test('handleKeyArrowLeftMenuClosed - wraps to last entry when at start', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.handleKeyArrowLeftMenuClosed(state)
  expect(result).toMatchObject({
    focusedIndex: 2,
    isMenuOpen: false,
  })
})

test('handleKeyArrowLeftMenuClosed - with menu closed does not open menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.handleKeyArrowLeftMenuClosed(state)
  expect(result.isMenuOpen).toBe(false)
  expect(result.menus).toEqual([])
  expect(result.focusedIndex).toBe(1)
})

test('handleKeyArrowLeftMenuClosed - preserves other state properties', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    height: 600,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
    ],
    width: 800,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.handleKeyArrowLeftMenuClosed(state)
  expect(result.width).toBe(800)
  expect(result.height).toBe(600)
  expect(result.focusedIndex).toBe(0)
  expect(result.isMenuOpen).toBe(false)
})

test('handleKeyArrowLeftMenuClosed - with single entry wraps to same entry', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.handleKeyArrowLeftMenuClosed(state)
  expect(result).toMatchObject({
    focusedIndex: 0,
    isMenuOpen: false,
  })
})

test('handleKeyArrowLeftMenuClosed - with multiple entries moves through all', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 3,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 3,
        label: 'View',
        level: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.handleKeyArrowLeftMenuClosed(state)
  expect(result).toMatchObject({
    focusedIndex: 2,
    isMenuOpen: false,
  })
})
