import * as Menu from '../Menu/Menu.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'

const getTotalWidth = (entries: any): number => {
  let total = 0
  for (const entry of entries) {
    total += entry.width
  }
  return total
}

export const openMenuAtIndex = async (state: any, index: number, shouldBeFocused: boolean): Promise<any> => {
  const { titleBarEntries, titleBarHeight, x } = state
  // TODO race conditions
  // TODO send renderer process
  // 1. open menu, items to show
  // 2. focus menu
  const titleBarEntry = titleBarEntries[index]
  const { id } = titleBarEntry
  const items = await MenuEntries.getMenuEntries(id)
  const relevantEntries = titleBarEntries.slice(0, index)
  const totalWidths = getTotalWidth(relevantEntries)
  const offset = totalWidths
  // TODO race condition: another menu might already be open at this point

  const menuX = x + offset
  const menuY = titleBarHeight
  const width = Menu.getMenuWidth()
  const height = Menu.getMenuHeight(items)
  const menuFocusedIndex = shouldBeFocused ? Menu.getIndexToFocusNextStartingAt(items, 0) : -1
  const menu = {
    id,
    items,
    focusedIndex: menuFocusedIndex,
    level: 0,
    x: menuX,
    y: menuY,
    width,
    height,
  }
  const menus = [menu]
  return {
    ...state,
    isMenuOpen: true,
    focusedIndex: index,
    menus,
  }
}
