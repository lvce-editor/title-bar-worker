import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries: async () => [{ command: 'Editor.undo', flags: 0, id: 'undo', label: 'Undo' }],
}))

const ViewletTitleBarMenuBarSelectIndexIgnore = await import('../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexIgnore.ts')

test('selectIndexIgnore executes command and returns same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
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
