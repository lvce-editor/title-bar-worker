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
    args: [],
    command: 'Editor.cut',
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 1,
    label: 'Test Item',
    level: 0,
  }
  const result = await ViewletTitleBarMenuBarSelectIndexIgnore.selectIndexIgnore(state, item)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})
