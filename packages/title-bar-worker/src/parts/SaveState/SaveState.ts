import type { SavedState } from '../SavedState/SavedState.ts'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const saveState = (state: TitleBarMenuBarState): SavedState => {
  const { focusedIndex } = state
  return {
    focusedIndex,
  }
}
