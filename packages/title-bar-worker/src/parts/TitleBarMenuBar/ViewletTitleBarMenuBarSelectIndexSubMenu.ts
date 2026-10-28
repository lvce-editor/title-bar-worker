import type { IMenu } from '../IMenu/IMenu.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as AddMenuEntryKeyBindings from '../AddMenuEntryKeyBindings/AddMenuEntryKeyBindings.ts'
import { getSubMenuBounds } from '../GetSubMenuBounds/GetSubMenuBounds.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'

export const selectIndexSubMenu = async (state: TitleBarMenuBarState, menu: IMenu, index: number): Promise<TitleBarMenuBarState> => {
  const { maxMenuRecentEntries, menus } = state
  const { items, level } = menu
  const item = items[index]
  if (!item.id) {
    return state
  }
  const rawSubMenuEntries = await MenuEntries.getMenuEntriesWithRecentLimit(item.id, maxMenuRecentEntries)
  const subMenuEntries = await AddMenuEntryKeyBindings.addMenuEntryKeyBindings(rawSubMenuEntries)
  const bounds = await getSubMenuBounds(state, menu, index, subMenuEntries)
  const subMenu = {
    ...bounds,
    focusedIndex: -1,
    items: subMenuEntries,
    level: level + 1,
  }
  const newParentMenu = {
    ...menu,
    expanded: true,
    focusedIndex: index,
  }
  const newMenus = [...menus.slice(0, level), newParentMenu, subMenu]
  return {
    ...state,
    menus: newMenus,
  }
}
