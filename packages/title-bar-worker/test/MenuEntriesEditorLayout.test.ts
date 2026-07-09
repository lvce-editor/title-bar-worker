import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesEditorLayout/MenuEntriesEditorLayout.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries', () => {
  expect(getMenuEntries()).toEqual([
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'splitUp',
      label: 'Split Up',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'splitDown',
      label: 'Split Down',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'splitLeft',
      label: 'Split Left',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'splitRight',
      label: 'Split Right',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'moveEditorIntoNewWindow',
      label: 'Move Editor into New Window',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'copyEditorIntoNewWindow',
      label: 'Copy Editor into New Window',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'single',
      label: 'Single',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'twoColumns',
      label: 'Two Columns',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'threeColumns',
      label: 'Three Columns',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'twoRows',
      label: 'Two Rows',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'threeRows',
      label: 'Three Rows',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'gridTwoByTwo',
      label: 'Grid (2x2)',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'twoRowsRight',
      label: 'Two Rows Right',
    },
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'twoColumnsBottom',
      label: 'Two Columns Bottom',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.None,
      id: 'flipLayout',
      label: 'Flip Layout',
    },
  ])
})
