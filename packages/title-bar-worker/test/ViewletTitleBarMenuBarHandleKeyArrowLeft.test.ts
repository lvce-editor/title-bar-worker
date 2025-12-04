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
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            flags: MenuItemFlags.None,
            label: 'New File',
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
            label: 'file-1.txt',
          },
          {
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
  }
  expect(ViewletTitleBarMenuBarHandleKeyArrowLeft.handleKeyArrowLeft(state)).toMatchObject({
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            flags: MenuItemFlags.None,
            label: 'New File',
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
