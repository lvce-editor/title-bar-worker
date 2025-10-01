import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { openMenu } from './ViewletTitleBarMenuBarOpenMenu.ts'

export const handleKeyArrowDownMenuClosed = (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return openMenu(state, /* focus */ true)
}
