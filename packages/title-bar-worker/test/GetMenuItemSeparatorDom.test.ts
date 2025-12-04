import { expect, test } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemSeparatorDom from '../src/parts/GetMenuItemSeparatorDom/GetMenuItemSeparatorDom.ts'

test('getMenuItemSeparatorDom', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 1,
    label: 'Test Item',
    level: 0,
  }

  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.MenuItemSeparator,
      role: AriaRoles.Separator,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.MenuItemSeparatorLine,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getMenuItemSeparatorDom returns same result regardless of menuItem properties', () => {
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

  const result1 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem1)
  const result2 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem2)

  expect(result1).toEqual(result2)
})
