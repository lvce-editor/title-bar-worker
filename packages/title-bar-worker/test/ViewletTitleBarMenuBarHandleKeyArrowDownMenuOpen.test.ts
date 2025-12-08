import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.ts'

test('handleKeyArrowDownMenuOpen - focus next item', () => {
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
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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

test('handleKeyArrowDownMenuOpen - skip disabled items', () => {
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
            command: 'Test.disabled',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled',
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
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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
            command: 'Test.disabled',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled',
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

test('handleKeyArrowDownMenuOpen - skip separator items', () => {
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
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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

test('handleKeyArrowDownMenuOpen - wrap around to first item', () => {
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
  }
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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

test('handleKeyArrowDownMenuOpen - wrap around skipping disabled items', () => {
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
            command: 'Test.disabled',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled',
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
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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
            command: 'Test.disabled',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled',
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

test('handleKeyArrowDownMenuOpen - all items disabled', () => {
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
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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

test('handleKeyArrowDownMenuOpen - only affects last menu', () => {
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
      {
        focusedIndex: 0,
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
  }
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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
            command: 'Test.command2',
            flags: MenuItemFlags.None,
            label: '2',
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
  })
})

test('handleKeyArrowDownMenuOpen - no menu open', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: false,
    menus: [],
  }
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
  expect(result).toBe(state)
})

test('handleKeyArrowDownMenuOpen - with submenu item', () => {
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
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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

test('handleKeyArrowDownMenuOpen - focusedIndex is -1', () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: -1,
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
  }
  const result = ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.handleKeyArrowDownMenuOpen(state)
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
