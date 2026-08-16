import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const handleFocusOut = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  // The renderer process checks relatedTarget and closes the menu only when focus leaves the complete menu tree.
  return state
}
