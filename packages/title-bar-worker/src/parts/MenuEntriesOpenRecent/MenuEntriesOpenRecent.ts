import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as PathDisplay from '../PathDisplay/PathDisplay.ts'
import * as TitleBarMenuBarStrings from '../TitleBarMenuBarStrings/TitleBarMenuBarStrings.ts'

const MAX_MENU_RECENT_ENTRIES = 10

const toMenuItem = (folder: any): any => {
  const label = PathDisplay.getTitle(folder)
  return {
    label,
    flags: MenuItemFlags.None,
    command: 'Workspace.setPath',
    args: [folder],
  }
}

export const id = MenuEntryId.OpenRecent

export const getMenuEntries = async (): Promise<any> => {
  const allItems = await GetRecentlyOpened.getRecentlyOpened()
  const itemsToShow = allItems.slice(0, MAX_MENU_RECENT_ENTRIES)
  const items = []
  if (itemsToShow.length > 0) {
    items.push(...itemsToShow.map(toMenuItem), MenuEntrySeparator.menuEntrySeparator)
  }
  items.push(
    {
      id: 'more',
      label: TitleBarMenuBarStrings.moreDot(),
      flags: MenuItemFlags.None,
      command: 'QuickPick.showRecent',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      id: 'clearRecentlyOpened',
      label: TitleBarMenuBarStrings.clearRecentlyOpened(),
      flags: MenuItemFlags.None,
      command: 'RecentlyOpened.clearRecentlyOpened',
    },
  )
  return items
}
