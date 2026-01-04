import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import * as ToElectronMenu from '../src/parts/ToElectronMenu/ToElectronMenu.ts'
import * as ElectronMenuItemType from '../src/parts/ElectronMenuItemType/ElectronMenuItemType.ts'
import * as ElectronMenuItemRole from '../src/parts/ElectronMenuItemRole/ElectronMenuItemRole.ts'

test('toElectronMenu - empty menu', () => {
  const map: Record<number, readonly any[]> = {
    1: [],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([])
  expect(result.commandMap).toEqual({})
})

test('toElectronMenu - single menu item without command', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Test Item',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([
    {
      label: 'Test Item',
    },
  ])
  expect(result.commandMap).toEqual({})
})

test('toElectronMenu - single menu item with command', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Test Item',
        command: 'test.command',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([
    {
      label: 'Test Item',
    },
  ])
  expect(result.commandMap).toEqual({
    'Test Item': {
      command: 'test.command',
      args: undefined,
    },
  })
})

test('toElectronMenu - menu item with command and args', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Test Item',
        command: 'test.command',
        args: ['arg1', 'arg2'],
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([
    {
      label: 'Test Item',
    },
  ])
  expect(result.commandMap).toEqual({
    'Test Item': {
      command: 'test.command',
      args: ['arg1', 'arg2'],
    },
  })
})

test('toElectronMenu - separator item', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Separator',
        flags: MenuItemFlags.Separator,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([
    {
      type: ElectronMenuItemType.Separator,
    },
  ])
  expect(result.commandMap).toEqual({})
})

test('toElectronMenu - multiple menu items', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Item 1',
        command: 'command1',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Item 2',
        command: 'command2',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Separator',
        flags: MenuItemFlags.Separator,
      },
      {
        label: 'Item 3',
        command: 'command3',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(4)
  expect(result.electronMenu[0]).toEqual({
    label: 'Item 1',
  })
  expect(result.electronMenu[1]).toEqual({
    label: 'Item 2',
  })
  expect(result.electronMenu[2]).toEqual({
    type: ElectronMenuItemType.Separator,
  })
  expect(result.electronMenu[3]).toEqual({
    label: 'Item 3',
  })
  expect(result.commandMap).toEqual({
    'Item 1': {
      command: 'command1',
      args: undefined,
    },
    'Item 2': {
      command: 'command2',
      args: undefined,
    },
    'Item 3': {
      command: 'command3',
      args: undefined,
    },
  })
})

test('toElectronMenu - submenu', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'SubMenu',
        flags: MenuItemFlags.SubMenu,
        id: 2,
      },
    ],
    2: [
      {
        label: 'SubItem 1',
        command: 'subcommand1',
        flags: MenuItemFlags.None,
      },
      {
        label: 'SubItem 2',
        command: 'subcommand2',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(1)
  expect(result.electronMenu[0]).toEqual({
    label: 'SubMenu',
    submenu: [
      {
        label: 'SubItem 1',
      },
      {
        label: 'SubItem 2',
      },
    ],
    type: ElectronMenuItemType.SubMenu,
  })
  expect(result.commandMap).toEqual({
    'SubItem 1': {
      command: 'subcommand1',
      args: undefined,
    },
    'SubItem 2': {
      command: 'subcommand2',
      args: undefined,
    },
  })
})

test('toElectronMenu - nested submenus', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Level 1',
        flags: MenuItemFlags.SubMenu,
        id: 2,
      },
    ],
    2: [
      {
        label: 'Level 2',
        flags: MenuItemFlags.SubMenu,
        id: 3,
      },
    ],
    3: [
      {
        label: 'Level 3 Item',
        command: 'deep.command',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(1)
  expect(result.electronMenu[0]).toEqual({
    label: 'Level 1',
    submenu: [
      {
        label: 'Level 2',
        submenu: [
          {
            label: 'Level 3 Item',
          },
        ],
        type: ElectronMenuItemType.SubMenu,
      },
    ],
    type: ElectronMenuItemType.SubMenu,
  })
  expect(result.commandMap).toEqual({
    'Level 3 Item': {
      command: 'deep.command',
      args: undefined,
    },
  })
})

