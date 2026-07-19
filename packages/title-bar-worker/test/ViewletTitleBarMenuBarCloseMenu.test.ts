import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarCloseMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarCloseMenu.ts'

test("closeMenu - don't keep focus", () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        id: 1,
        items: [],
        level: 0,
        x: 0,
        y: 30,
      },
    ],
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
  }
  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ false)
  expect(result).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  })
  expect(result).not.toBe(state)
})

test('closeMenu - keep focus', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        id: 1,
        items: [],
        level: 0,
        x: 0,
        y: 30,
      },
      {
        focusedIndex: 1,
        id: 2,
        items: [],
        level: 1,
        x: 200,
        y: 30,
      },
    ],
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
  }
  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ true)
  expect(result).toMatchObject({
    focusedIndex: 0,
    isMenuOpen: false,
    menus: [],
  })
  expect(result).not.toBe(state)
})

test('closeMenu - already closed without focus retention returns the same state', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  }

  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ false)

  expect(result).toBe(state)
})

test('closeMenu - already closed with focus retention returns the same state', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    isMenuOpen: false,
    menus: [],
  }

  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ true)

  expect(result).toBe(state)
})

test('closeMenu - already closed clears focus when requested', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    isMenuOpen: false,
    menus: [],
  }

  const result = ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ false)

  expect(result).not.toBe(state)
  expect(result).toMatchObject({
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
  })
})
