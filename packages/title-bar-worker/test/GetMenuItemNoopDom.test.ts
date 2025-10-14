import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemNoopDom from '../src/parts/GetMenuItemNoopDom/GetMenuItemNoopDom.ts'

test('getMenuItemsNoopDom - returns empty array', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Any Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)

  expect(result).toEqual([])
})

test('getMenuItemsNoopDom - returns empty array regardless of input', () => {
  const menuItem1: VisibleMenuItem = {
    label: 'Item 1',
    flags: 123,
    isFocused: true,
    isExpanded: true,
    level: 5,
    key: 999,
  }

  const menuItem2: VisibleMenuItem = {
    label: '',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem1)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem2)

  expect(result1).toEqual([])
  expect(result2).toEqual([])
  expect(result1).toStrictEqual(result2) // Should have same content
})

test('getMenuItemsNoopDom - always returns same empty array', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }

  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)

  expect(result1).toEqual([])
  expect(result2).toEqual([])
  expect(result1).toStrictEqual(result2) // Should have same content
})
