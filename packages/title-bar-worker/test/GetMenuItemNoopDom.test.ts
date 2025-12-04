import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemNoopDom from '../src/parts/GetMenuItemNoopDom/GetMenuItemNoopDom.ts'

test('getMenuItemsNoopDom - returns empty array', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Any Item',
    level: 0,
  }

  const result = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)

  expect(result).toEqual([])
})

test('getMenuItemsNoopDom - returns empty array regardless of input', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 123,
    isExpanded: true,
    isFocused: true,
    key: 999,
    label: 'Item 1',
    level: 5,
  }

  const menuItem2: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: '',
    level: 0,
  }

  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem1)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem2)

  expect(result1).toEqual([])
  expect(result2).toEqual([])
  expect(result1).toStrictEqual(result2) // Should have same content
})

test('getMenuItemsNoopDom - always returns same empty array', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }

  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)

  expect(result1).toEqual([])
  expect(result2).toEqual([])
  expect(result1).toStrictEqual(result2) // Should have same content
})
