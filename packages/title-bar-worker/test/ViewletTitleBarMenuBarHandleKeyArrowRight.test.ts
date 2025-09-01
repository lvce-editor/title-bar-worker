import { beforeEach, expect, jest, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.js', () => {
  return {
    // @ts-ignore
    getMenuEntries: (id): any => {
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

const ViewletTitleBarMenuBarHandleKeyArrowRight = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowRight.ts')

test.skip('handleKeyArrowRight - open sub menu', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    titleBarEntries: [
      {
        id: MenuEntryId.File,
        name: 'File',
      },
      {
        id: MenuEntryId.Edit,
        name: 'Edit',
      },
      {
        id: MenuEntryId.Selection,
        name: 'Selection',
      },
    ],
    isMenuOpen: true,
    menus: [
      {
        level: 0,
        focusedIndex: 1,
        items: [
          {
            label: 'New File',
            flags: MenuItemFlags.None,
          },
          {
            label: 'Open Recent',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
          },
        ],
        x: 0,
        y: 0,
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight(state)).toMatchObject({
    menus: [
      {
        level: 0,
        focusedIndex: 1,
        items: [
          {
            label: 'New File',
            flags: MenuItemFlags.None,
          },
          {
            label: 'Open Recent',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
          },
        ],
      },
      {
        level: 1,
        focusedIndex: 0,
        items: [
          {
            label: 'file-1.txt',
          },
          {
            label: 'file-2.txt',
          },
        ],
        x: 150,
        y: 25,
      },
    ],
  })
})
