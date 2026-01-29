import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import * as ToElectronMenu from '../src/parts/ToElectronMenu/ToElectronMenu.ts'

test('toElectronMenu - empty menu map', () => {
  const map = {
    1: [],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result).toEqual({
    commandMap: {},
    electronMenu: [],
  })
})

test('toElectronMenu - single menu item without command', () => {
  const map = {
    1: [
      {
        flags: 0,
        label: 'Custom Item',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([
    {
      label: 'Custom Item',
    },
  ])
  expect(result.commandMap).toEqual({})
})

test('toElectronMenu - single menu item with command', () => {
  const map = {
    1: [
      {
        args: [],
        command: 'file.open',
        flags: 0,
        label: 'Open',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toEqual([
    {
      label: 'Open',
    },
  ])
  expect(result.commandMap).toEqual({
    Open: {
      args: [],
      command: 'file.open',
    },
  })
})

test('toElectronMenu - multiple menu items', () => {
  const map = {
    1: [
      {
        flags: 0,
        label: 'File',
      },
      {
        flags: 0,
        label: 'Edit',
      },
      {
        flags: 0,
        label: 'Help',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(3)
  expect(result.electronMenu[0].label).toBe('File')
  expect(result.electronMenu[1].label).toBe('Edit')
  expect(result.electronMenu[2].label).toBe('Help')
})

test('toElectronMenu - submenu items', () => {
  const map = {
    1: [
      {
        flags: MenuItemFlags.SubMenu,
        id: 2,
        label: 'File',
      },
    ],
    2: [
      {
        command: 'file.open',
        flags: 0,
        label: 'Open',
      },
      {
        command: 'file.save',
        flags: 0,
        label: 'Save',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(1)
  expect(result.electronMenu[0].label).toBe('File')
  expect(result.electronMenu[0].submenu).toHaveLength(2)
  expect(result.electronMenu[0].submenu[0].label).toBe('Open')
  expect(result.electronMenu[0].submenu[1].label).toBe('Save')
  expect(result.commandMap).toEqual({
    Open: {
      args: undefined,
      command: 'file.open',
    },
    Save: {
      args: undefined,
      command: 'file.save',
    },
  })
})

test('toElectronMenu - nested submenu items', () => {
  const map = {
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
        label: 'Open Recent',
      },
    ],
    3: [
      {
        args: ['file1.txt'],
        command: 'file.openRecent',
        flags: 0,
        label: 'file1.txt',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu[0].label).toBe('File')
  expect(result.electronMenu[0].submenu[0].label).toBe('Open Recent')
  expect(result.electronMenu[0].submenu[0].submenu[0].label).toBe('file1.txt')
  expect(result.commandMap).toEqual({
    'file1.txt': {
      args: ['file1.txt'],
      command: 'file.openRecent',
    },
  })
})

test('toElectronMenu - mixed menu items with and without commands', () => {
  const map = {
    1: [
      {
        flags: MenuItemFlags.SubMenu,
        id: 2,
        label: 'File',
      },
      {
        command: 'app.exit',
        flags: 0,
        label: 'Exit',
      },
    ],
    2: [
      {
        command: 'file.open',
        flags: 0,
        label: 'Open',
      },
      {
        flags: MenuItemFlags.SubMenu,
        id: 3,
        label: 'Recent',
      },
    ],
    3: [
      {
        args: ['document.md'],
        command: 'file.openRecent',
        flags: 0,
        label: 'document.md',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result.electronMenu).toHaveLength(2)
  expect(result.electronMenu[0].label).toBe('File')
  expect(result.electronMenu[0].submenu).toHaveLength(2)
  expect(result.electronMenu[1].label).toBe('Exit')

  expect(result.commandMap).toEqual({
    'document.md': {
      args: ['document.md'],
      command: 'file.openRecent',
    },
    Exit: {
      args: undefined,
      command: 'app.exit',
    },
    Open: {
      args: undefined,
      command: 'file.open',
    },
  })
})

test('toElectronMenu - returns ElectronMenuResult with commandMap and electronMenu', () => {
  const map = {
    1: [
      {
        command: 'test.command',
        flags: 0,
        label: 'Test',
      },
    ],
  }

  const result = ToElectronMenu.toElectronMenu(map, 1)

  expect(result).toHaveProperty('commandMap')
  expect(result).toHaveProperty('electronMenu')
  expect(Array.isArray(result.electronMenu)).toBe(true)
  expect(typeof result.commandMap).toBe('object')
})
