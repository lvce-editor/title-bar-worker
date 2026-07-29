import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemCheckedDom from '../src/parts/GetMenuItemCheckedDom/GetMenuItemCheckedDom.ts'

const createMenuItem = (isFocused: boolean): VisibleMenuItem => ({
  flags: 0,
  isExpanded: false,
  isFocused,
  key: 0,
  label: 'Auto Save',
  level: 0,
})

test('getMenuItemCheckedDom - not focused', () => {
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(createMenuItem(false))

  expect(result[0]).toEqual({
    ariaChecked: true,
    childCount: 2,
    className: 'MenuItem MenuItemCheckMark',
    role: AriaRoles.MenuItemCheckBox,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemCheckedDom - focused', () => {
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(createMenuItem(true))

  expect(result[0]).toEqual({
    ariaChecked: true,
    childCount: 2,
    className: 'MenuItem MenuItemCheckMark MenuItemFocused',
    role: AriaRoles.MenuItemCheckBox,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemCheckedDom - keybinding', () => {
  const menuItem = {
    ...createMenuItem(false),
    key: 2048 + 38,
    label: 'Panel',
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)

  expect(result[0].childCount).toBe(3)
  expect(result.at(-1)).toEqual({
    childCount: 0,
    text: 'Ctrl+J',
    type: VirtualDomElements.Text,
  })
})
