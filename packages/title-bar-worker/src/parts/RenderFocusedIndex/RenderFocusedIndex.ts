import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const renderFocusedIndex = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  if (newState.focusedIndex === -1) {
    return []
  }
  return ['Viewlet.focusSelector', '.ViewletTitleBarMenuBar']
}
