import { beforeEach, expect, jest, test } from '@jest/globals'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBar from '../src/parts/TitleBarMenuBar/TitleBarMenuBar.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/MeasureTextWidths/MeasureTextWidths.js', () => {
  return {
    measureTextWidths: (): readonly number[] => {
      return [25]
    },
  }
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

const ViewletTitleBarMenuBarFocusIndex = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusIndex.ts')

test.skip('focusIndex - when open - when same index', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
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
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 0)).toMatchObject({
    focusedIndex: 0,
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
  })
})

test.skip('focusIndex - when opening different index', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
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
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)).toMatchObject({
    focusedIndex: 1,
    menus: [
      {
        level: 0,
        items: [
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
        ],
      },
    ],
  })
})

test.skip('focusIndex - when open - race condition', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: true,
    titleBarEntries: [
      {
        id: MenuEntryId.File,
        label: 'File',
      },
      {
        id: MenuEntryId.Edit,
        label: 'Edit',
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)).toMatchObject({
    focusedIndex: 1,
    menus: [
      {
        level: 0,
        items: [
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
        ],
      },
    ],
  })
})

test.skip('focusIndex - when closed - when same index', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: false,
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
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 0)).toMatchObject({
    focusedIndex: 0,
  })
})

test.skip('focusIndex - when closed - when different index', async () => {
  const state = {
    // @ts-ignore
    ...ViewletTitleBarMenuBar.create(),
    focusedIndex: 0,
    isMenuOpen: false,
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
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)).toMatchObject({
    focusedIndex: 1,
  })
})
