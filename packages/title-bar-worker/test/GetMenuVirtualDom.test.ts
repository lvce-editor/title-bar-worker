import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuVirtualDom from '../src/parts/GetMenuVirtualDom/GetMenuVirtualDom.ts'

test('getMenuVirtualDom - empty menu items array', () => {
  const menuItems: readonly VisibleMenuItem[] = []

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result).toEqual([
    {
      childCount: 0,
      className: ClassNames.Menu,
      role: AriaRoles.Menu,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getMenuVirtualDom - single menu item', () => {
  const menuItems: readonly VisibleMenuItem[] = [
    {
      flags: 0,
      isExpanded: false,
      isFocused: false,
      key: 0,
      label: 'Single Item',
      level: 0,
    },
  ]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result).toHaveLength(3) // Menu container + menu item div + text
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
  // The second element should be the menu item div
  expect(result[1].type).toBe(VirtualDomElements.Div)
  expect(result[1].className).toBe(ClassNames.MenuItem)
  // The third element should be the text
  expect(result[2].type).toBe(VirtualDomElements.Text)
  expect(result[2].text).toBe('Single Item')
})

test('getMenuVirtualDom - multiple menu items', () => {
  const menuItems: readonly VisibleMenuItem[] = [
    {
      flags: 0,
      isExpanded: false,
      isFocused: false,
      key: 0,
      label: 'Item 1',
      level: 0,
    },
    {
      flags: 0,
      isExpanded: false,
      isFocused: true,
      key: 1,
      label: 'Item 2',
      level: 0,
    },
    {
      flags: 0,
      isExpanded: true,
      isFocused: false,
      key: 2,
      label: 'Item 3',
      level: 0,
    },
  ]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result.length).toBeGreaterThan(4) // Menu container + multiple DOM nodes for each menu item
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuVirtualDom - childCount matches menu items length', () => {
  const menuItems1: readonly VisibleMenuItem[] = [{ flags: 0, isExpanded: false, isFocused: false, key: 0, label: 'Item 1', level: 0 }]
  const menuItems2: readonly VisibleMenuItem[] = [
    { flags: 0, isExpanded: false, isFocused: false, key: 0, label: 'Item 1', level: 0 },
    { flags: 0, isExpanded: false, isFocused: false, key: 1, label: 'Item 2', level: 0 },
    { flags: 0, isExpanded: false, isFocused: false, key: 2, label: 'Item 3', level: 0 },
  ]

  const result1 = GetMenuVirtualDom.getMenuVirtualDom(menuItems1)
  const result2 = GetMenuVirtualDom.getMenuVirtualDom(menuItems2)

  expect(result1[0].childCount).toBe(1)
  expect(result2[0].childCount).toBe(3)
})

test('getMenuVirtualDom - menu container always has correct structure', () => {
  const menuItems: readonly VisibleMenuItem[] = [{ flags: 0, isExpanded: false, isFocused: false, key: 0, label: 'Test Item', level: 0 }]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuVirtualDom - handles different menu item types', () => {
  const menuItems: readonly VisibleMenuItem[] = [
    { flags: 0, isExpanded: false, isFocused: false, key: 0, label: 'Default Item', level: 0 },
    { flags: 2, isExpanded: false, isFocused: false, key: 0, label: 'Separator Item', level: 0 }, // Separator flag
    { flags: 4, isExpanded: false, isFocused: false, key: 0, label: 'Checked Item', level: 0 }, // Checked flag
  ]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result.length).toBeGreaterThan(4) // Menu container + multiple DOM nodes for each menu item
  expect(result[0].childCount).toBe(3)
})
