import { expect, test } from '@jest/globals'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'
import { getMenuEntriesSwitchEditor } from '../src/parts/MenuEntriesGo/MenuEntriesGo.ts'
import { menuEntrySeparator } from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const notImplementedMessage = {
  message: 'Not implemented',
}

const entry = (id: string, label: string, keyboardShortCut?: string): MenuEntry => ({
  args: [notImplementedMessage, ['OK']],
  command: 'Dialog.showMessage',
  flags: MenuItemFlags.None,
  id,
  ...(keyboardShortCut && { keyboardShortCut }),
  label,
})

test('getMenuEntries', () => {
  const result = getMenuEntriesSwitchEditor()

  expect(result).toEqual([
    entry('nextEditor', 'Next Editor', 'Ctrl+PageDown'),
    entry('previousEditor', 'Previous Editor', 'Ctrl+PageUp'),
    menuEntrySeparator,
    entry('nextUsedEditor', 'Next Used Editor'),
    entry('previousUsedEditor', 'Previous Used Editor'),
    menuEntrySeparator,
    entry('nextEditorInGroup', 'Next Editor in Group', 'Ctrl+K Ctrl+PageDown'),
    entry('previousEditorInGroup', 'Previous Editor in Group', 'Ctrl+K Ctrl+PageUp'),
    entry('nextUsedEditorInGroup', 'Next Used Editor in Group'),
    entry('previousUsedEditorInGroup', 'Previous Used Editor in Group'),
  ])
})
