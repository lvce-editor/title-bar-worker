// TODO lazyload menuEntries and use Command.execute (maybe)
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.js'

export const MENU_WIDTH = 150

const CONTEXT_MENU_ITEM_HEIGHT = 26
const CONTEXT_MENU_SEPARATOR_HEIGHT = 11
const CONTEXT_MENU_PADDING = 8
const CONTEXT_MENU_WIDTH = 250

export const getMenuWidth = () => {
  return CONTEXT_MENU_WIDTH
}

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

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

export const getIndexToFocusNextStartingAt = (items: any, startIndex: any): any => {
  for (let i = startIndex; i < startIndex + items.length; i++) {
    const index = i % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusFirst = (items: any): any => {
  return getIndexToFocusNextStartingAt(items, 0)
}

export const getIndexToFocusLast = (items: any): any => {
  return getIndexToFocusPreviousStartingAt(items, items.length - 1)
}

// TODO this code seems a bit too complicated, maybe it can be simplified
const getIndexToFocusPreviousStartingAt = (items: any, startIndex: any): any => {
  for (let i = startIndex; i > startIndex - items.length; i--) {
    const index = (i + items.length) % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusPrevious = (menu: any): any => {
  const startIndex = menu.focusedIndex === -1 ? menu.items.length - 1 : menu.focusedIndex - 1
  return getIndexToFocusPreviousStartingAt(menu.items, startIndex)
}

const canBeFocused = (item: any): any => {
  switch (item.flags) {
    case MenuItemFlags.Separator:
    case MenuItemFlags.Disabled:
      return false
    default:
      return true
  }
}

export const getIndexToFocusNext = (menu: any): any => {
  const startIndex = menu.focusedIndex + 1
  return getIndexToFocusNextStartingAt(menu.items, startIndex)
}

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests
