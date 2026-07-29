import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleCommandCenterClick from '../src/parts/HandleCommandCenterClick/HandleCommandCenterClick.ts'

test('handleCommandCenterClick opens the command center quick pick and handles cancellation', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCustom'() {},
  })
  const state = createDefaultState()

  const result = await HandleCommandCenterClick.handleCommandCenterClick(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'QuickPick.showCustom',
      [
        { label: 'Go to File', value: 'file' },
        { label: 'Show and Run Commands', value: 'commands' },
        { label: 'Search for Text', value: 'search' },
        { label: 'Go to Symbol in Editor', value: 'symbol' },
        { label: 'Start Debugging', value: 'debug' },
        { label: 'Run Task', value: 'task' },
        { label: 'More', value: 'more' },
      ],
      {
        mode: 'quickPick',
        placeholder: 'Search files by name (append : to go to line or @ to go to symbol)',
      },
    ],
  ])
})

test.each([
  ['file', 'QuickPick.showFile', []],
  ['commands', 'QuickPick.showCommands', []],
  ['search', 'Search.focus', []],
  ['symbol', 'QuickPick.show', ['symbol']],
  ['debug', 'Run.focus', []],
  ['task', 'QuickPick.showCommands', []],
  ['more', 'QuickPick.showEverything', []],
])('handleCommandCenterClick executes the %s action', async (selectedValue, command, args) => {
  using mockRpc = RendererWorker.registerMockRpc({
    [command]() {},
    'QuickPick.showCustom'() {
      return selectedValue
    },
  })
  const state = createDefaultState()

  const result = await HandleCommandCenterClick.handleCommandCenterClick(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations[1]).toEqual([command, ...args])
})

test('handleCommandCenterClick ignores unknown values', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCustom'() {
      return 'unknown'
    },
  })
  const state = createDefaultState()

  const result = await HandleCommandCenterClick.handleCommandCenterClick(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toHaveLength(1)
})
