import { expect, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'
import * as ViewletTitleBarMenuBarCloseMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarCloseMenu.ts'

test.skip("closeMenu - don't keep focus", () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    titleBarEntries: [
      {
        id: MenuEntryId.File,
        name: 'File',
      },
      {
        id: MenuEntryId.Edit,
        name: 'Edit',
      },
    ],
    focusedIndex: 0,
  }
  expect(ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ false)).toMatchObject({
    isMenuOpen: false,
  })
})

test.skip('closeMenu - keep focus', () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    titleBarEntries: [
      {
        id: MenuEntryId.File,
        name: 'File',
      },
      {
        id: MenuEntryId.Edit,
        name: 'Edit',
      },
    ],
    focusedIndex: 0,
  }
  expect(ViewletTitleBarMenuBarCloseMenu.closeMenu(state, /* keepFocus */ true)).toMatchObject({
    isMenuOpen: false,
    focusedIndex: 0,
  })
})
