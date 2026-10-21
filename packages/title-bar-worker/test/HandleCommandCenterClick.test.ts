import { expect, jest, test } from '@jest/globals'

const translations = {
  'Go to File': 'Translated Go to File',
  'Go to Symbol in Editor': 'Translated Go to Symbol in Editor',
  More: 'Translated More',
  'Run Task': 'Translated Run Task',
  'Search for Text': 'Translated Search for Text',
  'Show and Run Commands': 'Translated Show and Run Commands',
  'Start Debugging': 'Translated Start Debugging',
}

// The real i18n implementation returns its English key when no locale is configured.
// eslint-disable-next-line jest/no-restricted-jest-methods
await jest.unstable_mockModule('../src/parts/I18NString/I18NString.ts', (): { i18nString: (key: string) => string } => ({
  i18nString: (key: string): string => translations[key as keyof typeof translations] ?? key,
}))

const { RendererWorker } = await import('@lvce-editor/rpc-registry')
const { createDefaultState } = await import('../src/parts/CreateDefaultState/CreateDefaultState.ts')
const HandleCommandCenterClick = await import('../src/parts/HandleCommandCenterClick/HandleCommandCenterClick.ts')

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
        { command: 'QuickPick.showFile', label: 'Translated Go to File' },
        { command: 'QuickPick.showCommands', label: 'Translated Show and Run Commands' },
        { args: ['Search'], command: 'Layout.openSideBarViewlet', label: 'Translated Search for Text' },
        { args: ['symbol'], command: 'QuickPick.show', label: 'Translated Go to Symbol in Editor' },
        { args: ['Run And Debug'], command: 'Layout.openSideBarViewlet', label: 'Translated Start Debugging' },
        { command: 'QuickPick.showCommands', label: 'Translated Run Task' },
        { command: 'QuickPick.showEverything', label: 'Translated More' },
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
