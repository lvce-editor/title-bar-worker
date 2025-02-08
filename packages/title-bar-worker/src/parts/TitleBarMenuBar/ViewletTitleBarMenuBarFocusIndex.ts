import * as Assert from '../Assert/Assert.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

export const focusIndex = async (state: TitleBarMenuBarState, index: number): Promise<TitleBarMenuBarState> => {
  Assert.object(state)
  Assert.number(index)
  const { isMenuOpen } = state
  if (isMenuOpen) {
    return openMenuAtIndex(state, index, /* focus */ false)
  }
  return {
    ...state,
    focusedIndex: index,
  }
}
