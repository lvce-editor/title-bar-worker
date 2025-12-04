import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
// TODO lazyload menuEntries and use Command.execute (maybe)
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const MENU_WIDTH = 150

const CONTEXT_MENU_WIDTH = 250

export const getMenuWidth = (): number => {
  return CONTEXT_MENU_WIDTH
}

export * from '../GetMenuHeight/GetMenuHeight.ts'

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

export const getIndexToFocusNextStartingAt = (items: readonly VisibleMenuItem[], startIndex: number): number => {
  for (let i = startIndex; i < startIndex + items.length; i++) {
    const index = i % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusFirst = (items: readonly VisibleMenuItem[]): number => {
  return getIndexToFocusNextStartingAt(items, 0)
}

export const getIndexToFocusLast = (items: readonly VisibleMenuItem[]): number => {
  return getIndexToFocusPreviousStartingAt(items, items.length - 1)
}

// TODO this code seems a bit too complicated, maybe it can be simplified
const getIndexToFocusPreviousStartingAt = (items: readonly VisibleMenuItem[], startIndex: number): number => {
  for (let i = startIndex; i > startIndex - items.length; i--) {
    const index = (i + items.length) % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusPrevious = (menu: any): number => {
  const startIndex = menu.focusedIndex === -1 ? menu.items.length - 1 : menu.focusedIndex - 1
  return getIndexToFocusPreviousStartingAt(menu.items, startIndex)
}

const canBeFocused = (item: VisibleMenuItem): boolean => {
  switch (item.flags) {
    case MenuItemFlags.Disabled:
    case MenuItemFlags.Separator:
      return false
    default:
      return true
  }
}

export const getIndexToFocusNext = (menu: any): number => {
  const startIndex = menu.focusedIndex + 1
  return getIndexToFocusNextStartingAt(menu.items, startIndex)
}

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests
