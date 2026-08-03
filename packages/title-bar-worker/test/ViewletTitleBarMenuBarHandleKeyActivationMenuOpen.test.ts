import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarMenuBarHandleKeyEnterMenuOpen from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeyEnterMenuOpen.ts'
import * as ViewletTitleBarMenuBarHandleKeySpaceMenuOpen from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarHandleKeySpaceMenuOpen.ts'

const handlers = [
  ['Enter', ViewletTitleBarMenuBarHandleKeyEnterMenuOpen.handleKeyEnterMenuOpen],
  ['Space', ViewletTitleBarMenuBarHandleKeySpaceMenuOpen.handleKeySpaceMenuOpen],
] as const

const createOpenState = (): TitleBarMenuBarState => ({
  ...createDefaultState(),
  isMenuOpen: true,
  menus: [
    {
      focusedIndex: 0,
      items: [
        {
          command: 'QuickPick.showFile',
          flags: MenuItemFlags.None,
          id: 'goToFile',
          label: 'Go to File...',
        },
      ],
      level: 0,
      x: 0,
      y: 0,
    },
  ],
})

test.each(handlers)('%s activates the focused menu item', async (key, handleKey) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showFile'() {},
  })
  const state = createOpenState()

  const result = await handleKey(state)

  expect(result).toMatchObject({ focusedIndex: -1, isMenuOpen: false, menus: [] })
  expect(mockRpc.invocations).toEqual([['QuickPick.showFile']])
})

test.each(handlers)('%s returns the same state when no menu is open', async (key, handleKey) => {
  const state = {
    ...createDefaultState(),
    isMenuOpen: true,
  }

  const result = await handleKey(state)

  expect(result).toBe(state)
})

test.each(handlers)('%s activates the focused item in the deepest menu', async (key, handleKey) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showFile'() {},
  })
  const state: TitleBarMenuBarState = {
    ...createOpenState(),
    menus: [
      {
        focusedIndex: 0,
        items: [{ command: '', flags: MenuItemFlags.SubMenu, id: 1, label: 'Parent' }],
        level: 0,
        x: 0,
        y: 0,
      },
      {
        focusedIndex: 0,
        items: [{ command: 'QuickPick.showFile', flags: MenuItemFlags.None, id: 'goToFile', label: 'Go to File...' }],
        level: 1,
        x: 150,
        y: 0,
      },
    ],
  }

  const result = await handleKey(state)

  expect(result).toMatchObject({ focusedIndex: -1, isMenuOpen: false, menus: [] })
  expect(mockRpc.invocations).toEqual([['QuickPick.showFile']])
})
