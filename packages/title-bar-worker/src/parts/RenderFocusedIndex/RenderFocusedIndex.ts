import { ViewletCommand } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const renderFocusedIndex = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  if (newState.focusedIndex === -1) {
    return []
  }
  return [ViewletCommand.FocusSelector, '.ViewletTitleBarMenuBar']
}
