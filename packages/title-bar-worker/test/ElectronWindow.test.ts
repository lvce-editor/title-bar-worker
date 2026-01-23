import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ElectronWindow from '../src/parts/ElectronWindow/ElectronWindow.ts'

test('maximize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.maximize'() {},
  })
  await expect(ElectronWindow.maximize()).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ElectronWindow.maximize']])
})

test('unmaximize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.unmaximize'() {},
  })
  await expect(ElectronWindow.unmaximize()).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ElectronWindow.unmaximize']])
})

test('minimize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.minimize'() {},
  })
  await expect(ElectronWindow.minimize()).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ElectronWindow.minimize']])
})

test('close', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.close'() {},
  })
  await expect(ElectronWindow.close()).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ElectronWindow.close']])
})
