import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeyArrowDownMenuClosed = (state) => {
  return openMenu(state, /* focus */ true)
}
