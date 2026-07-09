import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesEditorLayout/MenuEntriesEditorLayout.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries', () => {
  expect(getMenuEntries()).toEqual([
    {
      command: 'MainArea.splitUp',
      flags: MenuItemFlags.None,
      id: 'splitUp',
      keyboardShortCut: 'Ctrl+K Ctrl+\\',
      label: 'Split Up',
    },
    {
      command: 'MainArea.splitDown',
      flags: MenuItemFlags.None,
      id: 'splitDown',
      label: 'Split Down',
    },
    {
      command: 'MainArea.splitLeft',
      flags: MenuItemFlags.None,
      id: 'splitLeft',
      label: 'Split Left',
    },
    {
      command: 'MainArea.splitRight',
      flags: MenuItemFlags.None,
      id: 'splitRight',
      label: 'Split Right',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'MainArea.moveIntoNewWindow',
      flags: MenuItemFlags.None,
      id: 'moveEditorIntoNewWindow',
      label: 'Move Editor into New Window',
    },
    {
      command: 'MainArea.copyIntoNewWindow',
      flags: MenuItemFlags.None,
      id: 'copyEditorIntoNewWindow',
      keyboardShortCut: 'Ctrl+K O',
      label: 'Copy Editor into New Window',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'MainArea.setEditorLayoutSingle',
      flags: MenuItemFlags.None,
      id: 'single',
      label: 'Single',
    },
    {
      command: 'MainArea.setEditorLayoutTwoColumns',
      flags: MenuItemFlags.None,
      id: 'twoColumns',
      label: 'Two Columns',
    },
    {
      command: 'MainArea.setEditorLayoutThreeColumns',
      flags: MenuItemFlags.None,
      id: 'threeColumns',
      label: 'Three Columns',
    },
    {
      command: 'MainArea.setEditorLayoutTwoRows',
      flags: MenuItemFlags.None,
      id: 'twoRows',
      label: 'Two Rows',
    },
    {
      command: 'MainArea.setEditorLayoutThreeRows',
      flags: MenuItemFlags.None,
      id: 'threeRows',
      label: 'Three Rows',
    },
    {
      command: 'MainArea.setEditorLayoutGrid',
      flags: MenuItemFlags.None,
      id: 'gridTwoByTwo',
      label: 'Grid (2x2)',
    },
    {
      command: 'MainArea.setEditorLayoutTwoRowsRight',
      flags: MenuItemFlags.None,
      id: 'twoRowsRight',
      label: 'Two Rows Right',
    },
    {
      command: 'MainArea.setEditorLayoutTwoColumnsBottom',
      flags: MenuItemFlags.None,
      id: 'twoColumnsBottom',
      label: 'Two Columns Bottom',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'MainArea.flipEditorLayout',
      flags: MenuItemFlags.None,
      id: 'flipLayout',
      keyboardShortCut: 'Shift+Alt+8',
      label: 'Flip Layout',
    },
  ])
})
