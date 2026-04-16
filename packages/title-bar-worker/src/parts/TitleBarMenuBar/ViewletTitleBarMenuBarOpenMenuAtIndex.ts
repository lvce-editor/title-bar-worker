import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as GetMenuEntries2 from '../GetMenuEntries2/GetMenuEntries2.ts'
import * as GetNavigableTitleBarEntries from '../GetNavigableTitleBarEntries/GetNavigableTitleBarEntries.ts'
import * as GetTotalWidth from '../GetTotalWidth/GetTotalWidth.ts'
import { OverflowMenuId } from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'
import * as Menu from '../Menu/Menu.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const getOverflowMenuItems = (hiddenEntries: readonly any[]): readonly any[] => {
  return hiddenEntries.map((entry) => ({
    command: '',
    flags: MenuItemFlags.SubMenu,
    id: entry.id,
    label: entry.label,
  }))
}

export const openMenuAtIndex = async (state: TitleBarMenuBarState, index: number, shouldBeFocused: boolean): Promise<TitleBarMenuBarState> => {
  const { iconWidth, platform, titleBarHeight, x } = state
  const titleBarEntries = GetNavigableTitleBarEntries.getNavigableTitleBarEntries(state)
  // TODO race conditions
  // TODO send renderer process
  // 1. open menu, items to show
  // 2. focus menu
  const titleBarEntry = titleBarEntries[index]
  if (!titleBarEntry) {
    return state
  }
  const { id } = titleBarEntry
  const items =
    id === OverflowMenuId
      ? getOverflowMenuItems(titleBarEntry.hiddenEntries || [])
      : await GetMenuEntries2.getMenuEntries2(state, {
          menuId: id,
          platform,
        })
  const relevantEntries = titleBarEntries.slice(0, index)
  const totalWidths = GetTotalWidth.getTotalWidth(relevantEntries)
  const offset = totalWidths
  // TODO race condition: another menu might already be open at this point

  const menuX = x + offset + iconWidth
  const menuY = titleBarHeight
  const width = Menu.getMenuWidth()
  const height = Menu.getMenuHeight(items)
  const menuFocusedIndex = shouldBeFocused ? Menu.getIndexToFocusNextStartingAt(items, 0) : -1
  const menu = {
    focusedIndex: menuFocusedIndex,
    height,
    id: id === OverflowMenuId ? undefined : id,
    items,
    level: 0,
    width,
    x: menuX,
    y: menuY,
  }
  const menus = [menu]
  return {
    ...state,
    focusedIndex: index,
    isMenuOpen: true,
    menus,
  }
}
