import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeySpaceMenuClosed = (state: any): any => {
  return openMenu(state, /* focus */ true)
}
