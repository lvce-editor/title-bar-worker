import { beforeEach, afterEach, expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarSelectIndexSubMenu from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexSubMenu.ts'

const mocks: { measurement?: Disposable } = {}
beforeEach(() => {
  mocks.measurement = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextWidths': (labels: readonly string[]) => labels.map((label) => label.length * 7),
  })
})
afterEach(() => mocks.measurement?.[Symbol.dispose]())

test('selectIndexSubMenu creates submenu and updates parent menu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: 0,
            id: 2,
            label: 'Edit',
          },
        ],
        level: 0,
        x: 100,
        y: 50,
      },
    ],
  }
  const menu = state.menus[0]
  const result = await ViewletTitleBarMenuBarSelectIndexSubMenu.selectIndexSubMenu(state, menu, 0)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(0)
  expect(result.menus[0].expanded).toBe(true)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].x).toBe(350) // parent x + rendered parent width
  expect(result.menus[1].y).toBe(50) // y + index * 25
  expect(result.menus[1].focusedIndex).toBe(-1)
})

test('selectIndexSubMenu replaces an existing submenu branch', async () => {
  const parentMenu = {
    expanded: true,
    focusedIndex: 0,
    items: [
      {
        command: '',
        flags: 0,
        id: 2,
        label: 'Edit',
      },
    ],
    level: 0,
    x: 100,
    y: 50,
  }
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      parentMenu,
      {
        focusedIndex: -1,
        items: [],
        level: 1,
        x: 250,
        y: 50,
      },
    ],
  }

  const result = await ViewletTitleBarMenuBarSelectIndexSubMenu.selectIndexSubMenu(state, parentMenu, 0)

  expect(result.menus).toHaveLength(2)
  expect(result.menus[0]).toMatchObject({ expanded: true, focusedIndex: 0, level: 0 })
  expect(result.menus[1]).toMatchObject({ focusedIndex: -1, level: 1, x: 350, y: 50 })
})

test('selectIndexSubMenu passes the recent-entry limit from state', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/first.txt', 'file:///home/user/second.txt'],
  })
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    maxMenuRecentEntries: 1,
    menus: [
      {
        focusedIndex: -1,
        items: [{ command: '', flags: MenuItemFlags.SubMenu, id: MenuEntryId.OpenRecent, label: 'Open Recent' }],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarSelectIndexSubMenu.selectIndexSubMenu(state, state.menus[0], 0)
  expect(result.menus[1].items.filter((entry) => entry.command === 'Workspace.setUri')).toHaveLength(1)
})

for (const uri of [
  'file:///home/user/' + 'long-folder/'.repeat(10),
  'vscode-remote://ssh-remote+host/' + 'remote-folder/'.repeat(10),
  'vscode-remote://dev-container+container/' + 'container-folder/'.repeat(10),
]) {
  test(`sizes recent submenu for ${uri}`, async () => {
    using _recent = RendererWorker.registerMockRpc({ 'RecentlyOpened.getRecentlyOpened': () => [uri] })
    const parent = {
      focusedIndex: -1,
      items: [{ command: '', flags: MenuItemFlags.SubMenu, id: MenuEntryId.OpenRecent, label: 'Open Recent' }],
      level: 0,
      width: 250,
      x: 30,
      y: 30,
    }
    const state = { ...createDefaultState(), menus: [parent], viewportWidth: 1920 }
    const result = await ViewletTitleBarMenuBarSelectIndexSubMenu.selectIndexSubMenu(state, parent, 0)
    const submenu = result.menus[1]
    expect(submenu.width).toBeGreaterThan(800)
    expect(submenu.x).toBe(280)
    expect(submenu.x + submenu.width!).toBeLessThanOrEqual(1920)
  })
}

test('caps oversized recent paths to the viewport and flips near its edge', async () => {
  using _recent = RendererWorker.registerMockRpc({ 'RecentlyOpened.getRecentlyOpened': () => ['file:///home/' + 'long-folder/'.repeat(100)] })
  const parent = {
    focusedIndex: -1,
    items: [{ command: '', flags: MenuItemFlags.SubMenu, id: MenuEntryId.OpenRecent, label: 'Open Recent' }],
    level: 0,
    width: 250,
    x: 300,
    y: 30,
  }
  const state = { ...createDefaultState(), menus: [parent], viewportWidth: 600, x: 100 }
  const result = await ViewletTitleBarMenuBarSelectIndexSubMenu.selectIndexSubMenu(state, parent, 0)
  expect(result.menus[1]).toMatchObject({ width: 600, x: 0 })
})
