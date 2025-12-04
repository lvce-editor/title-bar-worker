import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemUncheckedDom from '../src/parts/GetMenuItemUncheckedDom/GetMenuItemUncheckedDom.ts'

test('getMenuItemUncheckedDom - basic unchecked menu item', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Unchecked Item',
    level: 0,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      ariaChecked: false,
      childCount: 1,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unchecked Item',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemUncheckedDom - unchecked menu item with different label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Another Unchecked Item',
    level: 0,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      ariaChecked: false,
      childCount: 1,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Another Unchecked Item',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemUncheckedDom - ignores other menuItem properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 123,
    isExpanded: true,
    isFocused: true,
    key: 999,
    label: 'Test Item',
    level: 5,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      ariaChecked: false,
      childCount: 1,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Test Item',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemUncheckedDom - empty label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: '',
    level: 0,
  }

  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)

  expect(result).toEqual([
    {
      ariaChecked: false,
      childCount: 1,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItemCheckBox,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemUncheckedDom - returns same structure regardless of input', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: true,
    isFocused: true,
    key: 10,
    label: 'Item 1',
    level: 2,
  }

  const menuItem2: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 5,
    label: 'Item 2',
    level: 0,
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
