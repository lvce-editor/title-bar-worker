import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen.ts'

test('handleKeyArrowRightMenuOpen - no menu returns state', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [],
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
  const result = await ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen.handleKeyArrowRightMenuOpen(state)
  expect(result).toBe(state)
})

test('handleKeyArrowRightMenuOpen - focusedIndex -1 calls focusNext', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'File.new',
            flags: MenuItemFlags.None,
            label: 'New File',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
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
  const result = await ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen.handleKeyArrowRightMenuOpen(state)
  expect(result).toMatchObject({
    focusedIndex: 1,
  })
})

test('handleKeyArrowRightMenuOpen - item without SubMenu calls focusNext', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: 'File.new',
            flags: MenuItemFlags.None,
            label: 'New File',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
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
  const result = await ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen.handleKeyArrowRightMenuOpen(state)
  expect(result).toMatchObject({
    focusedIndex: 1,
  })
})

test('handleKeyArrowRightMenuOpen - item with SubMenu but no id calls focusNext', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            label: 'Open Recent',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
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
  const result = await ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen.handleKeyArrowRightMenuOpen(state)
  expect(result).toMatchObject({
    focusedIndex: 1,
  })
})
