import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowUp from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowUp.ts'

test('handleKeyArrowUp - with menu open', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: 'Test.command1',
            flags: MenuItemFlags.None,
            label: '1',
          },
          {
            command: 'Test.command2',
            flags: MenuItemFlags.None,
            label: '2',
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
  const result = await ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp(state)
  expect(result).toMatchObject({
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: 'Test.command1',
            flags: MenuItemFlags.None,
            label: '1',
          },
          {
            command: 'Test.command2',
            flags: MenuItemFlags.None,
            label: '2',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})
