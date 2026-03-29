import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarButtonsHandleClickClose from '../HandleClickClose/HandleClickClose.ts'
import * as ViewletTitleBarButtonsHandleClickMinimize from '../HandleClickMinimize/HandleClickMinimize.ts'
import * as ViewletTitleBarButtonsHandleClickToggleMaximize from '../HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

export const handleClick = async (state: TitleBarMenuBarState, buttonName: string): Promise<TitleBarMenuBarState> => {
  if (buttonName === 'Minimize') {
    return ViewletTitleBarButtonsHandleClickMinimize.handleClickMinimize(state)
  }
  if (buttonName === 'ToggleMaximize') {
    return ViewletTitleBarButtonsHandleClickToggleMaximize.handleClickToggleMaximize(state)
  }
  if (buttonName === 'Close') {
    return ViewletTitleBarButtonsHandleClickClose.handleClickClose(state)
  }
  return state
}
