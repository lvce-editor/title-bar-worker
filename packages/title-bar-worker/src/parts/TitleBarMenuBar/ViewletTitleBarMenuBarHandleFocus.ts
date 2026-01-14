import { WhenExpression } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as Focus from '../Focus/Focus.ts'

export const handleFocus = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  await Focus.setFocus(WhenExpression.FocusTitleBarMenuBar)
  return {
    ...state,
    focused: true,
  }
}
