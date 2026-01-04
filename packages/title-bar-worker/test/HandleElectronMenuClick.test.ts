import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleElectronMenuClick from '../src/parts/HandleElectronMenuClick/HandleElectronMenuClick.ts'

test('handleElectronMenuClick - should invoke command with no args', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cut'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: {
      Cut: {
        command: 'Editor.cut',
      },
    },
  }

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'Cut')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Editor.cut']])
})

test('handleElectronMenuClick - should invoke command with args', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.open'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: {
      'Open File': {
        command: 'Editor.open',
        args: ['/path/to/file'],
      },
    },
  }

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'Open File')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Editor.open', '/path/to/file']])
})

test('handleElectronMenuClick - should invoke command with multiple args', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.replace'() {},
  })

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: {
      Replace: {
        command: 'Editor.replace',
        args: ['old', 'new'],
      },
    },
  }

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'Replace')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Editor.replace', 'old', 'new']])
})

test('handleElectronMenuClick - should throw error when label not found', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: {
      Cut: {
        command: 'Editor.cut',
      },
    },
  }

  await expect(HandleElectronMenuClick.handleElectronMenuClick(state, 'Paste')).rejects.toThrow('no command found for Paste')
})

test('handleElectronMenuClick - should handle empty commandMap', async () => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    commandMap: {},
  }

  await expect(HandleElectronMenuClick.handleElectronMenuClick(state, 'Cut')).rejects.toThrow('no command found for Cut')
})
