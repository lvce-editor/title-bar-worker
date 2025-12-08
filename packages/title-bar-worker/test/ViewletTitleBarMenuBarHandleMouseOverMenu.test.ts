import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleMenuMouseOver from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts'

test('handleMouseOverMenu - focus item', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)).toMatchObject({
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
      },
    ],
  })
})

test('handleMouseOverMenu - focus item - already focused', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)).toBe(state)
})

test('handleMouseOverMenu - open sub menu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => [
      'file:///home/user/file-1.txt',
      'file:///home/user/file-2.txt',
    ],
  })

  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(2)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].items.length).toBeGreaterThan(0)
})

test('handleMouseOverMenu - unfocus sub menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
      },
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)).toMatchObject({
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
      },
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  })
})

test('handleMouseOverMenu - unfocus menu and sub menu', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            id: 'newFile',
            label: 'New File',
          },
          {
            command: '',
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
      },
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-2.txt',
          },
        ],
        level: 1,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)).toBe(state)
})
