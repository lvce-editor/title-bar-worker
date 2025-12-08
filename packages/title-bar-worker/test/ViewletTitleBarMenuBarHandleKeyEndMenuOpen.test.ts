import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyEndMenuOpen from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEndMenuOpen.ts'

test('handleKeyEndMenuOpen - focus last item', async () => {
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
  }
  const result = ViewletTitleBarMenuBarHandleKeyEndMenuOpen.handleKeyEndMenuOpen(state)
  expect(result).toMatchObject({
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
  })
})

test('handleKeyEndMenuOpen - skip disabled items', async () => {
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
            flags: MenuItemFlags.Disabled,
            label: '2',
          },
          {
            command: 'Test.command3',
            flags: MenuItemFlags.Disabled,
            label: '3',
          },
          {
            command: 'Test.command4',
            flags: MenuItemFlags.None,
            label: '4',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyEndMenuOpen.handleKeyEndMenuOpen(state)
  expect(result).toMatchObject({
    menus: [
      {
        focusedIndex: 3,
        items: [
          {
            command: 'Test.command1',
            flags: MenuItemFlags.None,
            label: '1',
          },
          {
            command: 'Test.command2',
            flags: MenuItemFlags.Disabled,
            label: '2',
          },
          {
            command: 'Test.command3',
            flags: MenuItemFlags.Disabled,
            label: '3',
          },
          {
            command: 'Test.command4',
            flags: MenuItemFlags.None,
            label: '4',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})

test('handleKeyEndMenuOpen - skip separators', async () => {
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
            command: '',
            flags: MenuItemFlags.Separator,
            label: '',
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
  }
  const result = ViewletTitleBarMenuBarHandleKeyEndMenuOpen.handleKeyEndMenuOpen(state)
  expect(result).toMatchObject({
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
            command: '',
            flags: MenuItemFlags.Separator,
            label: '',
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

test('handleKeyEndMenuOpen - all items disabled', async () => {
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
            flags: MenuItemFlags.Disabled,
            label: '1',
          },
          {
            command: 'Test.command2',
            flags: MenuItemFlags.Disabled,
            label: '2',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyEndMenuOpen.handleKeyEndMenuOpen(state)
  expect(result).toMatchObject({
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'Test.command1',
            flags: MenuItemFlags.Disabled,
            label: '1',
          },
          {
            command: 'Test.command2',
            flags: MenuItemFlags.Disabled,
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

test('handleKeyEndMenuOpen - with submenu item', async () => {
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
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: 'submenu',
            label: 'Submenu',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyEndMenuOpen.handleKeyEndMenuOpen(state)
  expect(result).toMatchObject({
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
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: 'submenu',
            label: 'Submenu',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})

test('handleKeyEndMenuOpen - single focusable item', async () => {
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
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = ViewletTitleBarMenuBarHandleKeyEndMenuOpen.handleKeyEndMenuOpen(state)
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
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  })
})
