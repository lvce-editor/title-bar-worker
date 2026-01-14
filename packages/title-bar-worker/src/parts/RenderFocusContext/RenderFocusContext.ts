import { ViewletCommand, WhenExpression } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const renderFocusContext = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  const { uid } = newState
  return [ViewletCommand.SetFocusContext, uid, WhenExpression.FocusTitleBarMenuBar]
}
