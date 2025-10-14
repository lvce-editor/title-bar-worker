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
      type: VirtualDomElements.Div,
      className: ClassNames.Menu,
      role: AriaRoles.Menu,
      tabIndex: -1,
      childCount: 0,
    },
  ])
})

test('getMenuVirtualDom - single menu item', () => {
  const menuItems: readonly VisibleMenuItem[] = [
    {
      label: 'Single Item',
      flags: 0,
      isFocused: false,
      isExpanded: false,
      level: 0,
      key: 0,
    },
  ]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result).toHaveLength(3) // Menu container + menu item div + text
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    childCount: 1,
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
      label: 'Item 1',
      flags: 0,
      isFocused: false,
      isExpanded: false,
      level: 0,
      key: 0,
    },
    {
      label: 'Item 2',
      flags: 0,
      isFocused: true,
      isExpanded: false,
      level: 0,
      key: 1,
    },
    {
      label: 'Item 3',
      flags: 0,
      isFocused: false,
      isExpanded: true,
      level: 0,
      key: 2,
    },
  ]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result.length).toBeGreaterThan(4) // Menu container + multiple DOM nodes for each menu item
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    childCount: 3,
  })
})

test('getMenuVirtualDom - childCount matches menu items length', () => {
  const menuItems1: readonly VisibleMenuItem[] = [{ label: 'Item 1', flags: 0, isFocused: false, isExpanded: false, level: 0, key: 0 }]
  const menuItems2: readonly VisibleMenuItem[] = [
    { label: 'Item 1', flags: 0, isFocused: false, isExpanded: false, level: 0, key: 0 },
    { label: 'Item 2', flags: 0, isFocused: false, isExpanded: false, level: 0, key: 1 },
    { label: 'Item 3', flags: 0, isFocused: false, isExpanded: false, level: 0, key: 2 },
  ]

  const result1 = GetMenuVirtualDom.getMenuVirtualDom(menuItems1)
  const result2 = GetMenuVirtualDom.getMenuVirtualDom(menuItems2)

  expect(result1[0].childCount).toBe(1)
  expect(result2[0].childCount).toBe(3)
})

test('getMenuVirtualDom - menu container always has correct structure', () => {
  const menuItems: readonly VisibleMenuItem[] = [{ label: 'Test Item', flags: 0, isFocused: false, isExpanded: false, level: 0, key: 0 }]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    childCount: 1,
  })
})

test('getMenuVirtualDom - handles different menu item types', () => {
  const menuItems: readonly VisibleMenuItem[] = [
    { label: 'Default Item', flags: 0, isFocused: false, isExpanded: false, level: 0, key: 0 },
    { label: 'Separator Item', flags: 2, isFocused: false, isExpanded: false, level: 0, key: 0 }, // Separator flag
    { label: 'Checked Item', flags: 4, isFocused: false, isExpanded: false, level: 0, key: 0 }, // Checked flag
  ]

  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)

  expect(result.length).toBeGreaterThan(4) // Menu container + multiple DOM nodes for each menu item
  expect(result[0].childCount).toBe(3)
})
