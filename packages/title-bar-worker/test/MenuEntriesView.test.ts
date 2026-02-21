import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesView/MenuEntriesView.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuEntries', () => {
  const result = getMenuEntries()
  expect(result).toEqual([
    {
      command: 'Command.openCommandPalette',
      flags: MenuItemFlags.None,
      id: 'commandPalette',
      label: 'Command Palette',
    },
    {
      command: 'View.openView',
      flags: MenuItemFlags.None,
      id: 'openView',
      label: 'Open View',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: 'appearance',
      label: 'Appearance',
    },
    {
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: 'editorLayout',
      label: 'Editor Layout',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Explorer.focus',
      flags: MenuItemFlags.None,
      id: 'explorer',
      label: 'Explorer',
    },
    {
      command: 'Search.focus',
      flags: MenuItemFlags.None,
      id: 'search',
      label: 'Search',
    },
    {
      command: 'SourceControl.focus',
      flags: MenuItemFlags.None,
      id: 'sourceControl',
      label: 'Source Control',
    },
    {
      command: 'Run.focus',
      flags: MenuItemFlags.None,
      id: 'run',
      label: 'Run',
    },
    {
      command: 'Extensions.focus',
      flags: MenuItemFlags.None,
      id: 'extensions',
      label: 'Extensions',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Chat.focus',
      flags: MenuItemFlags.None,
      id: 'chat',
      label: 'Chat',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Problems.toggle',
      flags: MenuItemFlags.None,
      id: 'problems',
      label: 'Problems',
    },
    {
      command: 'Output.toggle',
      flags: MenuItemFlags.None,
      id: 'output',
      label: 'Output',
    },
    {
      args: ['Terminal'],
      command: 'Layout.togglePanel',
      flags: MenuItemFlags.None,
      id: 'terminal',
      label: 'Terminal',
    },
    {
      command: 'Editor.toggleWordWrap',
      flags: MenuItemFlags.None,
      id: 'wordWrap',
      label: 'Word Wrap',
    },
  ])
})
