import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyEscape from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEscape.ts'

test('handleKeyEscape - close sub menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: 'File.new',
            flags: MenuItemFlags.None,
            label: 'New File',
          },
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
      {
        focusedIndex: -1,
        items: [
          {
            command: 'File.openRecent',
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            command: 'File.openRecent',
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
        x: 150,
        y: 25,
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
  const result = await ViewletTitleBarMenuBarHandleKeyEscape.handleKeyEscape(state)
  expect(result).toMatchObject({
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: 'File.new',
            flags: MenuItemFlags.None,
            label: 'New File',
          },
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})
