import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ElectronApplicationMenu from '../src/parts/ElectronApplicationMenu/ElectronApplicationMenu.ts'

test('hydrate - basic state with empty menu', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'GetWindowId.getWindowId'() {
      return 1
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'() {
      return undefined
    },
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
    'GetWindowId.getWindowId'() {
      return 1
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'() {
      return undefined
    },
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    platform: 1,
  }

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.platform).toBe(1)
  expect(result).toHaveProperty('menus')
})

test('hydrate - calls setItems with correct window id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'GetWindowId.getWindowId'() {
      return 5
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'(methodName: string, rpcMethod: string, windowId: number) {
      return undefined
    },
  })

  const state: TitleBarMenuBarState = createDefaultState()

  await ElectronApplicationMenu.hydrate(state)

  // Check that WebView.compatSharedProcessInvoke was called with correct arguments
  const invocations = mockRpc.invocations.filter((inv) => inv[0] === 'WebView.compatSharedProcessInvoke')
  expect(invocations.length).toBe(1)
  expect(invocations[0][1]).toBe('ElectronApplicationMenu.setItems')
  expect(invocations[0][2]).toBe(5)
})

test('hydrate - returns command map in result', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'GetWindowId.getWindowId'() {
      return 1
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'() {
      return undefined
    },
  })

  const state: TitleBarMenuBarState = createDefaultState()

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.commandMap).toBeDefined()
  expect(typeof result.commandMap).toBe('object')
})

test('hydrate - with different window ids', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'GetWindowId.getWindowId'() {
      return 42
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'(methodName: string, rpcMethod: string, windowId: number) {
      return undefined
    },
  })

  const state: TitleBarMenuBarState = createDefaultState()

  await ElectronApplicationMenu.hydrate(state)

  // Check that WebView.compatSharedProcessInvoke was called with correct window id
  const invocations = mockRpc.invocations.filter((inv) => inv[0] === 'WebView.compatSharedProcessInvoke')
  expect(invocations.length).toBe(1)
  expect(invocations[0][1]).toBe('ElectronApplicationMenu.setItems')
  expect(invocations[0][2]).toBe(42)
})

test('hydrate - with different platforms', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'GetMenuEntries2.getMenuEntries2'() {
      return []
    },
    'GetWindowId.getWindowId'() {
      return 1
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'() {
      return undefined
    },
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
    'GetWindowId.getWindowId'() {
      return 1
    },
    'RecentlyOpened.getRecentlyOpened'() {
      return []
    },
    'WebView.compatSharedProcessInvoke'() {
      return undefined
    },
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: { existingCommand: 'test' },
  }

  const result = await ElectronApplicationMenu.hydrate(state)

  expect(result.commandMap).toBeDefined()
})
