import { expect, test } from '@jest/globals'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ToElectronMenuInternal from '../src/parts/ToElectronMenuInternal/ToElectronMenuInternal.ts'

test('should handle simple menu items with commands', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        args: [],
        command: 'file.open',
        id: 2,
        label: 'File',
      },
      {
        args: [],
        command: 'edit.cut',
        id: 3,
        label: 'Edit',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(commandMap['File']).toEqual({
    args: [],
    command: 'file.open',
  })
  expect(commandMap['Edit']).toEqual({
    args: [],
    command: 'edit.cut',
  })
  expect(electronMenu.length).toBe(2)
})

test('should handle menu items without commands', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        id: 2,
        label: 'File',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(commandMap['File']).toBeUndefined()
  expect(electronMenu.length).toBe(1)
})

test('should handle submenu items recursively', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        flags: MenuItemFlags.SubMenu,
        id: 2,
        label: 'File',
      },
    ],
    2: [
      {
        args: [],
        command: 'file.new',
        id: 3,
        label: 'New',
      },
      {
        args: [],
        command: 'file.open',
        id: 4,
        label: 'Open',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(commandMap['New']).toEqual({
    args: [],
    command: 'file.new',
  })
  expect(commandMap['Open']).toEqual({
    args: [],
    command: 'file.open',
  })
  expect(electronMenu.length).toBe(1)
})

test('should handle nested submenus', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        flags: MenuItemFlags.SubMenu,
        id: 2,
        label: 'File',
      },
    ],
    2: [
      {
        flags: MenuItemFlags.SubMenu,
        id: 3,
        label: 'Recent',
      },
    ],
    3: [
      {
        args: ['file.txt'],
        command: 'file.openRecent',
        id: 4,
        label: 'file.txt',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(commandMap['file.txt']).toEqual({
    args: ['file.txt'],
    command: 'file.openRecent',
  })
  expect(electronMenu.length).toBe(1)
})

test('should handle mixed menu items and submenus', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        args: [],
        command: 'file.new',
        id: 2,
        label: 'New',
      },
      {
        flags: MenuItemFlags.SubMenu,
        id: 3,
        label: 'Edit',
      },
      {
        args: [],
        command: 'app.exit',
        id: 4,
        label: 'Exit',
      },
    ],
    3: [
      {
        args: [],
        command: 'edit.copy',
        id: 5,
        label: 'Copy',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(commandMap['New']).toEqual({
    args: [],
    command: 'file.new',
  })
  expect(commandMap['Copy']).toEqual({
    args: [],
    command: 'edit.copy',
  })
  expect(commandMap['Exit']).toEqual({
    args: [],
    command: 'app.exit',
  })
  expect(electronMenu.length).toBe(3)
})

test('should return commandMap and electronMenu', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        args: [],
        command: 'file.new',
        id: 2,
        label: 'File',
      },
    ],
  }

  const result = ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(result).toEqual({
    commandMap: expect.any(Object),
    electronMenu: expect.any(Array),
  })
  expect(result.commandMap).toBe(commandMap)
  expect(result.electronMenu).toBe(electronMenu)
})

test('should handle menu items with multiple arguments', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        args: ['dir', 'recursive', true],
        command: 'file.open',
        id: 2,
        label: 'Open File',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(commandMap['Open File']).toEqual({
    args: ['dir', 'recursive', true],
    command: 'file.open',
  })
})

test('should handle empty menu', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [],
  }

  const result = ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(result.commandMap).toEqual(commandMap)
  expect(result.electronMenu).toHaveLength(0)
})

test('should handle menu with submenu that has no entries', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        flags: MenuItemFlags.SubMenu,
        id: 2,
        label: 'File',
      },
    ],
    2: [],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(electronMenu.length).toBe(1)
})

test('should push menu items to electronMenu array', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        id: 2,
        label: 'Item 1',
      },
      {
        id: 3,
        label: 'Item 2',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(electronMenu).toHaveLength(2)
  expect(electronMenu[0]).toEqual(expect.objectContaining({ label: 'Item 1' }))
  expect(electronMenu[1]).toEqual(expect.objectContaining({ label: 'Item 2' }))
})

test('should handle various menu item flags', () => {
  const commandMap: any = Object.create(null)
  const electronMenu: any[] = []
  const map: any = {
    1: [
      {
        flags: MenuItemFlags.Separator,
        id: 2,
        label: 'Separator',
      },
      {
        flags: MenuItemFlags.None,
        id: 3,
        label: 'Normal',
      },
      {
        flags: MenuItemFlags.Checked,
        id: 4,
        label: 'Checked',
      },
      {
        flags: MenuItemFlags.Disabled,
        id: 5,
        label: 'Disabled',
      },
    ],
  }

  ToElectronMenuInternal.toElectronMenuInternal(commandMap, map, 1, electronMenu)

  expect(electronMenu).toHaveLength(4)
})
