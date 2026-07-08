import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getMenuEntries - auto save enabled', async () => {
  const result = await getMenuEntries(PlatformType.Web, 'afterDelay')

  expect(result).toContainEqual({
    command: 'Preferences.toggleAutoSave',
    flags: MenuItemFlags.Checked,
    id: 'autoSave',
    label: 'Auto Save',
  })
})

test('getMenuEntries - auto save disabled', async () => {
  const result = await getMenuEntries(PlatformType.Electron, 'off')

  expect(result).toContainEqual({
    command: 'Preferences.toggleAutoSave',
    flags: MenuItemFlags.Unchecked,
    id: 'autoSave',
    label: 'Auto Save',
  })
  expect(result).toContainEqual(MenuEntrySeparator.menuEntrySeparator)
})
