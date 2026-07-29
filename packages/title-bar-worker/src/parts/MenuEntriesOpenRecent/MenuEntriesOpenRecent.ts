import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as GetRecentlyOpened from '../GetRecentlyOpened/GetRecentlyOpened.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as TitleBarMenuBarStrings from '../TitleBarMenuBarStrings/TitleBarMenuBarStrings.ts'
import * as ToMenuItem from '../ToMenuItem/ToMenuItem.ts'

const MAX_MENU_RECENT_ENTRIES = 10

export const getMenuEntries = async (): Promise<readonly MenuEntry[]> => {
  const allItems = await GetRecentlyOpened.getRecentlyOpened()
  const itemsToShow = allItems.slice(0, MAX_MENU_RECENT_ENTRIES)
  const items = []
  if (itemsToShow.length > 0) {
    items.push(...itemsToShow.map(ToMenuItem.toMenuItem), MenuEntrySeparator.menuEntrySeparator)
  }
  items.push(
    {
      command: 'QuickPick.showRecent',
      flags: MenuItemFlags.None,
      id: 'more',
      label: TitleBarMenuBarStrings.moreDot(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'RecentlyOpened.clearRecentlyOpened',
      flags: MenuItemFlags.None,
      id: 'clearRecentlyOpened',
      label: TitleBarMenuBarStrings.clearRecentlyOpened(),
    },
  )
  return items
}
