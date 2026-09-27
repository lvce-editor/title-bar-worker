import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Assert from '../Assert/Assert.ts'

export const handleMenuMouseLeave = (state: TitleBarMenuBarState): TitleBarMenuBarState => {
  Assert.object(state)
  const { menus } = state
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
