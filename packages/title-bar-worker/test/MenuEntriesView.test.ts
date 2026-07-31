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
      args: ['Explorer'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'explorer',
      label: 'Explorer',
    },
    {
      args: ['Search'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'search',
      label: 'Search',
    },
    {
      args: ['Source Control'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'sourceControl',
      label: 'Source Control',
    },
    {
      args: ['Run And Debug'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'run',
      label: 'Run',
    },
    {
      args: ['Extensions'],
      command: 'Layout.openSideBarViewlet',
      flags: MenuItemFlags.None,
      id: 'extensions',
      label: 'Extensions',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Layout.openChat',
      flags: MenuItemFlags.None,
      id: 'chat',
      label: 'Chat',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: ['Problems'],
      command: 'Layout.showPanel',
      flags: MenuItemFlags.None,
      id: 'problems',
      label: 'Problems',
    },
    {
      args: ['Output'],
      command: 'Layout.showPanel',
      flags: MenuItemFlags.None,
      id: 'output',
      label: 'Output',
    },
    {
      args: ['Terminals'],
      command: 'Layout.showPanel',
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
