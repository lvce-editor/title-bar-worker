import { expect, test } from '@jest/globals'
import { MenuIdSwitchEditor, MenuIdSwitchGroup } from '../src/parts/GetMenuIds/GetMenuIds.ts'
import { getMenuEntries } from '../src/parts/MenuEntries/MenuEntries.ts'

test('getMenuEntries - switch editor', async () => {
  const result = await getMenuEntries(MenuIdSwitchEditor)

  expect(result).toHaveLength(10)
  expect(result[0]).toMatchObject({
    id: 'nextEditor',
    label: 'Next Editor',
  })
})

test('getMenuEntries - switch group', async () => {
  const result = await getMenuEntries(MenuIdSwitchGroup)

  expect(result).toHaveLength(9)
  expect(result[0]).toMatchObject({
    id: 'nextGroup',
    label: 'Next Group',
  })
})
