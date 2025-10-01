import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

export const openMenu = async (state: TitleBarMenuBarState, focus: boolean): Promise<TitleBarMenuBarState> => {
  const { focusedIndex } = state
  if (focusedIndex === -1) {
    return state
  }
  return openMenuAtIndex(state, focusedIndex, focus)
}
