import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexRestoreFocus from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexRestoreFocus.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('selectIndexRestoreFocus executes command and closes menu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = createDefaultState()
  const item = {
    command: 'Editor.cut',
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 1,
    label: 'Test Item',
    level: 0,
  }
  const result = await ViewletTitleBarMenuBarSelectIndexRestoreFocus.selectIndexRestoreFocus(state, item)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('selectIndexRestoreFocus preserves state changes made by the command', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: -1,
        items: [],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
    title: 'my-project',
    uid: 1,
    workspaceUri: '/tmp/my-project',
  }
  TitleBarMenuBarStates.set(state.uid, state, state)
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.close'() {
      const workspaceClosedState = {
        ...state,
        title: '',
        workspaceUri: '',
      }
      TitleBarMenuBarStates.set(state.uid, state, workspaceClosedState)
    },
  })
  const item = {
    command: 'Workspace.close',
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 1,
    label: 'Close Folder',
    level: 0,
  }

  const result = await ViewletTitleBarMenuBarSelectIndexRestoreFocus.selectIndexRestoreFocus(state, item)

  expect(result.isMenuOpen).toBe(false)
  expect(result.menus).toEqual([])
  expect(result.title).toBe('')
  expect(result.workspaceUri).toBe('')
  expect(mockRpc.invocations).toEqual([['Workspace.close']])
})
