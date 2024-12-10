import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeyArrowDownMenuClosed = (state: any): any => {
  return openMenu(state, /* focus */ true)
}
