import { expect, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowLeft from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowLeft.ts'

test.skip('handleKeyArrowLeft - close sub menu', () => {
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
      },
      {
        level: 1,
        focusedIndex: -1,
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
  }
  expect(ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft(state)).toMatchObject({
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
    ],
  })
})
