import { expect, test } from '@jest/globals'
import { getMenuItemCheckedDom } from '../src/parts/GetMenuItemCheckedDom/GetMenuItemCheckedDom.ts'
import { getMenuItemDefaultDom } from '../src/parts/GetMenuItemDefaultDom/GetMenuItemDefaultDom.ts'
import { getMenuItemDisabledDom } from '../src/parts/GetMenuItemDisabledDom/GetMenuItemDisabledDom.ts'
import { getMenuItemsNoopDom } from '../src/parts/GetMenuItemNoopDom/GetMenuItemNoopDom.ts'
import * as GetMenuItemRenderer from '../src/parts/GetMenuItemRenderer/GetMenuItemRenderer.ts'
import { getMenuItemSeparatorDom } from '../src/parts/GetMenuItemSeparatorDom/GetMenuItemSeparatorDom.ts'
import { getMenuItemSubMenuDom } from '../src/parts/GetMenuItemSubMenuDom/GetMenuItemSubMenuDom.ts'
import { getMenuItemUncheckedDom } from '../src/parts/GetMenuItemUncheckedDom/GetMenuItemUncheckedDom.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuItemRenderer returns getMenuItemDefaultDom for None flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.None)
  expect(renderer).toBe(getMenuItemDefaultDom)
})

test('getMenuItemRenderer returns getMenuItemDefaultDom for RestoreFocus flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.RestoreFocus)
  expect(renderer).toBe(getMenuItemDefaultDom)
})

test('getMenuItemRenderer returns getMenuItemDefaultDom for Ignore flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.Ignore)
  expect(renderer).toBe(getMenuItemDefaultDom)
})

test('getMenuItemRenderer returns getMenuItemSeparatorDom for Separator flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.Separator)
  expect(renderer).toBe(getMenuItemSeparatorDom)
})

test('getMenuItemRenderer returns getMenuItemCheckedDom for Checked flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.Checked)
  expect(renderer).toBe(getMenuItemCheckedDom)
})

test('getMenuItemRenderer returns getMenuItemUncheckedDom for Unchecked flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.Unchecked)
  expect(renderer).toBe(getMenuItemUncheckedDom)
})

test('getMenuItemRenderer returns getMenuItemDisabledDom for Disabled flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.Disabled)
  expect(renderer).toBe(getMenuItemDisabledDom)
})

test('getMenuItemRenderer returns getMenuItemSubMenuDom for SubMenu flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(MenuItemFlags.SubMenu)
  expect(renderer).toBe(getMenuItemSubMenuDom)
})

test('getMenuItemRenderer returns getMenuItemsNoopDom for unknown flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(999)
  expect(renderer).toBe(getMenuItemsNoopDom)
})

test('getMenuItemRenderer returns getMenuItemsNoopDom for negative flag', () => {
  const renderer = GetMenuItemRenderer.getMenuItemRenderer(-1)
  expect(renderer).toBe(getMenuItemsNoopDom)
})
