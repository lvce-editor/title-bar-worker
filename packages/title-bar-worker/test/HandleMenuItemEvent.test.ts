import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMenuItemClick, handleMenuItemHover } from '../src/parts/HandleMenuItemEvent/HandleMenuItemEvent.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const menu = {
  focusedIndex: -1,
  items: [{ command: '', flags: MenuItemFlags.Disabled, label: 'Unavailable' }],
  level: 0,
  x: 30,
  y: 30,
}
const state = { ...createDefaultState(), menus: [menu] }

test.each(['', 'garbage', '1:0', '0:99', '-1:0', '0:0:0'])('ignores invalid or stale menu item names: %s', async (name) => {
  expect(await handleMenuItemClick(state, name)).toBe(state)
  expect(await handleMenuItemHover(state, name)).toBe(state)
})

test('hover routes the named item to the existing menu state handler', async () => {
  const result = await handleMenuItemHover(state, '0:0')
  expect(result.menus[0].focusedIndex).toBe(0)
})

test('click preserves disabled menu item behavior', async () => {
  expect(await handleMenuItemClick(state, '0:0')).toBe(state)
})
