import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewletTitleBarMenuBarSelectIndexRestoreEditorFocus from '../src/parts/TitleBarMenuBar/ViewletTitleBarMenuBarSelectIndexRestoreEditorFocus.ts'
import { menuWorkerCommands, setupMenuWorker } from '../test-support/MockMenuWorker.ts'

setupMenuWorker()

test('selectIndexRestoreEditorFocus executes command, restores editor focus, and closes menu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    ...menuWorkerCommands,
    'Editor.selectAll'() {},
    'Main.focus'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        items: [],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const item = {
    command: 'Editor.selectAll',
    flags: 0,
    id: 'selectAll',
    label: 'Select All',
  }

  const result = await ViewletTitleBarMenuBarSelectIndexRestoreEditorFocus.selectIndexRestoreEditorFocus(state, item)

  expect(result.focusedIndex).toBe(-1)
  expect(result.isMenuOpen).toBe(false)
  expect(result.menus).toEqual([])
  expect(mockRpc.invocations).toEqual([['Editor.selectAll'], ['Main.focus']])
})

test('selectIndexRestoreEditorFocus closes menu when focus restoration is unavailable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    ...menuWorkerCommands,
    'Editor.selectAll'() {},
    'Main.focus'() {
      throw new Error('module Main not found')
    },
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    isMenuOpen: true,
    menus: [
      {
        focusedIndex: 0,
        items: [],
        level: 0,
        x: 0,
        y: 0,
      },
    ],
  }
  const item = {
    command: 'Editor.selectAll',
    flags: 0,
    id: 'selectAll',
    label: 'Select All',
  }

  const result = await ViewletTitleBarMenuBarSelectIndexRestoreEditorFocus.selectIndexRestoreEditorFocus(state, item)

  expect(result.focusedIndex).toBe(-1)
  expect(result.isMenuOpen).toBe(false)
  expect(result.menus).toEqual([])
  expect(mockRpc.invocations).toEqual([['Editor.selectAll'], ['Main.focus']])
})
