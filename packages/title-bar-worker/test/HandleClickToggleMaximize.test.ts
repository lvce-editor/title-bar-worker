import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickToggleMaximize from '../src/parts/HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

test('handleClickToggleMaximize - calls maximize when not maximized', async () => {
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

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
})

test('handleClickToggleMaximize - calls unmaximize when maximized', async () => {
  const commandMap = {
    'ElectronWindow.unmaximize': () => undefined,
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

  const state = { ...createDefaultState(), height: 600, isMaximized: true }
  const result = await HandleClickToggleMaximize.handleClickToggleMaximize(state)
  expect(result).toBe(state)
})
