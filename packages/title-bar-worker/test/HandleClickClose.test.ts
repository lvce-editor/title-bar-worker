import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickClose from '../src/parts/HandleClickClose/HandleClickClose.ts'

test('handleClickClose', async () => {
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

  const state = { ...createDefaultState(), height: 600 }
  const result = await HandleClickClose.handleClickClose(state)
  expect(result).toBe(state)
})
