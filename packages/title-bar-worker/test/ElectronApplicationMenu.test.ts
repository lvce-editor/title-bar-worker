import { expect, test } from '@jest/globals'
import { MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ElectronApplicationMenu from '../src/parts/ElectronApplicationMenu/ElectronApplicationMenu.ts'

test('hydrate - basic state with empty menu', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
  })

  using _mainProcess = MainProcess.registerMockRpc({
    'ElectronApplicationMenu.setItems'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    platform: 0,
  }

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result).toHaveProperty('commandMap')
  expect(result).toHaveProperty('platform', 0)
})

test('hydrate - preserves state properties', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
  })

  using _mainProcess = MainProcess.registerMockRpc({
    'ElectronApplicationMenu.setItems'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    platform: 1,
  }

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.platform).toBe(1)
  expect(result).toHaveProperty('menus')
})

test('hydrate - sends menu items directly to the main process', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
  })

  using _mainProcess = MainProcess.registerMockRpc({
    'ElectronApplicationMenu.setItems'() {},
  })

  const state: TitleBarMenuBarState = createDefaultState()

  await ElectronApplicationMenu.hydrate(state)

  expect(_mainProcess.invocations).toEqual([['ElectronApplicationMenu.setItems', expect.arrayContaining([expect.objectContaining({ label: 'File' })])]])
  expect(mockRpc.invocations.some((invocation) => invocation[0] === 'GetWindowId.getWindowId')).toBe(false)
  expect(mockRpc.invocations.some((invocation) => invocation[0] === 'WebView.compatSharedProcessInvoke')).toBe(false)
})

test('hydrate - returns command map in result', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
  })

  using _mainProcess = MainProcess.registerMockRpc({
    'ElectronApplicationMenu.setItems'() {},
  })

  const state: TitleBarMenuBarState = createDefaultState()

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.commandMap).toBeDefined()
  expect(typeof result.commandMap).toBe('object')
})

test('hydrate - with different platforms', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
  })

  using _mainProcess = MainProcess.registerMockRpc({
    'ElectronApplicationMenu.setItems'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    platform: 2,
  }

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.platform).toBe(2)
})

test('hydrate - merges command map into state', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
  })

  using _mainProcess = MainProcess.registerMockRpc({
    'ElectronApplicationMenu.setItems'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: { existingCommand: 'test' },
  }

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.commandMap).toBeDefined()
})
