import { expect, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowUp from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowUp.ts'

test.skip('handleKeyArrowUp - with menu open', async () => {
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
            label: '1',
          },
          {
            label: '2',
          },
        ],
        level: 0,
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
  expect(await ViewletTitleBarMenuBarHandleKeyArrowUp.handleKeyArrowUp(state)).toMatchObject({
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            label: '1',
          },
          {
            label: '2',
          },
        ],
        level: 0,
      },
    ],
  })
})
