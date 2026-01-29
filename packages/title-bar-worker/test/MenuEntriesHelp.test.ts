import { expect, test } from '@jest/globals'
import * as HelpStrings from '../src/parts/HelpStrings/HelpStrings.ts'
import { getMenuEntries } from '../src/parts/MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getMenuEntries - Web platform with auto update not supported', async () => {
  const result = await getMenuEntries(PlatformType.Web)
  expect(result).toEqual([
    {
      command: 'About.showAbout',
      flags: MenuItemFlags.None,
      id: 'about',
      label: HelpStrings.about(),
    },
  ])
})

test('getMenuEntries - Electron platform with auto update not supported', async () => {
  const result = await getMenuEntries(PlatformType.Electron)
  expect(result).toEqual([
    {
      command: 'Developer.toggleDeveloperTools',
      flags: MenuItemFlags.None,
      id: 'toggleDeveloperTools',
      label: HelpStrings.toggleDeveloperTools(),
    },
    {
      command: 'Developer.openProcessExplorer',
      flags: MenuItemFlags.RestoreFocus,
      id: 'openProcessExplorer',
      label: HelpStrings.openProcessExplorer(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'About.showAbout',
      flags: MenuItemFlags.None,
      id: 'about',
      label: HelpStrings.about(),
    },
  ])
})

test('getMenuEntries - Remote platform with auto update not supported', async () => {
  const result = await getMenuEntries(PlatformType.Remote)
  expect(result).toEqual([
    {
      command: 'Developer.toggleDeveloperTools',
      flags: MenuItemFlags.None,
      id: 'toggleDeveloperTools',
      label: HelpStrings.toggleDeveloperTools(),
    },
    {
      command: 'Developer.openProcessExplorer',
      flags: MenuItemFlags.RestoreFocus,
      id: 'openProcessExplorer',
      label: HelpStrings.openProcessExplorer(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'About.showAbout',
      flags: MenuItemFlags.None,
      id: 'about',
      label: HelpStrings.about(),
    },
  ])
})
