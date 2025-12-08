import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleMenuMouseOver from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuMouseOver.ts'

test('handleMouseOverMenu - focus item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: -1,
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
  const state: TitleBarMenuBarState = {
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
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt', 'file:///home/user/file-2.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: -1,
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
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(2)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].items.length).toBeGreaterThan(0)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('handleMouseOverMenu - unfocus sub menu', async () => {
  const state: TitleBarMenuBarState = {
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
        x: 0,
        y: 0,
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
        x: 150,
        y: 25,
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
  const state: TitleBarMenuBarState = {
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
        x: 0,
        y: 0,
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
        x: 150,
        y: 25,
      },
    ],
  }
  // @ts-ignore
  expect(await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)).toBe(state)
})

test('handleMouseOverMenu - invalid level', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 5, 0)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - invalid index', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 10)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - empty menus array', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - empty items array', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - unfocus item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 2',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - unfocus item with multiple menus', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 2',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
      {
        focusedIndex: 0,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Sub Item 1',
          },
        ],
        level: 1,
        x: 150,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - submenu without id', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            label: 'Sub Menu',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - change focus to different item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 2',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 3',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)
  expect(result.menus[0].focusedIndex).toBe(2)
  expect(result.menus).toHaveLength(1)
})

test('handleMouseOverMenu - open submenu when already focused on different item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt', 'file:///home/user/file-2.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            id: 'item1',
            label: 'Item 1',
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
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(1)
  expect(result.menus[1].level).toBe(1)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('handleMouseOverMenu - hover over submenu item when submenu already open', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            id: 'item1',
            label: 'Item 1',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            id: 'item2',
            label: 'Item 2',
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
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'file-1.txt',
          },
        ],
        level: 1,
        x: 150,
        y: 50,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - hover over submenu item when submenu has focused item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 2,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            id: 'item1',
            label: 'Item 1',
          },
          {
            command: '',
            flags: MenuItemFlags.None,
            id: 'item2',
            label: 'Item 2',
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
        x: 150,
        y: 50,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 2)
  expect(result.menus[1].focusedIndex).toBe(-1)
  expect(result.menus[0].focusedIndex).toBe(2)
})

test('handleMouseOverMenu - hover over submenu item when not last menu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
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
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Other Item',
          },
        ],
        level: 1,
        x: 150,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result.menus).toHaveLength(3)
  expect(result.menus[0].focusedIndex).toBe(-1)
  expect(result.menus[1].focusedIndex).toBe(0)
  expect(result.menus[2].level).toBe(2)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('handleMouseOverMenu - hover over submenu item when level is not second to last', async () => {
  RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 0,
        items: [
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
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Sub Item',
          },
        ],
        level: 1,
        x: 150,
        y: 0,
      },
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Sub Sub Item',
          },
        ],
        level: 2,
        x: 300,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - focus disabled item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Disabled,
            label: 'Disabled Item',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result.menus[0].focusedIndex).toBe(0)
})

test('handleMouseOverMenu - focus separator item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Separator,
            label: '',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result.menus[0].focusedIndex).toBe(0)
})

test('handleMouseOverMenu - focus checked item', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.Checked,
            label: 'Checked Item',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result.menus[0].focusedIndex).toBe(0)
})

test('handleMouseOverMenu - multiple level submenu navigation', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
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
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(0)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].x).toBe(150)
  expect(result.menus[1].y).toBe(0)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('handleMouseOverMenu - submenu position calculation', async () => {
  RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
        ],
        level: 0,
        x: 100,
        y: 200,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)
  expect(result.menus[1].x).toBe(250)
  expect(result.menus[1].y).toBe(225)
})

test('handleMouseOverMenu - hover over index -1 when already -1', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - hover over index -1 when focused', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, -1)
  expect(result).toBe(state)
})

test('handleMouseOverMenu - replace existing submenu when hovering different submenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/file-1.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: 0,
        items: [
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Open Recent',
          },
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.OpenRecent,
            label: 'Another Submenu',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Old Sub Item',
          },
        ],
        level: 1,
        x: 150,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 1)
  expect(result.menus).toHaveLength(3)
  expect(result.menus[0].focusedIndex).toBe(0)
  expect(result.menus[1].focusedIndex).toBe(1)
  expect(result.menus[2].level).toBe(2)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('handleMouseOverMenu - preserve menu properties when updating focus', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        expanded: true,
        focusedIndex: -1,
        id: 123,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item 1',
          },
        ],
        level: 0,
        x: 50,
        y: 100,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuMouseOver.handleMenuMouseOver(state, 0, 0)
  expect(result.menus[0].expanded).toBe(true)
  expect(result.menus[0].id).toBe(123)
  expect(result.menus[0].x).toBe(50)
  expect(result.menus[0].y).toBe(100)
  expect(result.menus[0].focusedIndex).toBe(0)
})
