import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { closeMenu } from './ViewletTitleBarMenuBarCloseMenu.ts'

export const handleFocusOut = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const closedState = closeMenu(state, /* keepFocus */ false)
  if (!closedState.focused) {
    return closedState
  }
  return {
    ...closedState,
    focused: false,
  }
}
