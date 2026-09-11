import { expect, test } from '@jest/globals'
import { getMenuHeight } from '../src/parts/GetMenuHeight/GetMenuHeight.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('includes padding for an empty menu', () => {
  expect(getMenuHeight([])).toBe(8)
})

test('uses the smaller height for separators among menu entries', () => {
  expect(
    getMenuHeight([
      { command: '', flags: MenuItemFlags.None, label: 'Open' },
      { command: '', flags: MenuItemFlags.Separator, label: '' },
      { command: '', flags: MenuItemFlags.None, label: 'Close' },
    ]),
  ).toBe(71)
})
