import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as HelpStrings from '../HelpStrings/HelpStrings.ts'
import * as IsAutoUpdateSupported from '../IsAutoUpdateSupported/IsAutoUpdateSupported.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const id = MenuEntryId.Help

export const getMenuEntries = async (platform: number): Promise<readonly MenuEntry[]> => {
  const autoUpdateSupported = IsAutoUpdateSupported.isAutoUpdateSupported(platform)
  const entries = []
  if (platform !== PlatformType.Web) {
    entries.push(
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
    )
  }
  if (autoUpdateSupported) {
    entries.push(MenuEntrySeparator.menuEntrySeparator, {
      command: 'AutoUpdater.checkForUpdates',
      flags: MenuItemFlags.RestoreFocus,
      id: 'checkForUpdates',
      label: HelpStrings.checkForUpdates(),
    })
  }
  if (entries.length > 0) {
    entries.push(MenuEntrySeparator.menuEntrySeparator)
  }
  entries.push({
    command: 'About.showAbout',
    flags: MenuItemFlags.None,
    id: 'about',
    label: HelpStrings.about(),
  })
  return entries
}
