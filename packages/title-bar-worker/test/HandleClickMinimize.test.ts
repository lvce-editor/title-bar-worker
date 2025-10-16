import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickMinimize from '../src/parts/HandleClickMinimize/HandleClickMinimize.ts'

test('handleClickMinimize', async () => {
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

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleClickMinimize.handleClickMinimize(state)
  expect(result).toBe(state)
})
