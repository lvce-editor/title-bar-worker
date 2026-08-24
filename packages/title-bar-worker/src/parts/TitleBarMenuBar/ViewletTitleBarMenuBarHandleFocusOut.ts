import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'

export const handleFocusOut = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { isMenuOpen } = state
  if (isMenuOpen) {
    return state
  }
  const closedState = closeMenu(state, /* keepFocus */ false)
  if (!closedState.focused) {
    return closedState
  }
  return {
    ...closedState,
    focused: false,
  }
}
