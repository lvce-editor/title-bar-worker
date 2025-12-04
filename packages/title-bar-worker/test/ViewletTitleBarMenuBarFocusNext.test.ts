import { expect, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'
import * as ViewletTitleBarMenuBarFocusNext from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusNext.ts'

test.skip('focusNext', () => {
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
  }
  expect(ViewletTitleBarMenuBarFocusNext.focusNext(state)).toMatchObject({
    focusedIndex: 1,
  })
})

test.skip('focusNext - with disabled items', () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    titleBarEntries: [
      {
        flags: MenuItemFlags.None,
        id: MenuEntryId.File,
        name: 'File',
      },
      {
        flags: MenuItemFlags.None,
        id: MenuEntryId.Edit,
        name: 'Edit',
      },
      {
        flags: MenuItemFlags.None,
        id: MenuEntryId.Selection,
        name: 'Selection',
      },
    ],
  }
  expect(ViewletTitleBarMenuBarFocusNext.focusNext(state)).toMatchObject({
    focusedIndex: 1,
  })
})

test.skip('focusNext - at end', () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 2,
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
  expect(ViewletTitleBarMenuBarFocusNext.focusNext(state)).toMatchObject({
    focusedIndex: 0,
  })
})
