import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyArrowRight from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyArrowRight.ts'

test('handleKeyArrowRight - open sub menu', async () => {
  using _measure = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextWidths': (labels: readonly string[]) => labels.map((label) => label.length * 7),
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/user/' + 'long-folder/'.repeat(10), 'file:///home/user/file-2.txt'],
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    isMenuOpen: true,
    maxMenuRecentEntries: 1,
    menus: [
      {
        focusedIndex: 1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'New File',
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
        isExpanded: false,
        isFocused: false,
        key: 0,
        label: 'File',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 1,
        label: 'Edit',
        level: 0,
      },
      {
        flags: 0,
        isExpanded: false,
        isFocused: false,
        key: 2,
        label: 'Selection',
        level: 0,
      },
    ],
    viewportWidth: 1920,
  }
  const result = await ViewletTitleBarMenuBarHandleKeyArrowRight.handleKeyArrowRight(state)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(1)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].focusedIndex).toBe(0)
  expect(result.menus[1].width).toBeGreaterThan(800)
  expect(result.menus[1].x).toBe(250)
  expect(result.menus[1].items.length).toBeGreaterThan(0)
  expect(result.menus[1].items.filter((entry) => entry.command === 'Workspace.setUri')).toHaveLength(1)
  expect(mockRpc.invocations.map(([command]) => command)).toEqual(['RecentlyOpened.getRecentlyOpened', 'Layout.getKeyBindings'])
})
