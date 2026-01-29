import { expect, test } from '@jest/globals'
import { MenuIdTitleBarContextMenu, getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds returns an array', () => {
  const result = getMenuIds()
  expect(Array.isArray(result)).toBe(true)
})

test('getMenuIds returns non-empty array', () => {
  const result = getMenuIds()
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuIds contains MenuIdTitleBarContextMenu', () => {
  const result = getMenuIds()
  expect(result).toContain(MenuIdTitleBarContextMenu)
})

test('getMenuIds contains expected menu entries', () => {
  const result = getMenuIds()
  expect(result.length).toBe(12)
})

test('getMenuIds returns numbers', () => {
  const result = getMenuIds()
  for (const id of result) {
    expect(typeof id).toBe('number')
  }
})

test('MenuIdTitleBarContextMenu equals 50', () => {
  expect(MenuIdTitleBarContextMenu).toBe(50)
})

test('getMenuIds returns consistent results', () => {
  const result1 = getMenuIds()
  const result2 = getMenuIds()
  expect(result1).toEqual(result2)
})

test('getMenuIds returns array with unique values', () => {
  const result = getMenuIds()
  const uniqueValues = new Set(result)
  expect(uniqueValues.size).toBe(result.length)
})
