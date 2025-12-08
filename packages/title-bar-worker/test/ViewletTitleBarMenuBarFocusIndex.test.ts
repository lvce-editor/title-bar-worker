import { beforeEach, expect, jest, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

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

jest.unstable_mockModule('../src/parts/GetMenuEntries2/GetMenuEntries2.js', () => {
  return {
    // @ts-ignore
    getMenuEntries2: async (state: any, props: any): Promise<any> => {
      switch (props.menuId) {
        case MenuEntryId.Edit:
          return [
            {
              command: 'Edit.undo',
              flags: MenuItemFlags.Disabled,
              id: 'undo',
              label: 'Undo',
            },
            {
              command: 'Edit.redo',
              flags: MenuItemFlags.Disabled,
              id: 'redo',
              label: 'Redo',
            },
          ]
        case MenuEntryId.File:
          return [
            {
              command: 'File.new',
              flags: MenuItemFlags.Disabled,
              id: 'newFile',
              label: 'New File',
            },
            {
              command: 'Window.new',
              flags: MenuItemFlags.Disabled,
              id: 'newWindow',
              label: 'New Window',
            },
            {
              command: '',
              flags: MenuItemFlags.SubMenu,
              id: MenuEntryId.OpenRecent,
              label: 'Open Recent',
            },
          ]
        case MenuEntryId.OpenRecent:
          return [
            {
              command: 'File.openRecent',
              flags: MenuItemFlags.None,
              label: 'file-1.txt',
            },
            {
              command: 'File.openRecent',
              flags: MenuItemFlags.None,
              label: 'file-2.txt',
            },
          ]
        case MenuEntryId.Selection:
          return []
        default:
          throw new Error(`no menu entries found for ${props.menuId}`)
      }
    },
  }
})

const ViewletTitleBarMenuBarFocusIndex = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusIndex.ts')

test('focusIndex - when open - when same index', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'File.new',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: 'Window.new',
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            command: '',
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
    titleBarEntries: [
      {
        flags: 0,
        id: MenuEntryId.File,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        id: MenuEntryId.Edit,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 0)).toMatchObject({
    focusedIndex: 0,
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'File.new',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: 'Window.new',
            flags: MenuItemFlags.Disabled,
            id: 'newWindow',
            label: 'New Window',
          },
          {
            command: '',
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
  })
})

test('focusIndex - when opening different index', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    titleBarEntries: [
      {
        flags: 0,
        id: MenuEntryId.File,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        id: MenuEntryId.Edit,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)).toMatchObject({
    focusedIndex: 1,
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'Edit.undo',
            flags: MenuItemFlags.Disabled,
            id: 'undo',
            label: 'Undo',
          },
          {
            command: 'Edit.redo',
            flags: MenuItemFlags.Disabled,
            id: 'redo',
            label: 'Redo',
          },
        ],
        level: 0,
      },
    ],
  })
})

test('focusIndex - when open - race condition', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    titleBarEntries: [
      {
        flags: 0,
        id: MenuEntryId.File,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        id: MenuEntryId.Edit,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)).toMatchObject({
    focusedIndex: 1,
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'Edit.undo',
            flags: MenuItemFlags.Disabled,
            id: 'undo',
            label: 'Undo',
          },
          {
            command: 'Edit.redo',
            flags: MenuItemFlags.Disabled,
            id: 'redo',
            label: 'Redo',
          },
        ],
        level: 0,
      },
    ],
  })
})

test('focusIndex - when closed - when same index', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        id: MenuEntryId.File,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        id: MenuEntryId.Edit,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 0)).toMatchObject({
    focusedIndex: 0,
  })
})

test('focusIndex - when closed - when different index', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: false,
    titleBarEntries: [
      {
        flags: 0,
        id: MenuEntryId.File,
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        id: MenuEntryId.Edit,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
    ],
  }
  expect(await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)).toMatchObject({
    focusedIndex: 1,
  })
})
