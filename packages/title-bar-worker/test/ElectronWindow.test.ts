import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as ElectronWindow from '../src/parts/ElectronWindow/ElectronWindow.ts'

test('maximize', async () => {
  const commandMap = {
    'ElectronWindow.maximize': () => undefined
  }
  const mockRpc = MockRpc.create({
    commandMap,
    invoke: (method: string) => {
      const fn = commandMap[method]
      if (fn) {
        return fn()
      }
      throw new Error(`unexpected method ${method}`)
    }
  })
  ParentRpc.set(mockRpc)

  await expect(ElectronWindow.maximize()).resolves.toBeUndefined()
})

test('unmaximize', async () => {
  const commandMap = {
    'ElectronWindow.unmaximize': () => undefined
  }
  const mockRpc = MockRpc.create({
    commandMap,
    invoke: (method: string) => {
      const fn = commandMap[method]
      if (fn) {
        return fn()
      }
      throw new Error(`unexpected method ${method}`)
    }
  })
  ParentRpc.set(mockRpc)

  await expect(ElectronWindow.unmaximize()).resolves.toBeUndefined()
})

test('minimize', async () => {
  const commandMap = {
    'ElectronWindow.minimize': () => undefined
  }
  const mockRpc = MockRpc.create({
    commandMap,
    invoke: (method: string) => {
      const fn = commandMap[method]
      if (fn) {
        return fn()
      }
      throw new Error(`unexpected method ${method}`)
    }
  })
  ParentRpc.set(mockRpc)

  await expect(ElectronWindow.minimize()).resolves.toBeUndefined()
})

test('close', async () => {
  const commandMap = {
    'ElectronWindow.close': () => undefined
  }
  const mockRpc = MockRpc.create({
    commandMap,
    invoke: (method: string) => {
      const fn = commandMap[method]
      if (fn) {
        return fn()
      }
      throw new Error(`unexpected method ${method}`)
    }
  })
  ParentRpc.set(mockRpc)

  await expect(ElectronWindow.close()).resolves.toBeUndefined()
})
