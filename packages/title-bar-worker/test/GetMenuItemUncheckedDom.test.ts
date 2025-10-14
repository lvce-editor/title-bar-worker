import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemUncheckedDom from '../src/parts/GetMenuItemUncheckedDom/GetMenuItemUncheckedDom.ts'

test('getMenuItemUncheckedDom - basic unchecked menu item', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Unchecked Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      ariaChecked: false,
      tabIndex: -1,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Unchecked Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemUncheckedDom - unchecked menu item with different label', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Another Unchecked Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      ariaChecked: false,
      tabIndex: -1,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Another Unchecked Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemUncheckedDom - ignores other menuItem properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 123,
    isFocused: true,
    isExpanded: true,
    level: 5,
    key: 999,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      ariaChecked: false,
      tabIndex: -1,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemUncheckedDom - empty label', () => {
  const menuItem: VisibleMenuItem = {
    label: '',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      ariaChecked: false,
      tabIndex: -1,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '',
      childCount: 0,
    },
  ])
})

test('getMenuItemUncheckedDom - returns same structure regardless of input', () => {
  const menuItem1: VisibleMenuItem = {
    label: 'Item 1',
    flags: 1,
    isFocused: true,
    isExpanded: true,
    level: 2,
    key: 10,
  }

  const menuItem2: VisibleMenuItem = {
    label: 'Item 2',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 5,
  }

  const result1 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem1)
  const result2 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem2)

  // Both should have the same structure, only the text content should differ
  expect(result1).toHaveLength(2)
  expect(result2).toHaveLength(2)
  expect(result1[0]).toEqual(result2[0]) // Same div structure
  expect(result1[1].text).toBe('Item 1')
  expect(result2[1].text).toBe('Item 2')
})
