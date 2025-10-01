import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletTitleBarButtonsHandleClickClose from '../HandleClickClose/HandleClickClose.ts'
import * as ViewletTitleBarButtonsHandleClickMinimize from '../HandleClickMinimize/HandleClickMinimize.ts'
import * as ViewletTitleBarButtonsHandleClickToggleMaximize from '../HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

// TODO use button name property
export const handleClick = async (state: TitleBarMenuBarState, className: string): Promise<TitleBarMenuBarState> => {
  if (className.includes('Minimize')) {
    return ViewletTitleBarButtonsHandleClickMinimize.handleClickMinimize(state)
  }
  if (className.includes('Maximize') || className.includes('Restore')) {
    return ViewletTitleBarButtonsHandleClickToggleMaximize.handleClickToggleMaximize(state)
  }
  if (className.includes('Close')) {
    return ViewletTitleBarButtonsHandleClickClose.handleClickClose(state)
  }
  return state
}
