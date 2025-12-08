import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyHomeMenuOpen from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyHomeMenuOpen.ts'

test('handleKeyHomeMenuOpen - focus first item', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 2,
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
          {
            command: 'Test.command3',
            flags: MenuItemFlags.None,
            label: '3',
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
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyHomeMenuOpen.handleKeyHomeMenuOpen(state)
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
          {
            command: 'Test.command3',
            flags: MenuItemFlags.None,
            label: '3',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})

test('handleKeyHomeMenuOpen - skip disabled and separator items', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 3,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Separator,
            label: '',
          },
          {
            command: 'Test.disabled',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled',
          },
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
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyHomeMenuOpen.handleKeyHomeMenuOpen(state)
  expect(result).toMatchObject({
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Separator,
            label: '',
          },
          {
            command: 'Test.disabled',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled',
          },
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

test('handleKeyHomeMenuOpen - already at first item', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
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
  const result = ViewletTitleBarMenuBarHandleKeyHomeMenuOpen.handleKeyHomeMenuOpen(state)
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

test('handleKeyHomeMenuOpen - only returns first menu', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 2,
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
          {
            command: 'Test.command3',
            flags: MenuItemFlags.None,
            label: '3',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
      {
        focusedIndex: 1,
        items: [
          {
            command: 'Test.sub1',
            flags: MenuItemFlags.None,
            label: 'sub1',
          },
          {
            command: 'Test.sub2',
            flags: MenuItemFlags.None,
            label: 'sub2',
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
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyHomeMenuOpen.handleKeyHomeMenuOpen(state)
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
          {
            command: 'Test.command3',
            flags: MenuItemFlags.None,
            label: '3',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})
