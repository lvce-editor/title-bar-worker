import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeyEnterMenuClosed = (state) => {
  return openMenu(state, /* focus */ true)
}
