import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleMenuClick from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleMenuClick.ts'

test('handleMenuClick with non-existent item returns same state', async () => {
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
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)
  expect(result).toBe(state)
})

test('handleMenuClick with Ignore flag calls selectIndexIgnore', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'Editor.cut',
            flags: MenuItemFlags.Ignore,
            label: 'Cut',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('handleMenuClick with None flag calls selectIndexNone', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'Editor.cut',
            flags: MenuItemFlags.None,
            label: 'Cut',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(result.focusedIndex).toBe(-1)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('handleMenuClick with RestoreFocus flag calls selectIndexRestoreFocus', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: 'Editor.cut',
            flags: MenuItemFlags.RestoreFocus,
            label: 'Cut',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('handleMenuClick with SubMenu flag calls selectIndexSubMenu', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.SubMenu,
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
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)
  expect(result.menus).toHaveLength(2)
  expect(result.menus[0].focusedIndex).toBe(0)
  expect(result.menus[1].level).toBe(1)
  expect(result.menus[1].x).toBe(250)
  expect(result.menus[1].y).toBe(50)
  expect(result.menus[1].focusedIndex).toBe(-1)
})

test('handleMenuClick with unknown flag returns same state', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: 999,
            label: 'Unknown',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 0)
  expect(result).toBe(state)
})

test('handleMenuClick with invalid index returns same state', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    menus: [
      {
        focusedIndex: -1,
        items: [
          {
            command: '',
            flags: MenuItemFlags.None,
            label: 'Item',
          },
        ],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const result = await ViewletTitleBarMenuBarHandleMenuClick.handleMenuClick(state, 0, 1)
  expect(result).toBe(state)
})
