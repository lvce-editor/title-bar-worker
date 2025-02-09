import * as ViewletTitleBarButtonsHandleClickClose from '../HandleClickClose/HandleClickClose.ts'
import * as ViewletTitleBarButtonsHandleClickMinimize from '../HandleClickMinimize/HandleClickMinimize.ts'
import * as ViewletTitleBarButtonsHandleClickToggleMaximize from '../HandleClickToggleMaximize/HandleClickToggleMaximize.ts'

export const handleClick = (state: any, className: string): Promise<any> => {
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
