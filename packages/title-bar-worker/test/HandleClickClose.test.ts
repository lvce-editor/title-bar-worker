import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickClose from '../src/parts/HandleClickClose/HandleClickClose.ts'

test('handleClickClose', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ElectronWindow.close'() {},
  })

  const state: TitleBarMenuBarState = { ...createDefaultState(), height: 600 }
  const result = await HandleClickClose.handleClickClose(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ElectronWindow.close']])
})
