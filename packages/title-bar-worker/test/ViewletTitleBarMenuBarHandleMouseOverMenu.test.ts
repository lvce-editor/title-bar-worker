import { beforeEach, expect, jest, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.js', () => {
  return {
    invoke: () => {
      return {
        x: 0,
        y: 0,
      }
    },
  }
})

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.js', () => {
  return {
    // @ts-ignore
    getMenuEntries: (id) => {
      switch (id) {
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
        case MenuEntryId.Selection:
          return []
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
        default:
          throw new Error(`no menu entries found for ${id}`)
      }
    },
  }
})

const ViewletTitleBarMenuBarHandleMenuMouseOver = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts')

test.skip('handleMouseOverMenu - focus item', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        level: 0,
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
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)).toMatchObject({
    menus: [
      {
        level: 0,
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
      },
    ],
  })
})

test.skip('handleMouseOverMenu - focus item - already focused', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        level: 0,
        focusedIndex: 1,
        x: 0,
        y: 0,
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
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)).toBe(state)
})

test.skip('handleMouseOverMenu - open sub menu', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        level: 0,
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
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)).toMatchObject({
    menus: [
      {
        level: 0,
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
      },
      {
        level: 1,
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
      },
    ],
  })
})

test.skip('handleMouseOverMenu - unfocus sub menu', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        level: 0,
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
      },
      {
        level: 1,
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
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)).toMatchObject({
    menus: [
      {
        level: 0,
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
      },
      {
        level: 1,
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
      },
    ],
  })
})

test.skip('handleMouseOverMenu - unfocus menu and sub menu', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        level: 0,
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
      },
      {
        level: 1,
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
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)).toMatchObject({
    menus: [
      {
        level: 0,
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
      },
    ],
  })
})
