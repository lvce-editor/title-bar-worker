import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemDisabledDom from '../src/parts/GetMenuItemDisabledDom/GetMenuItemDisabledDom.ts'

test('getMenuItemDisabledDom - basic disabled menu item', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Disabled Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      disabled: true,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Disabled Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemDisabledDom - disabled menu item with different label', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Another Disabled Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      disabled: true,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Another Disabled Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemDisabledDom - ignores other menuItem properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 123,
    isFocused: true,
    isExpanded: true,
    level: 5,
    key: 999,
  }

  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      disabled: true,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Test Item',
      childCount: 0,
    },
  ])
})

test('getMenuItemDisabledDom - empty label', () => {
  const menuItem: VisibleMenuItem = {
    label: '',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItem,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      disabled: true,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '',
      childCount: 0,
    },
  ])
})

test('getMenuItemDisabledDom - returns same structure regardless of input', () => {
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

  const result1 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem1)
  const result2 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem2)

  // Both should have the same structure, only the text content should differ
  expect(result1).toHaveLength(2)
  expect(result2).toHaveLength(2)
  expect(result1[0]).toEqual(result2[0]) // Same div structure
  expect(result1[1].text).toBe('Item 1')
  expect(result2[1].text).toBe('Item 2')
})
