import { expect, test } from '@jest/globals'
import * as MenuEntriesHelp from '../src/parts/MenuEntriesHelp/MenuEntriesHelp.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'

test('getMenuEntries - Web platform should only have about entry', async () => {
  const entries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Web)
  expect(entries.length).toBe(1)
  expect(entries[0].id).toBe('about')
  expect(entries[0].command).toBe('About.showAbout')
  expect(entries[0].flags).toBe(MenuItemFlags.None)
})

test('getMenuEntries - Electron platform should have developer tools and about entries', async () => {
  const entries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  expect(entries.length).toBe(4)
  expect(entries[0].id).toBe('toggleDeveloperTools')
  expect(entries[0].command).toBe('Developer.toggleDeveloperTools')
  expect(entries[0].flags).toBe(MenuItemFlags.None)
  expect(entries[1].id).toBe('openProcessExplorer')
  expect(entries[1].command).toBe('Developer.openProcessExplorer')
  expect(entries[1].flags).toBe(MenuItemFlags.RestoreFocus)
  expect(entries[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(entries[3].id).toBe('about')
  expect(entries[3].command).toBe('About.showAbout')
})

test('getMenuEntries - Remote platform should have developer tools and about entries', async () => {
  const entries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Remote)
  expect(entries.length).toBe(4)
  expect(entries[0].id).toBe('toggleDeveloperTools')
  expect(entries[1].id).toBe('openProcessExplorer')
  expect(entries[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(entries[3].id).toBe('about')
})

test('getMenuEntries - should always include about entry at the end', async () => {
  const webEntries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Web)
  const electronEntries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  const remoteEntries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Remote)
  expect(webEntries[webEntries.length - 1].id).toBe('about')
  expect(electronEntries[electronEntries.length - 1].id).toBe('about')
  expect(remoteEntries[remoteEntries.length - 1].id).toBe('about')
})

test('getMenuEntries - should add separator before about when there are other entries', async () => {
  const entries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  const separatorIndex = entries.length - 2
  expect(entries[separatorIndex]).toBe(MenuEntrySeparator.menuEntrySeparator)
})

test('getMenuEntries - should not add separator before about when there are no other entries', async () => {
  const entries: readonly MenuEntry[] = await MenuEntriesHelp.getMenuEntries(PlatformType.Web)
  expect(entries.length).toBe(1)
  expect(entries[0].id).toBe('about')
})
