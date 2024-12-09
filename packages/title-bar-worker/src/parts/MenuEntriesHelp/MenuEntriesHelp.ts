import * as HelpStrings from '../HelpStrings/HelpStrings.ts'
import * as IsAutoUpdateSupported from '../IsAutoUpdateSupported/IsAutoUpdateSupported.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const id = MenuEntryId.Help

export const getMenuEntries = async () => {
  const autoUpdateSupported = await IsAutoUpdateSupported.isAutoUpdateSupported()
  const entries = []
  if (Platform.platform !== PlatformType.Web) {
    entries.push(
      {
        id: 'toggleDeveloperTools',
        label: HelpStrings.toggleDeveloperTools(),
        flags: MenuItemFlags.None,
        command: 'Developer.toggleDeveloperTools',
      },
      {
        id: 'openProcessExplorer',
        label: HelpStrings.openProcessExplorer(),
        flags: MenuItemFlags.RestoreFocus,
        command: 'Developer.openProcessExplorer',
      },
    )
  }
  if (autoUpdateSupported) {
    entries.push(MenuEntrySeparator.menuEntrySeparator, {
      id: 'checkForUpdates',
      label: HelpStrings.checkForUpdates(),
      flags: MenuItemFlags.RestoreFocus,
      command: 'AutoUpdater.checkForUpdates',
    })
  }
  if (entries.length > 0) {
    entries.push(MenuEntrySeparator.menuEntrySeparator)
  }
  entries.push({
    id: 'about',
    label: HelpStrings.about(),
    flags: MenuItemFlags.RestoreFocus,
    command: 'About.showAbout',
  })
  return entries
}
