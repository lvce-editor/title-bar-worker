import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarFocusIndex from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarFocusIndex.ts'

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
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => [],
  })

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
  const result = await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)
  expect(result.focusedIndex).toBe(1)
  expect(result.menus).toHaveLength(1)
  expect(result.menus[0].level).toBe(0)
  expect(result.menus[0].items.length).toBeGreaterThan(0)
})

test('focusIndex - when open - race condition', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => [],
  })

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
  const result = await ViewletTitleBarMenuBarFocusIndex.focusIndex(state, 1)
  expect(result.focusedIndex).toBe(1)
  expect(result.menus).toHaveLength(1)
  expect(result.menus[0].level).toBe(0)
  expect(result.menus[0].items.length).toBeGreaterThan(0)
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
