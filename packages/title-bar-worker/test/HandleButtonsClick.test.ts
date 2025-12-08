import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleButtonsClick from '../src/parts/HandleButtonsClick/HandleButtonsClick.ts'
import * as NativeHostState from '../src/parts/NativeHostState/NativeHostState.ts'

test('handleClick - Minimize button', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.minimize'() {},
  })

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'title-bar-button Minimize')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.minimize']])
})

test('handleClick - Maximize button', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.maximize'() {},
  })

  NativeHostState.setMaximized(false)

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'title-bar-button Maximize')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.maximize']])
})

test('handleClick - Restore button', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.unmaximize'() {},
  })

  NativeHostState.setMaximized(true)

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'title-bar-button Restore')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.unmaximize']])
})

test('handleClick - Close button', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.close'() {},
  })

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'title-bar-button Close')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.close']])
})

test('handleClick - unknown button returns state unchanged', async () => {
  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'title-bar-button Unknown')
  expect(result).toBe(state)
})

test('handleClick - className with Minimize substring', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.minimize'() {},
  })

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'some-class Minimize-button')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.minimize']])
})

test('handleClick - className with Maximize substring', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.maximize'() {},
  })

  NativeHostState.setMaximized(false)

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'button-Maximize-class')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.maximize']])
})

test('handleClick - className with Restore substring', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.unmaximize'() {},
  })

  NativeHostState.setMaximized(true)

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Restore-button-class')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.unmaximize']])
})

test('handleClick - className with Close substring', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.close'() {},
  })

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleButtonsClick.handleClick(state, 'Close-button-class')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.close']])
})
