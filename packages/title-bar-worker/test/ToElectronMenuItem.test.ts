import { expect, test } from '@jest/globals'
import * as ElectronMenuItemRole from '../src/parts/ElectronMenuItemRole/ElectronMenuItemRole.ts'
import * as ElectronMenuItemType from '../src/parts/ElectronMenuItemType/ElectronMenuItemType.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarStrings from '../src/parts/TitleBarStrings/TitleBarStrings.ts'
import * as ToElectronMenuItem from '../src/parts/ToElectronMenuItem/ToElectronMenuItem.ts'

test('copy - should return menu item with Copy role', () => {
  const entry = {
    label: TitleBarStrings.copy(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.copy(),
    role: ElectronMenuItemRole.Copy,
  })
})

test('cut - should return menu item with Cut role', () => {
  const entry = {
    label: TitleBarStrings.cut(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.cut(),
    role: ElectronMenuItemRole.Cut,
  })
})

test('edit - should return menu item with EditMenu role and empty submenu', () => {
  const entry = {
    label: TitleBarStrings.edit(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.edit(),
    role: ElectronMenuItemRole.EditMenu,
    submenu: [],
  })
})

test('exit - should return menu item with Quit role', () => {
  const entry = {
    label: TitleBarStrings.exit(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.exit(),
    role: ElectronMenuItemRole.Quit,
  })
})

test('file - should return menu item with FileMenu role and empty submenu', () => {
  const entry = {
    label: TitleBarStrings.file(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.file(),
    role: ElectronMenuItemRole.FileMenu,
    submenu: [],
  })
})

test('help - should return menu item with Help role and empty submenu', () => {
  const entry = {
    label: TitleBarStrings.help(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.help(),
    role: ElectronMenuItemRole.Help,
    submenu: [],
  })
})

test('paste - should return menu item with Paste role', () => {
  const entry = {
    label: TitleBarStrings.paste(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.paste(),
    role: ElectronMenuItemRole.Paste,
  })
})

test('redo - should return menu item with Redo role', () => {
  const entry = {
    label: TitleBarStrings.redo(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.redo(),
    role: ElectronMenuItemRole.Redo,
  })
})

test('selectAll - should return menu item with SelectAll role', () => {
  const entry = {
    label: TitleBarStrings.selectAll(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.selectAll(),
    role: ElectronMenuItemRole.SelectAll,
  })
})

test('toggleDeveloperTools - should return menu item with ToggleDevTools role', () => {
  const entry = {
    label: TitleBarStrings.toggleDeveloperTools(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.toggleDeveloperTools(),
    role: ElectronMenuItemRole.ToggleDevTools,
  })
})

test('undo - should return menu item with Undo role', () => {
  const entry = {
    label: TitleBarStrings.undo(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.undo(),
    role: ElectronMenuItemRole.Undo,
  })
})

test('separator flag - should return separator type', () => {
  const entry = {
    flags: MenuItemFlags.Separator,
    label: 'Some Label',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    type: ElectronMenuItemType.Separator,
  })
})

test('subMenu flag - should return submenu type with empty submenu', () => {
  const entry = {
    flags: MenuItemFlags.SubMenu,
    label: 'Sub Menu',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Sub Menu',
    submenu: [],
    type: ElectronMenuItemType.SubMenu,
  })
})

test('default case - should return menu item with label only', () => {
  const entry = {
    flags: MenuItemFlags.None,
    label: 'Custom Menu Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Custom Menu Item',
  })
})

test('default case with no flags - should return menu item with label only', () => {
  const entry = {
    label: 'Another Custom Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Another Custom Item',
  })
})

test('label match takes precedence over separator flag', () => {
  const entry = {
    flags: MenuItemFlags.Separator,
    label: TitleBarStrings.copy(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.copy(),
    role: ElectronMenuItemRole.Copy,
  })
})

test('label match takes precedence over subMenu flag', () => {
  const entry = {
    flags: MenuItemFlags.SubMenu,
    label: TitleBarStrings.file(),
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: TitleBarStrings.file(),
    role: ElectronMenuItemRole.FileMenu,
    submenu: [],
  })
})

test('checked flag - should return menu item with label only', () => {
  const entry = {
    flags: MenuItemFlags.Checked,
    label: 'Checked Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Checked Item',
  })
})

test('unchecked flag - should return menu item with label only', () => {
  const entry = {
    flags: MenuItemFlags.Unchecked,
    label: 'Unchecked Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Unchecked Item',
  })
})

test('disabled flag - should return menu item with label only', () => {
  const entry = {
    flags: MenuItemFlags.Disabled,
    label: 'Disabled Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Disabled Item',
  })
})

test('restoreFocus flag - should return menu item with label only', () => {
  const entry = {
    flags: MenuItemFlags.RestoreFocus,
    label: 'Restore Focus Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Restore Focus Item',
  })
})

test('ignore flag - should return menu item with label only', () => {
  const entry = {
    flags: MenuItemFlags.Ignore,
    label: 'Ignore Item',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: 'Ignore Item',
  })
})

test('empty label with separator flag - should return separator', () => {
  const entry = {
    flags: MenuItemFlags.Separator,
    label: '',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    type: ElectronMenuItemType.Separator,
  })
})

test('empty label with subMenu flag - should return submenu with empty label', () => {
  const entry = {
    flags: MenuItemFlags.SubMenu,
    label: '',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: '',
    submenu: [],
    type: ElectronMenuItemType.SubMenu,
  })
})

test('empty label default case - should return menu item with empty label', () => {
  const entry = {
    label: '',
  }
  const result = ToElectronMenuItem.toElectronMenuItem(entry)
  expect(result).toEqual({
    label: '',
  })
})

test('all menu roles preserve original label', () => {
  const testCases = [
    { label: TitleBarStrings.copy(), role: ElectronMenuItemRole.Copy },
    { label: TitleBarStrings.cut(), role: ElectronMenuItemRole.Cut },
    { label: TitleBarStrings.paste(), role: ElectronMenuItemRole.Paste },
    { label: TitleBarStrings.undo(), role: ElectronMenuItemRole.Undo },
    { label: TitleBarStrings.redo(), role: ElectronMenuItemRole.Redo },
    { label: TitleBarStrings.selectAll(), role: ElectronMenuItemRole.SelectAll },
    { label: TitleBarStrings.toggleDeveloperTools(), role: ElectronMenuItemRole.ToggleDevTools },
  ]

  for (const testCase of testCases) {
    const entry = {
      label: testCase.label,
    }
    const result = ToElectronMenuItem.toElectronMenuItem(entry)
    expect(result.label).toBe(testCase.label)
    expect(result.role).toBe(testCase.role)
  }
})

test('all menu roles with submenu preserve original label', () => {
  const testCases = [
    { label: TitleBarStrings.edit(), role: ElectronMenuItemRole.EditMenu },
    { label: TitleBarStrings.file(), role: ElectronMenuItemRole.FileMenu },
    { label: TitleBarStrings.help(), role: ElectronMenuItemRole.Help },
  ]

  for (const testCase of testCases) {
    const entry = {
      label: testCase.label,
    }
    const result = ToElectronMenuItem.toElectronMenuItem(entry)
    expect(result.label).toBe(testCase.label)
    expect(result.role).toBe(testCase.role)
    expect(result.submenu).toEqual([])
  }
})
