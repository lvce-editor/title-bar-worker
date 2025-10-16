import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexIgnore from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexIgnore.ts'

test('selectIndexIgnore executes command and returns same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = createDefaultState()
  const item = {
    label: 'Test Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 1,
    command: 'Editor.cut',
    args: [],
  }
  const result = await ViewletTitleBarMenuBarSelectIndexIgnore.selectIndexIgnore(state, item)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})