test('toElectronMenu - menu with special roles', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Copy',
        command: 'copy.command',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Cut',
        command: 'cut.command',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Paste',
        command: 'paste.command',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Undo',
        command: 'undo.command',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Redo',
        command: 'redo.command',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(5)
  expect(result.electronMenu[0]).toEqual({
    label: 'Copy',
    role: ElectronMenuItemRole.Copy,
  })
  expect(result.electronMenu[1]).toEqual({
    label: 'Cut',
    role: ElectronMenuItemRole.Cut,
  })
  expect(result.electronMenu[2]).toEqual({
    label: 'Paste',
    role: ElectronMenuItemRole.Paste,
  })
  expect(result.electronMenu[3]).toEqual({
    label: 'Undo',
    role: ElectronMenuItemRole.Undo,
  })
  expect(result.electronMenu[4]).toEqual({
    label: 'Redo',
    role: ElectronMenuItemRole.Redo,
  })
  expect(result.commandMap).toEqual({
    Copy: {
      command: 'copy.command',
      args: undefined,
    },
    Cut: {
      command: 'cut.command',
      args: undefined,
    },
    Paste: {
      command: 'paste.command',
      args: undefined,
    },
    Undo: {
      command: 'undo.command',
      args: undefined,
    },
    Redo: {
      command: 'redo.command',
      args: undefined,
    },
  })
})

test('toElectronMenu - menu with menu roles', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'File',
        flags: MenuItemFlags.SubMenu,
        id: 2,
      },
      {
        label: 'Edit',
        flags: MenuItemFlags.SubMenu,
        id: 3,
      },
      {
        label: 'Help',
        flags: MenuItemFlags.SubMenu,
        id: 4,
      },
    ],
    2: [
      {
        label: 'File Item',
        command: 'file.command',
        flags: MenuItemFlags.None,
      },
    ],
    3: [
      {
        label: 'Edit Item',
        command: 'edit.command',
        flags: MenuItemFlags.None,
      },
    ],
    4: [
      {
        label: 'Help Item',
        command: 'help.command',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(3)
  expect(result.electronMenu[0]).toEqual({
    label: 'File',
    role: ElectronMenuItemRole.FileMenu,
    submenu: [
      {
        label: 'File Item',
      },
    ],
  })
  expect(result.electronMenu[1]).toEqual({
    label: 'Edit',
    role: ElectronMenuItemRole.EditMenu,
    submenu: [
      {
        label: 'Edit Item',
      },
    ],
  })
  expect(result.electronMenu[2]).toEqual({
    label: 'Help',
    role: ElectronMenuItemRole.Help,
    submenu: [
      {
        label: 'Help Item',
      },
    ],
  })
  expect(result.commandMap).toEqual({
    'File Item': {
      command: 'file.command',
      args: undefined,
    },
    'Edit Item': {
      command: 'edit.command',
      args: undefined,
    },
    'Help Item': {
      command: 'help.command',
      args: undefined,
    },
  })
})

test('toElectronMenu - complex menu structure', () => {
  const map: Record<number, readonly any[]> = {
    1: [
      {
        label: 'Item 1',
        command: 'command1',
        flags: MenuItemFlags.None,
      },
      {
        label: 'Separator 1',
        flags: MenuItemFlags.Separator,
      },
      {
        label: 'SubMenu',
        flags: MenuItemFlags.SubMenu,
        id: 2,
      },
      {
        label: 'Item 2',
        command: 'command2',
        flags: MenuItemFlags.None,
      },
    ],
    2: [
      {
        label: 'SubItem 1',
        command: 'subcommand1',
        flags: MenuItemFlags.None,
      },
      {
        label: 'SubSeparator',
        flags: MenuItemFlags.Separator,
      },
      {
        label: 'Nested SubMenu',
        flags: MenuItemFlags.SubMenu,
        id: 3,
      },
    ],
    3: [
      {
        label: 'Nested Item',
        command: 'nested.command',
        flags: MenuItemFlags.None,
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(4)
  expect(result.electronMenu[0]).toEqual({
    label: 'Item 1',
  })
  expect(result.electronMenu[1]).toEqual({
    type: ElectronMenuItemType.Separator,
  })
  expect(result.electronMenu[2]).toEqual({
    label: 'SubMenu',
    submenu: [
      {
        label: 'SubItem 1',
      },
      {
        type: ElectronMenuItemType.Separator,
      },
      {
        label: 'Nested SubMenu',
        submenu: [
          {
            label: 'Nested Item',
          },
        ],
        type: ElectronMenuItemType.SubMenu,
      },
    ],
    type: ElectronMenuItemType.SubMenu,
  })
  expect(result.electronMenu[3]).toEqual({
    label: 'Item 2',
  })
  expect(result.commandMap).toEqual({
    'Item 1': {
      command: 'command1',
      args: undefined,
    },
    'SubItem 1': {
      command: 'subcommand1',
      args: undefined,
    },
    'Nested Item': {
      command: 'nested.command',
      args: undefined,
    },
    'Item 2': {
      command: 'command2',
      args: undefined,
    },
  })
})
