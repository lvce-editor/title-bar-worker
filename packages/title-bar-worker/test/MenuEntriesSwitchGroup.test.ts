import { expect, test } from '@jest/globals'
import { getMenuEntriesSwitchGroup } from '../src/parts/MenuEntriesGo/MenuEntriesGo.ts'
import { menuEntrySeparator } from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const notImplementedMessage = {
  message: 'Not implemented',
}

test('getMenuEntries', () => {
  const result = getMenuEntriesSwitchGroup()

  expect(result).toEqual(
    expect.arrayContaining([
      {
        args: [notImplementedMessage, ['OK']],
        command: 'Dialog.showMessage',
        flags: MenuItemFlags.None,
        id: 'nextGroup',
        label: 'Next Group',
      },
      {
        args: [notImplementedMessage, ['OK']],
        command: 'Dialog.showMessage',
        flags: MenuItemFlags.None,
        id: 'lastGroup',
        label: 'Last Group',
      },
    ]),
  )
  expect(result).toContainEqual(menuEntrySeparator)
})
