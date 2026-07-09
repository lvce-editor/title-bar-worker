import { expect, test } from '@jest/globals'
import { getMenuEntriesSwitchEditor } from '../src/parts/MenuEntriesGo/MenuEntriesGo.ts'
import { menuEntrySeparator } from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const notImplementedMessage = {
  message: 'Not implemented',
}

test('getMenuEntries', () => {
  const result = getMenuEntriesSwitchEditor()

  expect(result).toEqual(
    expect.arrayContaining([
      {
        args: [notImplementedMessage, ['OK']],
        command: 'Dialog.showMessage',
        flags: MenuItemFlags.None,
        id: 'nextEditor',
        label: 'Next Editor',
      },
      {
        args: [notImplementedMessage, ['OK']],
        command: 'Dialog.showMessage',
        flags: MenuItemFlags.None,
        id: 'previousEditorInGroup',
        label: 'Previous Editor in Group',
      },
      {
        args: [notImplementedMessage, ['OK']],
        command: 'Dialog.showMessage',
        flags: MenuItemFlags.None,
        id: 'previousUsedEditorInGroup',
        label: 'Previous Used Editor in Group',
      },
    ]),
  )
  expect(result).toContainEqual(menuEntrySeparator)
})
