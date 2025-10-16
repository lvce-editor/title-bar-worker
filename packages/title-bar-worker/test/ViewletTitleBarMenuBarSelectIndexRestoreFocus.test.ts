import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexRestoreFocus from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexRestoreFocus.ts'

test('selectIndexRestoreFocus executes command and closes menu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state = createDefaultState()
  const item = {
    label: 'Test Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 1,
    command: 'Editor.cut',
  }
  const result = await ViewletTitleBarMenuBarSelectIndexRestoreFocus.selectIndexRestoreFocus(state, item)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})
