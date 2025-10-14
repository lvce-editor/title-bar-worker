import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemSeparatorDom from '../src/parts/GetMenuItemSeparatorDom/GetMenuItemSeparatorDom.ts'

test('getMenuItemSeparatorDom', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 1,
  }

  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItemSeparator,
      role: AriaRoles.Separator,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MenuItemSeparatorLine,
      childCount: 0,
    },
  ])
})

test('getMenuItemSeparatorDom returns same result regardless of menuItem properties', () => {
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

  const result1 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem1)
  const result2 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem2)

  expect(result1).toEqual(result2)
})
