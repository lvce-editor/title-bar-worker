import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleCommandCenterClick from '../src/parts/HandleCommandCenterClick/HandleCommandCenterClick.ts'

test('handleCommandCenterClick opens the command center quick pick with executable items', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.show'() {},
  })
  const state = createDefaultState()

  const result = await HandleCommandCenterClick.handleCommandCenterClick(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'QuickPick.show',
      'custom',
      [
        { command: 'QuickPick.showFile', label: 'Go to File' },
        { command: 'QuickPick.showCommands', label: 'Show and Run Commands' },
        { args: ['Search'], command: 'Layout.openSideBarViewlet', label: 'Search for Text' },
        { args: ['symbol'], command: 'QuickPick.show', label: 'Go to Symbol in Editor' },
        { args: ['Run And Debug'], command: 'Layout.openSideBarViewlet', label: 'Start Debugging' },
        { command: 'QuickPick.showCommands', label: 'Run Task' },
        { command: 'QuickPick.showEverything', label: 'More' },
      ],
      undefined,
      {
        executeItemCommand: true,
        mode: 'quickPick',
        placeholder: 'Search files by name (append : to go to line or @ to go to symbol)',
        waitUntil: 'visible',
      },
    ],
  ])
})
