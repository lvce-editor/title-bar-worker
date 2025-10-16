import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemDefaultDom from '../src/parts/GetMenuItemDefaultDom/GetMenuItemDefaultDom.ts'

const createMenuItem = (overrides: Partial<VisibleMenuItem> = {}): VisibleMenuItem => ({
  label: 'Test Menu Item',
  flags: 0,
  isFocused: false,
  isExpanded: false,
  level: 0,
  key: 0,
  ...overrides,
})

test('getMenuItemDefaultDom - basic menu item without key binding', () => {
  const menuItem = createMenuItem()
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemDefaultDom - focused menu item without key binding', () => {
  const menuItem = createMenuItem({ isFocused: true })
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem MenuItemFocused',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with key binding', () => {
  const menuItem = createMenuItem({ key: 29 }) // 'A' key
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: 'MenuItemKeyBinding',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'A',
      childCount: 0,
    },
  ])
})

test('getMenuItemDefaultDom - focused menu item with key binding', () => {
  const menuItem = createMenuItem({
    isFocused: true,
    key: 29, // 'A' key
  })
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem MenuItemFocused',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: 'MenuItemKeyBinding',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'A',
      childCount: 0,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with ctrl key binding', () => {
  const menuItem = createMenuItem({ key: 2048 + 29 }) // Ctrl+A (2048 is CtrlCmd, 29 is KeyA)
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: 'MenuItemKeyBinding',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Ctrl+A',
      childCount: 0,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with shift key binding', () => {
  const menuItem = createMenuItem({ key: 1024 + 29 }) // Shift+A (1024 is Shift, 29 is KeyA)
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: 'MenuItemKeyBinding',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Shift+A',
      childCount: 0,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with ctrl+shift key binding', () => {
  const menuItem = createMenuItem({ key: 2048 + 1024 + 29 }) // Ctrl+Shift+A (2048 is CtrlCmd, 1024 is Shift, 29 is KeyA)
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Menu Item',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      className: 'MenuItemKeyBinding',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Ctrl+Shift+A',
      childCount: 0,
    },
  ])
})
