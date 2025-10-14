import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ElectronWindow from '../src/parts/ElectronWindow/ElectronWindow.ts'

test('maximize', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.maximize') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await expect(ElectronWindow.maximize()).resolves.toBeUndefined()
})

test('unmaximize', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.unmaximize') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await expect(ElectronWindow.unmaximize()).resolves.toBeUndefined()
})

test('minimize', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.minimize') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await expect(ElectronWindow.minimize()).resolves.toBeUndefined()
})

test('close', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ElectronWindow.close') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  await expect(ElectronWindow.close()).resolves.toBeUndefined()
})
