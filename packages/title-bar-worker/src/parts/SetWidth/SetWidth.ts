import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitleBarMenuBarWidth } from '../GetTitleBarMenuBarWidth/GetTitleBarMenuBarWidth.ts'

export const setWidth = (state: TitleBarMenuBarState, width: number): TitleBarMenuBarState => {
  const { iconWidth, titleWidth, x } = state
  return {
    ...state,
    width: getTitleBarMenuBarWidth(width, x, iconWidth, titleWidth),
  }
}
