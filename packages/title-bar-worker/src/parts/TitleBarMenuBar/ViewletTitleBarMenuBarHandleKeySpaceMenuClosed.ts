import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeySpaceMenuClosed = (state) => {
  return openMenu(state, /* focus */ true)
}
