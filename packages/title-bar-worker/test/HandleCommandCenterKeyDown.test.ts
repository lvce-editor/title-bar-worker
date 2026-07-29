import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleCommandCenterKeyDown from '../src/parts/HandleCommandCenterKeyDown/HandleCommandCenterKeyDown.ts'

test.each(['Enter', ' ', 'Space'])('handleCommandCenterKeyDown opens the quick pick for %s', async (key) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.show'() {},
  })
  const state = createDefaultState()

  const result = await HandleCommandCenterKeyDown.handleCommandCenterKeyDown(state, key)

  expect(result).toBe(state)
  expect(mockRpc.invocations[0][0]).toBe('QuickPick.show')
})

test('handleCommandCenterKeyDown ignores other keys', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state = createDefaultState()

  const result = await HandleCommandCenterKeyDown.handleCommandCenterKeyDown(state, 'Escape')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
