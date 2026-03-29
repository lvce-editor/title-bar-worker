import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleButtonsClick from '../src/parts/HandleButtonsClick/HandleButtonsClick.ts'
import * as NativeHostState from '../src/parts/NativeHostState/NativeHostState.ts'

test('handleClick - Minimize button', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.minimize'() {},
  })

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Minimize')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.minimize']])
})

test('handleClick - Maximize button', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.maximize'() {},
  })

  NativeHostState.setMaximized(false)

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'ToggleMaximize')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.maximize']])
})

test('handleClick - Restore button', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.unmaximize'() {},
  })

  NativeHostState.setMaximized(true)

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'ToggleMaximize')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.unmaximize']])
})

test('handleClick - Close button', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.close'() {},
  })

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Close')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.close']])
})

test('handleClick - unknown button returns state unchanged', async () => {
  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Unknown')
  expect(result).toBe(state)
})

test('handleClick - className-like value does not trigger minimize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.minimize'() {},
  })

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'some-class Minimize-button')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleClick - className-like value does not trigger toggle maximize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.maximize'() {},
  })

  NativeHostState.setMaximized(false)

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'button-Maximize-class')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleClick - restore label does not trigger toggle maximize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.unmaximize'() {},
  })

  NativeHostState.setMaximized(true)

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Restore')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleClick - className-like value does not trigger close', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.close'() {},
  })

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Close-button-class')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
