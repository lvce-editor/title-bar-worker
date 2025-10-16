import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as Focus from '../src/parts/Focus/Focus.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

test('setFocus - should call ParentRpc.invoke with correct parameters', async () => {
  let invokedMethod = ''
  let invokedArgs: readonly unknown[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedMethod = method
      invokedArgs = args
      return undefined
    },
  })
  ParentRpc.set(mockRpc)

  await Focus.setFocus(42)

  expect(invokedMethod).toBe('Focus.setFocus')
  expect(invokedArgs[0]).toBe(42)
})

test('setFocus - should handle different focus keys', async () => {
  let invokedArgs: readonly unknown[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedArgs = args
      return undefined
    },
  })
  ParentRpc.set(mockRpc)

  await Focus.setFocus(123)

  expect(invokedArgs[0]).toBe(123)
})

test('setFocus - should handle zero focus key', async () => {
  let invokedArgs: readonly unknown[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedArgs = args
      return undefined
    },
  })
  ParentRpc.set(mockRpc)

  await Focus.setFocus(0)

  expect(invokedArgs[0]).toBe(0)
})
