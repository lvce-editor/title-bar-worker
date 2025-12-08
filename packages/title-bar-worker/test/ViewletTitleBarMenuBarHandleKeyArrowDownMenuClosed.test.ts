import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.ts'

test('handleKeyArrowDownMenuClosed - focusedIndex -1 returns same state', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    isMenuOpen: false,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result).toBe(state)
})

test('handleKeyArrowDownMenuClosed - opens menu with focus', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(0)
  expect(result.menus).toHaveLength(1)
  expect(result.menus[0].id).toBe(2)
  expect(result.menus[0].level).toBe(0)
  expect(result.menus[0].focusedIndex).toBeGreaterThanOrEqual(0)
  expect(result.menus[0].x).toBe(30) // x + iconWidth
  expect(result.menus[0].y).toBe(30) // titleBarHeight
})

test('handleKeyArrowDownMenuClosed - opens menu at different index', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 5 }, { id: 2 }], // File and Edit menu IDs
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.isMenuOpen).toBe(true)
  expect(result.focusedIndex).toBe(1)
  expect(result.menus).toHaveLength(1)
  expect(result.menus[0].id).toBe(2)
  expect(result.menus[0].focusedIndex).toBeGreaterThanOrEqual(0)
})

test('handleKeyArrowDownMenuClosed - calculates menu position correctly', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [
      { flags: 0, id: 5, isExpanded: false, isFocused: false, key: 0, label: 'File', level: 0, width: 50 },
      { flags: 0, id: 2, isExpanded: false, isFocused: false, key: 1, label: 'Edit', level: 0, width: 50 },
    ],
    titleBarHeight: 30,
    x: 100,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.menus[0].x).toBe(180) // x + totalWidth (50) + iconWidth (30)
  expect(result.menus[0].y).toBe(30)
})

test('handleKeyArrowDownMenuClosed - menu has items', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.menus[0].items.length).toBeGreaterThan(0)
})

test('handleKeyArrowDownMenuClosed - menu has correct properties', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.menus[0]).toHaveProperty('id')
  expect(result.menus[0]).toHaveProperty('items')
  expect(result.menus[0]).toHaveProperty('level')
  expect(result.menus[0]).toHaveProperty('x')
  expect(result.menus[0]).toHaveProperty('y')
  expect(result.menus[0]).toHaveProperty('width')
  expect(result.menus[0]).toHaveProperty('height')
  expect(result.menus[0]).toHaveProperty('focusedIndex')
})

test('handleKeyArrowDownMenuClosed - opens File menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 5 }], // File menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.isMenuOpen).toBe(true)
  expect(result.menus[0].id).toBe(5)
  expect(result.menus[0].items.length).toBeGreaterThan(0)
})

test('handleKeyArrowDownMenuClosed - opens View menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 16 }], // View menu ID
    titleBarHeight: 30,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.isMenuOpen).toBe(true)
  expect(result.menus[0].id).toBe(16)
  expect(result.menus[0].focusedIndex).toBe(-1) // View menu has no items
})

test('handleKeyArrowDownMenuClosed - preserves other state properties', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    height: 600,
    iconWidth: 30,
    isMenuOpen: false,
    titleBarEntries: [{ id: 2 }], // Edit menu ID
    titleBarHeight: 30,
    width: 800,
    x: 0,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.handleKeyArrowDownMenuClosed(state)
  expect(result.width).toBe(800)
  expect(result.height).toBe(600)
  expect(result.iconWidth).toBe(30)
  expect(result.titleBarHeight).toBe(30)
})
