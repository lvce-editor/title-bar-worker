import { expect, test } from '@jest/globals'
import { MenuIdSwitchEditor, MenuIdSwitchGroup } from '../src/parts/GetMenuIds/GetMenuIds.ts'
import { getMenuEntries } from '../src/parts/MenuEntriesGo/MenuEntriesGo.ts'
import { menuEntrySeparator } from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const notImplementedMessage = {
  message: 'Not implemented',
}

test('getMenuEntries', () => {
  const result = getMenuEntries()

  expect(result).toEqual(
    expect.arrayContaining([
      {
        command: '',
        flags: MenuItemFlags.SubMenu,
        id: MenuIdSwitchEditor,
        label: 'Switch Editor',
      },
      {
        command: '',
        flags: MenuItemFlags.SubMenu,
        id: MenuIdSwitchGroup,
        label: 'Switch Group',
      },
      {
        command: 'QuickPick.showFile',
        flags: MenuItemFlags.None,
        id: 'goToFile',
        label: 'Go to File...',
      },
      {
        args: ['workspace-symbol'],
        command: 'QuickPick.show',
        flags: MenuItemFlags.None,
        id: 'goToSymbolInWorkspace',
        label: 'Go to Symbol in Workspace...',
      },
      {
        args: [notImplementedMessage, ['OK']],
        command: 'Dialog.showMessage',
        flags: MenuItemFlags.None,
        id: 'nextProblem',
        label: 'Next Problem',
      },
    ]),
  )
  expect(result).toContainEqual(menuEntrySeparator)
})
