import { expect, test } from '@jest/globals'
import '../test-support/MockMenuWorker.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexIgnore from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexIgnore.ts'
import { menuWorkerCommands } from '../test-support/MockMenuWorker.ts'

test('selectIndexIgnore executes command and returns same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    ...menuWorkerCommands,
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
