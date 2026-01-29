import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getEntryMap } from '../src/parts/GetMenuEntryMap/GetMenuEntryMap.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('getEntryMap - returns empty object for empty menuIds', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await getEntryMap(state, [], 1)
  expect(result).toEqual({})
})

test('getEntryMap - returns map for single menuId', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await getEntryMap(state, [MenuEntryId.File], 1)
  expect(typeof result).toBe('object')
  expect(result[MenuEntryId.File]).toBeDefined()
  expect(Array.isArray(result[MenuEntryId.File])).toBe(true)
})

test('getEntryMap - returns map for multiple menuIds', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const menuIds = [MenuEntryId.File, MenuEntryId.Edit, MenuEntryId.View]
  const result = await getEntryMap(state, menuIds, 1)
  expect(typeof result).toBe('object')
  expect(result[MenuEntryId.File]).toBeDefined()
  expect(result[MenuEntryId.Edit]).toBeDefined()
  expect(result[MenuEntryId.View]).toBeDefined()
  expect(Array.isArray(result[MenuEntryId.File])).toBe(true)
  expect(Array.isArray(result[MenuEntryId.Edit])).toBe(true)
  expect(Array.isArray(result[MenuEntryId.View])).toBe(true)
})

test('getEntryMap - handles different platforms', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const menuIds = [MenuEntryId.File]
  const resultMac = await getEntryMap(state, menuIds, 1) // macOS platform
  const resultWin = await getEntryMap(state, menuIds, 2) // Windows platform
  expect(resultMac[MenuEntryId.File]).toBeDefined()
  expect(resultWin[MenuEntryId.File]).toBeDefined()
})

test('getEntryMap - creates object with null prototype', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await getEntryMap(state, [MenuEntryId.Edit], 1)
  expect(Object.getPrototypeOf(result)).toBeNull()
})

test('getEntryMap - handles Help menuId', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await getEntryMap(state, [MenuEntryId.Help], 1)
  expect(result[MenuEntryId.Help]).toBeDefined()
  expect(Array.isArray(result[MenuEntryId.Help])).toBe(true)
})

test('getEntryMap - handles TitleBar menuId', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const result = await getEntryMap(state, [MenuEntryId.TitleBar], 1)
  expect(result[MenuEntryId.TitleBar]).toBeDefined()
  expect(Array.isArray(result[MenuEntryId.TitleBar])).toBe(true)
})

test('getEntryMap - handles duplicate menuIds', async () => {
  const state: TitleBarMenuBarState = createDefaultState()
  const menuIds = [MenuEntryId.File, MenuEntryId.File]
  const result = await getEntryMap(state, menuIds, 1)
  expect(result[MenuEntryId.File]).toBeDefined()
  expect(Array.isArray(result[MenuEntryId.File])).toBe(true)
})
