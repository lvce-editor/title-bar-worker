// TODO lazyload menuEntries and use Command.execute (maybe)
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const CONTEXT_MENU_ITEM_HEIGHT = 26
const CONTEXT_MENU_SEPARATOR_HEIGHT = 11
const CONTEXT_MENU_PADDING = 8

export const getMenuHeight = (items: any): any => {
  let height = CONTEXT_MENU_PADDING
  for (const item of items) {
    switch (item.flags) {
      case MenuItemFlags.Separator:
        height += CONTEXT_MENU_SEPARATOR_HEIGHT
        break
      default:
        height += CONTEXT_MENU_ITEM_HEIGHT
        break
    }
  }
  return height
}
