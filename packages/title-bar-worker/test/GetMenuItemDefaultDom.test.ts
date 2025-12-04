import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemDefaultDom from '../src/parts/GetMenuItemDefaultDom/GetMenuItemDefaultDom.ts'

const createMenuItem = (overrides: Partial<VisibleMenuItem> = {}): VisibleMenuItem => ({
  flags: 0,
  isExpanded: false,
  isFocused: false,
  key: 0,
  label: 'Test Menu Item',
  level: 0,
  ...overrides,
})

test('getMenuItemDefaultDom - basic menu item without key binding', () => {
  const menuItem = createMenuItem()
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemDefaultDom - focused menu item without key binding', () => {
  const menuItem = createMenuItem({ isFocused: true })
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'MenuItem MenuItemFocused',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with key binding', () => {
  const menuItem = createMenuItem({ key: 29 }) // 'A' key
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'MenuItemKeyBinding',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'A',
      type: VirtualDomElements.Text,
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
      childCount: 2,
      className: 'MenuItem MenuItemFocused',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'MenuItemKeyBinding',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'A',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with ctrl key binding', () => {
  const menuItem = createMenuItem({ key: 2048 + 29 }) // Ctrl+A (2048 is CtrlCmd, 29 is KeyA)
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'MenuItemKeyBinding',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'Ctrl+A',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with shift key binding', () => {
  const menuItem = createMenuItem({ key: 1024 + 29 }) // Shift+A (1024 is Shift, 29 is KeyA)
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'MenuItemKeyBinding',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'Shift+A',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemDefaultDom - menu item with ctrl+shift key binding', () => {
  const menuItem = createMenuItem({ key: 2048 + 1024 + 29 }) // Ctrl+Shift+A (2048 is CtrlCmd, 1024 is Shift, 29 is KeyA)
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'MenuItem',
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Menu Item',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'MenuItemKeyBinding',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'Ctrl+Shift+A',
      type: VirtualDomElements.Text,
    },
  ])
})
