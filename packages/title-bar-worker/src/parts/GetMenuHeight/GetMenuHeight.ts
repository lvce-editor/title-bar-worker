// TODO lazyload menuEntries and use Command.execute (maybe)
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const CONTEXT_MENU_ITEM_HEIGHT = 26
const CONTEXT_MENU_SEPARATOR_HEIGHT = 11
const CONTEXT_MENU_PADDING = 8

const getMenuItemHeight = (item: MenuEntry | VisibleMenuItem): number => {
  if (item.flags === MenuItemFlags.Separator) {
    return CONTEXT_MENU_SEPARATOR_HEIGHT
  }
  return CONTEXT_MENU_ITEM_HEIGHT
}

export const getMenuHeight = (items: readonly (MenuEntry | VisibleMenuItem)[]): number => {
  let height = CONTEXT_MENU_PADDING
  for (const item of items) {
    height += getMenuItemHeight(item)
  }
  return height
}
