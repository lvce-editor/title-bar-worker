import { beforeEach, expect, jest, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.js', () => {
  return {
    // @ts-ignore
    getMenuEntries: (id): any => {
      switch (id) {
        case MenuEntryId.Edit:
          return [
            {
              flags: MenuItemFlags.Disabled,
              id: 'undo',
              label: 'Undo',
            },
            {
              flags: MenuItemFlags.Disabled,
              id: 'redo',
              label: 'Redo',
            },
          ]
        case MenuEntryId.File:
          return [
            {
              flags: MenuItemFlags.Disabled,
              id: 'newFile',
              label: 'New File',
            },
            {
              flags: MenuItemFlags.Disabled,
              id: 'newWindow',
              label: 'New Window',
            },
            {
              flags: MenuItemFlags.SubMenu,
              id: MenuEntryId.OpenRecent,
              label: 'Open Recent',
            },
          ]
        case MenuEntryId.OpenRecent:
          return [
            {
              flags: MenuItemFlags.None,
              label: 'file-1.txt',
            },
            {
              flags: MenuItemFlags.None,
              label: 'file-2.txt',
            },
          ]
        case MenuEntryId.Selection:
          return []
        default:
          throw new Error(`no menu entries found for ${id}`)
      }
    },
  }
})

const ViewletTitleBarMenuBarHandleMenuMouseOver = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts')

test('handleMouseOverMenu - focus item', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)).toMatchObject({
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
    ],
  })
})

test('handleMouseOverMenu - focus item - already focused', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
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
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)).toBe(state)
})

test('handleMouseOverMenu - open sub menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)).toMatchObject({
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
      {
        focusedIndex: -1,
        items: [
          {
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  })
})

test('handleMouseOverMenu - unfocus sub menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
      {
        focusedIndex: 1,
        items: [
          {
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)).toMatchObject({
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
      {
        focusedIndex: -1,
        items: [
          {
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  })
})

test('handleMouseOverMenu - unfocus menu and sub menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
      {
        focusedIndex: 1,
        items: [
          {
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)).toMatchObject({
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
      },
    ],
  })
})
