import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeyEnterMenuClosed = (state: any): any => {
  return openMenu(state, /* focus */ true)
}
