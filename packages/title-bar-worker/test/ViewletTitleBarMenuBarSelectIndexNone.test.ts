import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexNone from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexNone.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('selectIndexNone executes command and closes menu', async () => {
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
  const result = await ViewletTitleBarMenuBarSelectIndexNone.selectIndexNone(state, item)
  expect(result.menus).toEqual([])
  expect(result.isMenuOpen).toBe(false)
  expect(result.focusedIndex).toBe(-1)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('selectIndexNone preserves a workspace title changed by the command', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    isMenuOpen: true,
    title: 'titlebar-beta',
    workspaceUri: '/tmp/titlebar-beta',
  }
  TitleBarMenuBarStates.set(state.uid, state, state)
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      const newWorkspaceState = {
        ...state,
        title: 'titlebar-alpha',
        workspaceUri: '/tmp/titlebar-alpha',
      }
      TitleBarMenuBarStates.set(state.uid, state, newWorkspaceState)
    },
  })
  const item = {
    args: ['/tmp/titlebar-alpha'],
    command: 'Workspace.setPath',
    flags: 0,
    label: 'titlebar-alpha',
  }

  const result = await ViewletTitleBarMenuBarSelectIndexNone.selectIndexNone(state, item)

  expect(result.isMenuOpen).toBe(false)
  expect(result.menus).toEqual([])
  expect(result.title).toBe('titlebar-alpha')
  expect(result.workspaceUri).toBe('/tmp/titlebar-alpha')
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', '/tmp/titlebar-alpha']])
})
