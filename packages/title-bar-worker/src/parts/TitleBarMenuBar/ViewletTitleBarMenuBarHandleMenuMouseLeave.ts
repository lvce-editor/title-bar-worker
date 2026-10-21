import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as Menu from '../Menu/Menu.ts'

export const handleMenuMouseLeave = (state: TitleBarMenuBarState, x: number = -1, y: number = -1): TitleBarMenuBarState => {
  Assert.object(state)
  const { menus } = state
  // Mouseout bubbles from items too; retain selection while entering any menu level.
  if (
    menus.some(
      (menu) =>
        x >= menu.x &&
        x < menu.x + (menu.width ?? Menu.getMenuWidth()) &&
        y >= menu.y &&
        y < menu.y + (menu.height ?? Menu.getMenuHeight(menu.items)),
    )
  ) {
    return state
  }
  if (menus.every((menu) => menu.focusedIndex === -1)) {
    return state
  }
  return {
    ...state,
    menus: menus.map((menu) => ({
      ...menu,
      focusedIndex: -1,
    })),
  }
}
